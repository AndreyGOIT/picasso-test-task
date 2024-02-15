import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data]);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    // Cleanup function to cancel fetching if component unmounts before fetching completes
    return () => {
      // cleanup logic here if needed
    };
  }, [page]); // Re-fetch posts when page changes

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  if (isLoading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to trim text to the desired length
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="container">
      <h1>Post List Page</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <h2>
              {post.id}
              {". "}
              {post.title}
            </h2>
            <p>{truncateText(post.body, 100)}</p>
            <div className="button-wrapper">
              <Link to={`/post/${post.id}`}>
                <button>View Post {post.id}</button>
              </Link>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostListPage;
