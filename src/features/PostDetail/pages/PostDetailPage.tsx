import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.css';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();

    return () => {
      // Cancel the request if the component is unmounted before the request completes
    };
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return null;

  return (
    <div className="container">
      <div className="post-detail">
      <h1>Post Detail Page</h1>
      <p>Title: {post.title}</p>
      <p>Body: {post.body}</p>
      </div>
      <div className="back-button">

      <Link to="/"><button>Back</button></Link>
      </div>
    </div>
  );
};

export default PostDetailPage;

