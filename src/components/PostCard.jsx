import { useEffect, useState } from "react";
import services from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, "featured-image": featuredImage, title, status }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (featuredImage) {
      const url = services.getfilepreview(featuredImage);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  }, [featuredImage]);

  return (
    <Link
      to={`/post/${$id}`}
      className="block rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
    >
      <div className="relative w-full h-52">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400 text-sm">
            No Image Available
          </div>
        )}

        <div
          className={`absolute bottom-3 left-3 px-3 py-1 text-xs font-medium rounded-md shadow-sm backdrop-blur-md
    ${
      status === "active"
        ? "bg-green-200/40 text-white-800"
        : "bg-red-200/40 text-white-800"
    }`}
        >
          {status}
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-black mb-1 line-clamp-2">
          {title}
        </h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Read post <span aria-hidden>↗</span>
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
