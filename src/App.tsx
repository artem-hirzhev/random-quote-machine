import { useEffect, useState } from 'react';
import './App.css';
import { CSSTransition } from 'react-transition-group';

type Quote = {
  id: number;
  quote: string;
  author: string;
};

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [showBox, setShowBox] = useState(false);

  const getQuote = () => {
    return fetch('https://dummyjson.com/quotes/random')
      .then(response => response.json());
  };

  const handleButtonPress = () => {
    setShowBox(false);

    getQuote()
      .then(setQuote)
      .finally(() => setShowBox(true));
  };

  useEffect(() => {
    getQuote()
      .then(setQuote)
      .finally(() => setShowBox(true));
  }, []);

  return (
    <div className="wrapper">
      {quote && (
        <CSSTransition
          timeout={500}
          classNames="quote-box"
          in={showBox}
        >
          <div className="quote-box" id="quote-box">
            <p className="quote-box__text" id="text">
              {`" ${quote.quote}`}
            </p>

            <p className="quote-box__author" id="author">
              {`- ${quote.author}`}
            </p>

            <div className="quote-box__control">
              <a
                className="quote-box__link"
                href="https://twitter.com/intent/tweet"
                id="tweet-quote"
                rel="noreferrer"
                target="_blank"
              >
                <svg width="30px" height="30px" viewBox="0 -2 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.54752 20C16.6042 20 21.5578 12.3048 21.5578 5.63156C21.5578 5.41299 21.5578 5.19541 21.5434 4.97881C22.507 4.26394 23.3389 3.37881 24 2.36484C23.1013 2.77324 22.148 3.04106 21.1718 3.15937C22.1998 2.52826 22.9691 1.53563 23.3366 0.36622C22.3701 0.95444 21.3126 1.36899 20.2099 1.59198C18.6836 -0.0725 16.2583 -0.47988 14.294 0.59826C12.3296 1.6764 11.3148 3.97194 11.8186 6.19768C7.85942 5.99412 4.1707 4.0763 1.6704 0.9215C0.363478 3.22892 1.03103 6.1808 3.19488 7.66268C2.41127 7.63886 1.64475 7.42207 0.96 7.0306C0.96 7.05128 0.96 7.07294 0.96 7.09459C0.960641 9.4985 2.61288 11.5689 4.9104 12.0449C4.18547 12.2476 3.42488 12.2773 2.68704 12.1315C3.33211 14.1887 5.18071 15.5979 7.28736 15.6385C5.54375 17.0438 3.38982 17.8068 1.17216 17.8045C0.780387 17.8037 0.388996 17.7794 0 17.7316C2.25181 19.2136 4.87192 19.9997 7.54752 19.9961" fill="#fef2e4" />
                </svg>
              </a>

              <button
                className="quote-box__button"
                id="new-quote"
                onClick={handleButtonPress}
              >
                New quote
              </button>
            </div>
          </div>
        </CSSTransition>
      )}
    </div>
  );
}

export default App;
