import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Rte, Select } from "../export";
import services from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import generateBlog from "../../services/aiservice";

export default function Postform({ post }) {
  const featuredImage = post?.post?.["featured-image"];
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;

      if (file) services.deleteFile(featuredImage);

      const dbPost = await services.updatePost(post.$id, {
        ...data,
        "featured-image": file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await services.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await services.createpost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const { title, content } = await generateBlog(topic);
      if (title) setValue("title", title);
      if (content) setValue("content", content);
    } catch (err) {
      console.error("AI generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          inputClassName="px-3 py-2"
          {...register("title", { required: true })}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Auto Generate Blog :
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-3/4 px-3 py-2 border border-gray-300 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="w-1/4 px-3 py-2 flex items-center justify-center gap-1 text-sm text-blue-700 font-semibold bg-blue-200/40 backdrop-blur-md border border-white/30 rounded-lg shadow hover:shadow-sm hover:bg-blue-300/40 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v1m0 14v1m8-9h-3M6 12H3m15.536-6.364l-2.121 2.121M8.464 17.536l-2.121 2.121M17.536 17.536l-2.121-2.121M8.464 6.464L6.343 4.343"
                />
              </svg>
              {loading ? "Loading..." : "Auto Generate"}
            </button>
          </div>
        </div>

        <Rte
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          inputClassName="px-3 py-2"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={services.getfilepreview(featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-200/40 text-green-700 font-semibold rounded-lg backdrop-blur-md border border-white/30 hover:bg-green-300/50 shadow hover:shadow-sm transition duration-200"
        >
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}
