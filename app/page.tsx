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
        const records = await pb.collection("notes").getFullList(); // Ensure you're fetching from "notes"
        setNotes(records);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Welcome to NoteMaster: Your Ultimate Note-Taking Companion!</h1>
      <h2>
        Capture Your Thoughts, Organize Your Ideas, and Boost Your Productivity!
      </h2>
      <p>
        In todays fast-paced world, the ability to jot down thoughts, ideas, and
        important information is more crucial than ever. NoteMaster is a
        powerful Progressive Web App designed to help you take control of your
        notes like never before. Whether you are a student, a professional, or
        simply someone who loves to keep track of their thoughts, our app is
        here to support you.
      </p>
      What You Can Do with NoteMaster:
      <p>
        Seamless Note Creation: Quickly create and edit notes with an intuitive
        interface that makes capturing your thoughts effortless. Organize with
        Ease: Use tags, folders, and search functionality to keep your notes
        organized and easily accessible. Collaborate and Share: Work together
        with friends or colleagues by sharing notes and collaborating in
        real-time. Access Anywhere: Enjoy the flexibility of accessing your
        notes from any device, online or offline. Stay Inspired: Use our
        built-in templates and prompts to spark creativity and keep your ideas
        flowing. Why Taking Notes Matters: Taking notes is not just about
        recording information; it is a powerful tool for enhancing memory,
        improving focus, and fostering creativity. By capturing your thoughts,
        you can clarify your ideas, track your progress, and unlock new
        insights. With NoteMaster, you will never miss a moment of inspiration
        again! Join us today and transform the way you take notes!
      </p>
      <h2>Here are Your Notes</h2>
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
