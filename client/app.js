function onClickPredictSentiment() {
  var text = document.getElementById("uiText").value;
  var predictSentiment = document.getElementById("uiPredictedSentiment");

  var url = "http://127.0.0.1:5000/predict_sentiment";

  $.post(
    url,
    {
      text: text,
    },
    function (data, status) {
      console.log(data.sentiment);
      predictSentiment.innerHTML =
        "<h2> The Sentiment: " + data.sentiment + "</h2>";
      console.log(status);
    }
  );
}
