import React from "react";
import { useState, useEffect } from "react";

const Posts = ({ searchTerm, isLoading }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}`
    );

    const data = await response.json();
    setPosts(data.hits);
  };

  return (
    <div>
      <ol>
        {posts.length
          ? posts.map((post) => {
              return (
                <li key={post.objectId}>
                  <h4>{post.title}</h4>
                  <p>
                    <span className="subtext">
                      {post.points} points by {post.author}
                    </span>
                  </p>
                </li>
              );
            })
          : null}
      </ol>
      <br />
      <button onClick={() => setPage(Math.max(page - 1, 1))}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Posts;
