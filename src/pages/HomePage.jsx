import { useEffect, useState } from "react";
import { Container, PostCard } from "../components/export";
import services from "../appwrite/config";

function Homepage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    services
      .getPosts()
      .then((res) => {
        if (res?.documents) {
          setPosts(res.documents);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading posts...</p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">
          Login to read posts
        </h1>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <Container>
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-12 px-6 sm:px-10 lg:px-16">
          <h1 className="text-4xl font-extrabold text-black tracking-tight">
            DevBlog
          </h1>
          <p className="text-gray-600 text-base max-w-xl">
            Welcome to DevBlog — a modern publishing platform where developers,
            designers, and creators share knowledge, ideas, and insights. Start
            reading to discover new perspectives.
          </p>
        </div>

        {/* Posts Section */}
        <div className="px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Homepage;
