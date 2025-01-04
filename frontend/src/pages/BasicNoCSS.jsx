import React from "react";

const Home = () => {
  const onClickPredictSentiment = async () => {
    const text = document.getElementById("uiText").value;
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
      ).innerHTML = `<h2>The Sentiment: ${data.sentiment}</h2>`;
    } catch (error) {
      document.getElementById(
        "uiPredictedSentiment"
      ).innerHTML = `<h2>Error predicting sentiment</h2>`;
    }
  };

  return (
    <div>
      <h1>Amazon Customer Review Sentiment Analysis</h1>
      <input id="uiText" defaultValue="I Love This Product" />
      <button onClick={onClickPredictSentiment}>Predict Sentiment</button>
      <div id="uiPredictedSentiment"></div>
    </div>
  );
};

export default Home;
