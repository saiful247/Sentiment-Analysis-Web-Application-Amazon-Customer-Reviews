import React, { useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("Type Here");
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const onClickPredictSentiment = async () => {
    const text = inputValue.trim();
    if (!text || text === "Type Here") {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);
    const url = "http://127.0.0.1:5000/predict_sentiment";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sentiment");
      }

      const data = await response.json();
      document.getElementById(
        "uiPredictedSentiment"
      ).innerHTML = `<h2 class="text-xl font-semibold text-gray-900">The Sentiment: ${data.sentiment}</h2>`;
    } catch (error) {
      document.getElementById(
        "uiPredictedSentiment"
      ).innerHTML = `<h2 class="text-xl font-semibold text-red-500">Error predicting sentiment</h2>`;
    }
  };

  const handleFocus = () => {
    if (!isInputClicked) {
      setInputValue("");
      setIsInputClicked(true);
    }
  };

  const handleBlur = () => {
    if (!inputValue.trim()) {
      setInputValue("Type Here");
      setIsInputClicked(false);
    }
  };

  return (
    <div className="flex gap-8 min-h-screen bg-gray-100 p-8">
      {/* Left Side: Sentiment Analysis */}
      <div className="w-[30%] h-[45vh] p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Amazon Customer Review Sentiment Analysis
        </h1>
        <div className="relative">
          <input
            id="uiText"
            value={inputValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowWarning(false);
            }}
            placeholder="Type Here"
            className="w-full p-4 mb-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-50"
          />
          {showWarning && (
            <p className="text-red-500 text-sm mb-2">
              Please type here, then submit.
            </p>
          )}
        </div>
        <button
          onClick={onClickPredictSentiment}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transition duration-200 hover:bg-blue-700"
        >
          Predict Sentiment
        </button>
        <div id="uiPredictedSentiment" className="mt-4 text-center"></div>
      </div>

      {/* Right Side: Coding Area */}
      <div className="w-[70%] h-[90vh] p-6 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">
          Heres a Brief description of the BERT model training process:
        </h2>
        <pre className="bg-gray-800 p-4 rounded-md text-sm font-mono whitespace-pre-wrap h-[calc(100%-4rem)] overflow-auto">
          {`Data Source: started with a dataset from Kaggle, which contained customer reviews. Initially, this dataset didn't have sentiment labels.

Preprocessing: preprocessed the text using Python's nltk library to clean and prepare the review text. This included tasks like removing stop words, special characters, and tokenizing the text.

Sentiment Labeling: Since the dataset lacked sentiment labels, I used the VADER sentiment analysis tool to calculate the polarity scores for each review. Based on the compound score, I assigned a sentiment label: "Positive" (for positive sentiment) and "Negative" (for negative sentiment). These labels were then mapped to numerical values, where 1 indicated positive sentiment and 0 indicated negative sentiment.

Feature Vectorization: To convert the text data into numerical features suitable for machine learning models, I used the TF-IDF (Term Frequency-Inverse Document Frequency) method to vectorize the text data.

Model Training (Logistic Regression & XGBoost): Initially, I trained the sentiment analysis model using Logistic Regression and XGBoost classifiers. However, both models produced inaccurate sentiment predictions.

Addressing Data Imbalance (SMOTE): Since the dataset was imbalanced (more positive reviews than negative ones), I applied SMOTE (Synthetic Minority Oversampling Technique) to oversample the minority class (negative sentiment) in an attempt to balance the dataset. Despite this, the results from Logistic Regression and XGBoost were still incorrect.

Switching to BERT: I then switched to using BERT (Bidirectional Encoder Representations from Transformers), a pre-trained deep learning model specifically designed for natural language processing tasks. This approach worked much better, yielding accurate sentiment predictions for the majority of the reviews.

Model Export: After training the BERT model successfully, I exported it, allowing I to use it for inference in a production environment.

Deployment: To make the model accessible to users, I built a Flask API to handle sentiment prediction requests and connected it to a React frontend for user interaction. This system allows users to input a review, and the model returns a sentiment prediction (positive or negative).

This journey involved multiple steps to preprocess the data, train various models, and finally settle on a solution with BERT that worked well for sentiment analysis. The deployment with Flask and React enables easy interaction with the model for sentiment prediction in real-time.`}
        </pre>
      </div>
    </div>
  );
};

export default Home;
