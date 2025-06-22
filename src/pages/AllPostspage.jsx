import { useState, useEffect } from "react";
import { PostCard } from "../components/export";
import services from "../appwrite/config";

function AllPostspage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter posts by title
  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="py-8 text-center">
          <h1 className="text-4xl font-extrabold text-black mb-4">All Posts</h1>

          {/* Search Bar */}
          <div className="flex justify-center">
            <div
              className="relative w-full max-w-md px-3 py-2 flex items-center
                bg-blue-200/40 backdrop-blur-md text-black border border-white/30
                rounded-lg shadow hover:shadow-sm transition duration-200"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent placeholder-blue-600/60 text-sm text-black font-medium focus:outline-none"
              />
              <button className="p-1 text-blue-600" disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post.$id} {...post} />)
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
