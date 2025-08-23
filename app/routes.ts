import { type RouteConfig, index, route } from "@react-router/dev/routes";
export default [
  index("routes/home.tsx"),
  route("/resume/:id", "routes/resume.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/upload", "routes/upload.tsx"),
  route("*", "routes/404.tsx") // Catch-all route for unknown paths
  
] satisfies RouteConfig;
