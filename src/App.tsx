import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";

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
