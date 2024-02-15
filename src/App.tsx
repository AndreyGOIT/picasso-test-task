import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostListPage from "./features/PostList/pages/PostListPage";
import PostDetailPage from "./features/PostDetail/pages/PostDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
