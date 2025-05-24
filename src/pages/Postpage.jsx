import React, { useEffect, useState } from "react";
import { Container, Button } from "../components/export";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import services from "../appwrite/config";
import parse from "html-react-parser";
import { Pencil, Trash2 } from "lucide-react";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);

  const isAuthor = post && userData ? post.userid === userData.$id : false;
  const featuredImage =
    post?.["featured-image"] || post?.post?.["featured-image"];

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    services.deletepost(post.$id).then((status) => {
      if (status) {
        if (featuredImage) services.deleteFile(featuredImage);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    async function getImage() {
      if (!featuredImage) return;
      try {
        const filePreview = await services.getfilepreview(featuredImage);
        setImage(filePreview);
      } catch (error) {
        console.error("Error fetching image preview:", error);
      }
    }
    getImage();
  }, [featuredImage]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-16 min-h-screen bg-white">
      <Container>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Featured Image */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-md">
            {image ? (
              <img
                src={image}
                alt={post.title}
                className="w-full h-72 object-cover rounded-t-2xl"
              />
            ) : (
              <div className="w-full h-72 flex items-center justify-center text-gray-400 bg-gray-100">
                No Image Available
              </div>
            )}

            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg backdrop-blur-md bg-white/20 text-white transition duration-200 hover:bg-blue-100 hover:text-blue-700 shadow-sm">
                    <Pencil size={16} />
                    <span>Edit</span>
                  </button>
                </Link>
                <button
                  onClick={deletePost}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg backdrop-blur-md bg-white/20 text-white transition duration-200 hover:bg-red-100 hover:text-red-700 shadow-sm"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-black tracking-tight">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-800 prose-img:rounded-xl prose-img:shadow">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  );
}
