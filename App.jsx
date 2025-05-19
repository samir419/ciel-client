
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Cindex from "./register";
import Chome from "./home";
import Ciel_profile from "./profile";
import Ciel_posts from "./posts";
import User from "./user";
import Chat from "./chat";
import Join_chat from "./joinchat"
function App() {
  return (
   <>
     <div>
    
     </div>
     <BrowserRouter>
      <Routes>
        <Route index element={<Chome />} />
        <Route path="/cindex" element={<Cindex />} />
        <Route path="/chome" element={<Chome />} />
        <Route path="profile" element={<Ciel_profile />} />
        <Route path="/posts" element={<Ciel_posts />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/join_chat/:id" element={<Join_chat />} />
      
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
