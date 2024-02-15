
// import React from "react";
// import { useQuery } from "react-query";
// import { Link } from "react-router-dom";

// const fetchPosts = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   return response.json();
// };

// const PostListPage: React.FC = () => {
//   const { isLoading, error, data: posts } = useQuery("posts", fetchPosts);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {(error as Error).message}</div>;

//   return (
//     <div>
//       <h1>Post List Page</h1>
//       {posts.map((post: any) => (
//         <li key={post.id}>
//           <Link to={`/post/${post.id}`}>
//             <h2>{post.title}</h2>
//             <p>{post.body}</p>
//           </Link>
//         </li>
//       ))}
//       <Link to="/post/1">View Post 1</Link>
//     </div>
//   );
// };

// export default PostListPage;


// PostListPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    // Cleanup function to cancel fetching if component unmounts before fetching completes
    return () => {
      // Your cleanup logic here if needed
    };
  }, []); // Empty dependency array means this effect runs only once, after initial render

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Post List Page</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <Link to={`/post/${post.id}`}>View Post {post.id}</Link>
        </div>
      ))}
    </div>
  );
};

export default PostListPage;
