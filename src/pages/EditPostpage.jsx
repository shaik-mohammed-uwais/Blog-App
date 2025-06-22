import { useEffect, useState } from "react";
import { Container, Postform } from "../components/export";
import services from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPostpage() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <Postform post={post} />
      </Container>
    </div>
  );
}

export default EditPostpage;
