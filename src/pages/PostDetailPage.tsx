// import React from "react";
// import {  Link, useParams } from "react-router-dom";
// import { useQuery } from "react-query";


// const fetchPost = async (id: string) => {
//   console.log("старт запроса поста по айди");
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${id}`
//   );
//   console.log("запрос одного поста завершен");
//   return response.json();
// };

//  const PostDetailPage: React.FC = () => {
//   const { id } = useParams<{ id?: string }>();
//   const { data: post } = useQuery(["post", id], () => id ? fetchPost(id) : null);

//   return (
//     <div>
//       <h1>Post Details</h1>
//       <p>{post?.title}</p>
//       <p>{post?.body}</p>
//       <Link to="/">Back</Link>
//     </div>
//   );
// };

// export default PostDetailPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("ID=", id);
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        console.log("RESPONSE", response);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
        console.log(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();

    return () => {
      // Отменить выполнение запроса, если компонент размонтируется до завершения запроса
    };
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return null;

  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>Title: {post.title}</p>
      <p>Body: {post.body}</p>
    </div>
  );
};

export default PostDetailPage;

