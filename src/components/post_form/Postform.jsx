import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Rte, Select } from "../export";
import services from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;

      if (file) {
        services.deleteFile(featuredImage);
      }

      const dbPost = await services.updatePost(post.$id, {
        ...data,
        "featured-image": file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await services.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await services.createpost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
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
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
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
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
//
// import React, { useCallback, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, Rte, Select } from "../export";
// import services from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function Postform({ post }) {
//   const featuredImage = post?.post?.["featured-image"];
//   const { register, handleSubmit, watch, setValue, control, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.$id || "",
//         content: post?.content || "",
//         status: post?.status || "active",
//       },
//     });

//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userdata);

//   const submit = async (data) => {
//     // Check if user is authenticated
//     if (!userData || !userData.$id) {
//       alert("User not logged in. Please log in to create or update a post.");
//       console.warn("Missing userData in Redux state");
//       return;
//     }

//     try {
//       let fileId = undefined;

//       if (data.image && data.image[0]) {
//         const file = await services.uploadFile(data.image[0]);
//         fileId = file?.$id;

//         // delete previous image only when updating post
//         if (post && featuredImage) {
//           await services.deleteFile(featuredImage);
//         }
//       }

//       if (post) {
//         const updatedPost = await services.updatePost(post.$id, {
//           ...data,
//           "featured-image": fileId || featuredImage,
//         });

//         if (updatedPost) {
//           navigate(`/post/${updatedPost.$id}`);
//         }
//       } else {
//         const newPost = await services.createpost({
//           ...data,
//           "featured-image": fileId,
//           userId: userData.$id,
//         });

//         if (newPost) {
//           navigate(`/post/${newPost.$id}`);
//         }
//       }
//     } catch (error) {
//       console.error("Error submitting post:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string") {
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, "-")
//         .replace(/\s+/g, "-");
//     }
//     return "";
//   }, []);

//   useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), {
//           shouldValidate: true,
//         });
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <Input
//           label="Title :"
//           placeholder="Title"
//           className="mb-4"
//           {...register("title", { required: true })}
//         />
//         <Input
//           label="Slug :"
//           placeholder="Slug"
//           className="mb-4"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), {
//               shouldValidate: true,
//             });
//           }}
//         />
//         <Rte
//           label="Content :"
//           name="content"
//           control={control}
//           defaultValue={getValues("content")}
//         />
//       </div>

//       <div className="w-1/3 px-2">
//         <Input
//           label="Featured Image :"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image", { required: !post })}
//         />
//         {post && featuredImage && (
//           <div className="w-full mb-4">
//             <img
//               src={services.getfilepreview(featuredImage)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <Select
//           options={["active", "inactive"]}
//           label="Status"
//           className="mb-4"
//           {...register("status", { required: true })}
//         />
//         <Button
//           type="submit"
//           bgColor={post ? "bg-green-500" : undefined}
//           className="w-full"
//         >
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }
