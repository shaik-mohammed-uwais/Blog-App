import { Container, Logout } from "../export";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { PencilLine } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <Container>
        <nav className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-black font-semibold text-xl"
          >
            <PencilLine className="w-6 h-6" />
            BlogApp
          </Link>

          <ul className="flex items-center gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                        ${
                          location.pathname === item.slug
                            ? "text-blue-900 bg-blue-200/40 backdrop-blur-md shadow-sm"
                            : "text-gray-700 hover:text-blue-900 hover:bg-blue-200/40 hover:backdrop-blur-md hover:shadow-sm"
                        }`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
