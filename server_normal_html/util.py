from transformers import BertTokenizer, BertForSequenceClassification
import numpy as np
import torch

__model = None
__tokenizer = None
__path = './artifacts/bert_sentiment_model'


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __model
    global __tokenizer

    __model = BertForSequenceClassification.from_pretrained(__path)
    __tokenizer = BertTokenizer.from_pretrained(__path)
    print("loading saved artifacts...done")


def predict_analysis(text):
    inputs = __tokenizer(text, return_tensors="pt",
                         padding="max_length", truncation=True, max_length=512)
    outputs = __model(**inputs)
    prediction = torch.argmax(outputs.logits, axis=1).item()
    sentiment = "Positive" if prediction == 1 else "Negative"
    return sentiment


if __name__ == '__main__':
    load_saved_artifacts()
    print(predict_analysis("I am very happy today"))
