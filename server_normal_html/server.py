from flask import Flask, request, jsonify
import util

app = Flask(__name__)


@app.route('/predict_sentiment', methods=['POST', 'GET'])
def predict_sentiment_analysis():
    text = request.form['text']

    response = jsonify({
        'sentiment': util.predict_analysis(text)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    print('Starting Python Flask Server for Sentiment Analysis')
    util.load_saved_artifacts()
    app.run()
