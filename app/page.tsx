// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import pb from "./lib/pocketbase";

interface Note {
  id: string;
  title: string;
  content?: string; // Optional if you have a content field
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const records = await pb.collection("notes").getFullList();
        setNotes(records);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="note">
            <strong>{note.title}</strong>
            <p>{note.content}</p> {/* Display note content */}
          </li>
        ))}
      </ul>
    </div>
  );
}