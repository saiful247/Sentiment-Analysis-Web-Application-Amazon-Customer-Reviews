from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)


@app.route('/predict_sentiment', methods=['POST'])
def predict_sentiment_analysis():
    try:
        data = request.get_json()
        text = data.get('text', '')
        sentiment = util.predict_analysis(text)

        response = jsonify({'sentiment': sentiment})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'}), 500


if __name__ == '__main__':
    print('Starting Python Flask Server for Sentiment Analysis')
    util.load_saved_artifacts()
    app.run()
