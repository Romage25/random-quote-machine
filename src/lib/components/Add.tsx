import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

function Add() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quote.trim() || !author.trim()) {
      setError("Both quote and author fields are required");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "quotes"), {
        quote: quote.trim(),
        author: author.trim(),
      });

      console.log("Document written with ID: ", docRef.id);

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error: ", error.message);
        setError("Error adding quote. Please try again.");
      } else {
        console.error("Unknown Error: ", error);
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div style={{ backgroundColor: "slategray", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center", color: "white" }}>
        Add Quote
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "20px", width: "70%" }}>
          <label
            htmlFor="quote"
            style={{ fontSize: "1.2rem", marginBottom: "5px", color: "white" }}
          >
            Quote:
          </label>
          <textarea
            name="quote"
            id="quote"
            maxLength={400}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            style={{
              width: "100%",
              minHeight: "100px",
              maxHeight: "200px",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: "20px", width: "70%" }}>
          <label
            htmlFor="author"
            style={{ fontSize: "1.2rem", marginBottom: "5px", color: "white" }}
          >
            Author:
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit New Quote
        </button>
      </form>
    </div>
  );
}

export default Add;
