from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load the model, encoders, AND the column list at startup
model = joblib.load('fertilizer_recommendation_model.pkl')
encoders = joblib.load('fertilizer_encoders.pkl')
model_columns = joblib.load('fertilizer_model_columns.pkl') # Load the saved column names/order

@app.route('/recommend_fertilizer', methods=['POST'])
def recommend_fertilizer():
    try:
        data = request.json
        print("Received data for fertilizer prediction:", data)

        # Create a DataFrame from the input
        input_data = pd.DataFrame([data])

        # --- NEW ROBUST FIX ---

        # 1. Convert numeric columns to float first
        numeric_features = ['Temparature', 'Humidity', 'Moisture', 'Nitrogen', 'Potassium', 'Phosphorous']
        for col in numeric_features:
            input_data[col] = input_data[col].astype(float)

        # 2. Encode the categorical features
        for col, le in encoders.items():
            input_data[col] = input_data[col].apply(lambda x: le.transform([x])[0] if x in le.classes_ else -1)

        # 3. CRUCIAL STEP: Ensure the DataFrame has the exact same columns in the exact same order.
        # This reindexes the dataframe, adding any missing columns (and filling with 0) and
        # ensuring the order is identical to what the model was trained on.
        input_data = input_data.reindex(columns=model_columns, fill_value=0)
        
        # --- FIX ENDS HERE ---

        # Make prediction
        prediction = model.predict(input_data)
        
        return jsonify({'fertilizer': prediction[0]})

    except Exception as e:
        print("Error:", e)
        # Be more specific in the error returned to the frontend
        return jsonify({'error': f"An error occurred in the prediction server: {str(e)}"}), 500

if __name__ == '__main__':
    print("Starting Fertilizer Recommendation Model Server...")
    app.run(host='0.0.0.0', port=5002, debug=False)