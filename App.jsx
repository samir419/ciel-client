
import {HashRouter, Routes, Route} from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Cindex from "./register";
import Chome from "./home";
import Ciel_profile from "./profile";
import Ciel_posts from "./posts";
import User from "./user";
import Chat from "./chat";
import Join_chat from "./joinchat"
import Forums from "./forums";
import Forum from "./forum";
import Myforum from "./myforum";
import Topic from "./topic"
import Post from "./post";
import Product from "./product";
import Products from "./products";
import Test from "./test";


function App() {
  return (
   <>
     <div>
    
     </div>
     <HashRouter>
      <Routes>
        <Route index element={<Chome />} />
        <Route path="/cindex" element={<Cindex />} />
        <Route path="/chome" element={<Chome />} />
        <Route path="profile" element={<Ciel_profile />} />
        <Route path="/posts" element={<Ciel_posts />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/join_chat/:id" element={<Join_chat />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/forum/:id" element={<Forum />} />
        <Route path="/myforum/:id" element={<Myforum />} />
        <Route path="/topic/:id" element={<Topic />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/test" element={<Test />} />

      
      </Routes>
    </HashRouter>
   </>
  );
}

export default App;
