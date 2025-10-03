from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app) # Allow requests from the frontend

# Load the trained model at startup
model = joblib.load('crop_recommendation_model.pkl')

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        print("Received data:", data)

        # Convert incoming JSON to a pandas DataFrame
        # The column names must match the ones used for training
        input_data = pd.DataFrame({
            'N': [float(data['n'])],
            'P': [float(data['p'])],
            'K': [float(data['k'])],
            'temperature': [float(data['temperature'])],
            'humidity': [float(data['humidity'])],
            'ph': [float(data['ph'])],
            'rainfall': [float(data['rainfall'])]
        })

        # Make a prediction (recommendation)
        prediction = model.predict(input_data)
        
        # Return the prediction as JSON
        return jsonify({'crop': prediction[0]})

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    # Before running, train the model by running train.py first!
    print("Starting ML Model Server for Crop Recommendation...")
    app.run(host='0.0.0.0', port=5001, debug=False)