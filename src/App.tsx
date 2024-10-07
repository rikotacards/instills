import {
  BrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";
import { CreatePostFormNarrow } from "./components/CreatePostFormNarrow";
import { Post } from "./components/Post";
import { Layout } from "./layout/Layout";
import { CreatePostProvider } from "./providers/createPostProvider";
function App() {
  return (
    <BrowserRouter>
      <CreatePostProvider>
        <Layout>
          {/* <Post /> */}
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="/create" element={<CreatePostFormNarrow />} />
          </Routes>
        </Layout>
      </CreatePostProvider>
    </BrowserRouter>
  );
}

export default App;
