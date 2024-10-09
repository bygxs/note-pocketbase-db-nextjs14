"use client";

import { useState } from "react";
import pb from "../lib/pocketbase"; // Adjusted import

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const create = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      await pb.collection("notes").create({ title, content }); // Ensure collection is 'notes'
      setSuccessMessage("SUCCESS ! Note saved in the database!"); // Set success message
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
      setSuccessMessage(""); // Reset success message on error
    }
  };

  return (
    <form onSubmit={create}>
      <h3>Create New Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Create Note</button>
      {successMessage && <p>{successMessage}</p>} {/* Display success message */}
    </form>
  );
};

export default CreateNote;