import { useState, useEffect } from "react";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";
import { BeatLoader } from "react-spinners";
import { QuoteCard } from "./lib/components/QuoteCard";

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
  }, []);

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
            <QuoteCard
              randomColor={randomColor}
              quote={quote}
              transition={transition}
              changeQuote={changeQuote}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
