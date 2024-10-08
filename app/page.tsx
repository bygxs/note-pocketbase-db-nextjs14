
// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import pb from "./lib/pocketbase";

interface Post {
  id: string;
  title: string;
  content?: string; // Optional if you have a content field
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const records = await pb.collection("posts").getFullList();
        setPosts(records);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
