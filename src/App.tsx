import {
  BrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";
import sample from "../sample.jpg";
import landscape from "../landscape.jpg";
import { Post } from "./components/Post";
import { Layout } from "./layout/Layout";
const imageUrls = [sample, landscape]
import { c } from "./components/ImageOverlay";
function App() {
  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Post captions={c} imageUrls={imageUrls} />} />
          </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
