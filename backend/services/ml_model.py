import joblib

def load_model():
    return joblib.load("models/trained_model.pkl")

def predict_skin_type(features):
    model = load_model()
    return model.predict([features])