import { useState, useEffect } from "react";
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";
import { BeatLoader } from "react-spinners";

interface Quote {
  quote: string;
  author: string;
}

const getRandomColor = (): string => {
  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6864",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function App() {
  const [quote, setQuote] = useState<Quote>({ quote: "", author: "" });
  const [randomColor, setRandomColor] = useState<string>(getRandomColor());
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRandomQuote = (quotes: Quote[]): Quote => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const changeQuote = () => {
    const newQuote = getRandomQuote(quotes);
    setQuote(newQuote);
    setRandomColor(getRandomColor());
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quotes"));
        const dbQuotes: Quote[] = querySnapshot.docs.map(
          (doc) => doc.data() as Quote
        );
        setQuotes(dbQuotes);
        setIsLoading(false);
        const randomQuote = getRandomQuote(dbQuotes);
        setQuote(randomQuote);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const transition = "all 1s ease-in-out";

  return (
    <div
      className="background"
      style={{ backgroundColor: randomColor, transition: transition }}
    >
      <div>
        <h1>Random Quote Machine</h1>

        <div id="quote-box">
          {isLoading ? (
            <div style={{ margin: "auto" }}>
              <BeatLoader color={randomColor} size={25} />
            </div>
          ) : (
            <>
              <div
                className="quote-content"
                style={{ color: randomColor, transition: transition }}
              >
                <h2 id="text">
                  <FaQuoteLeft size="30" style={{ marginRight: "10px" }} />{" "}
                  {quote.quote}{" "}
                  <FaQuoteRight size="30" style={{ marginLeft: "10px" }} />
                </h2>

                <h4 id="author">- {quote.author}</h4>
              </div>
              <div className="buttons">
                <a
                  href="#"
                  id="tweet-quote"
                  style={{
                    backgroundColor: randomColor,
                    marginRight: "10px",
                    transition: transition,
                  }}
                >
                  <FaTwitter color="white" />
                </a>
                <button
                  id="new-quote"
                  onClick={changeQuote}
                  style={{ backgroundColor: randomColor, transition }}
                >
                  Change Quote
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
