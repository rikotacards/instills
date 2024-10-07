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
import { ProfilePage } from "./Pages/ProfilePage";
import { ProfileSettingsPage } from "./Pages/ProfileSettingsPage";
function App() {
  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Post captions={c} imageUrls={imageUrls} />} />
            <Route path="/profile/edit" element={<ProfileSettingsPage/>} />
            <Route path="/profile"  element={<ProfilePage/>} />


          </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
