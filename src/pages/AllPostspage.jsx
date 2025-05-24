import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/export";
import services from "../appwrite/config";

function AllPostspage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    services
      .getPosts([])
      .then((res) => {
        if (res?.documents) {
          setPosts(res.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="py-12 text-center">
          <h1 className="text-4xl font-extrabold text-black mb-2">All Posts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Dive into articles from our blog community — curated stories,
            insights, and creative thoughts in one place.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.$id} {...post} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No posts found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllPostspage;
