import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "../../App.css";

interface QuoteCardProps {
  randomColor: string;
  quote: { quote: string; author: string };
  transition: string;
  changeQuote: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  randomColor,
  quote,
  transition,
  changeQuote,
}) => {
  return (
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
  );
};
