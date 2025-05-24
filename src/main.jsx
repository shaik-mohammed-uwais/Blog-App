import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Authlayout, Login } from "./components/export.js";
import {
  Signuppage,
  Postpage,
  AddPostpage,
  AllPostspage,
  EditPostpage,
  HomePage,
  Loginpage,
} from "./pages/pageexport.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes */}
      <Route index element={<HomePage />} />
      <Route
        path="login"
        element={
          <Authlayout authentication={false}>
            <Login />
          </Authlayout>
        }
      />
      <Route
        path="signup"
        element={
          <Authlayout authentication={false}>
            <Signuppage />
          </Authlayout>
        }
      />

      {/* Protected routes */}
      <Route
        path="all-posts"
        element={
          <Authlayout authentication={true}>
            <AllPostspage />
          </Authlayout>
        }
      />
      <Route
        path="add-post"
        element={
          <Authlayout authentication={true}>
            <AddPostpage />
          </Authlayout>
        }
      />
      <Route
        path="edit-post/:slug"
        element={
          <Authlayout authentication={true}>
            <EditPostpage />
          </Authlayout>
        }
      />

      {/* Standalone route */}
      <Route path="post/:slug" element={<Postpage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
