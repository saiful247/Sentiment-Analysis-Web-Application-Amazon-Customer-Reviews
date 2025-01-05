from transformers import BertTokenizer, BertForSequenceClassification
import torch

__model = None
__tokenizer = None
__path = './artifacts/bert_sentiment_model'


def load_saved_artifacts():
    global __model
    global __tokenizer

    __model = BertForSequenceClassification.from_pretrained(__path)
    __tokenizer = BertTokenizer.from_pretrained(__path)


def predict_analysis(text):
    inputs = __tokenizer(text, return_tensors="pt",
                         padding="max_length", truncation=True, max_length=512)
    outputs = __model(**inputs)
    prediction = torch.argmax(outputs.logits, axis=1).item()
    return "Positive" if prediction == 1 else "Negative"
