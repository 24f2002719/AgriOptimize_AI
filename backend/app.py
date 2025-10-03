from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai
import os

# 1. Create the Flask application instance first.
app = Flask(__name__)

# 2. Now, configure CORS on the 'app' instance with your Vercel URL.
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://agri-optimize-ai.vercel.app" 
            # Ensure this URL is exactly your Vercel app's URL
        ]
    }
})

# --- CONFIGURATION ---
# These are fetched safely from Environment Variables set on Render.
CROP_RECOMMENDATION_URL = os.environ.get('CROP_RECOMMENDATION_URL')
FERTILIZER_RECOMMENDATION_URL = os.environ.get('FERTILIZER_RECOMMENDATION_URL')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

# --- CHATBOT CONFIGURATION ---
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
try:
    # CORRECTED: Use the stable, correct model name.
    model = genai.GenerativeModel('gemini-2.5-flash')
except Exception as e:
    print(f"Error initializing Gemini: {e}")
    model = None

# Persona for the chatbot
agro_persona = """
You are 'Agro', a friendly, concise, and knowledgeable AI farming assistant designed specifically for farmers in India. 
Your goal is to provide practical, easy-to-understand advice on crops, fertilizers, pest control, and general farming practices.
Keep your answers brief and helpful. If you don't know something, admit it and suggest consulting a local agricultural expert.
Always maintain a polite and encouraging tone.
"""

# --- API ENDPOINTS ---

@app.route('/')
def status_check():
    """A simple health check endpoint to confirm the server is running."""
    return jsonify({
        "status": "ok",
        "message": "AgriOptimize AI Backend is running successfully!"
    })

@app.route('/api/recommend/crop', methods=['POST'])
def recommend_crop():
    try:
        # CORRECTED: The full URL with the '/recommend' endpoint is required.
        full_url = f"{CROP_RECOMMENDATION_URL}/recommend"
        
        response = requests.post(full_url, json=request.json)
        response.raise_for_status() # This will raise an error for 4xx or 5xx responses
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': f'Crop model connection error: {e}'}), 503

@app.route('/api/recommend/fertilizer', methods=['POST'])
def recommend_fertilizer():
    try:
        # CORRECTED: The full URL with the '/recommend_fertilizer' endpoint is required.
        full_url = f"{FERTILIZER_RECOMMENDATION_URL}/recommend_fertilizer"
        
        response = requests.post(full_url, json=request.json)
        response.raise_for_status()
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': f'Fertilizer model connection error: {e}'}), 503

@app.route('/api/chat', methods=['POST'])
def chat_with_agro():
    # A cleaner check for the API key.
    if not GEMINI_API_KEY or not model:
        return jsonify({'reply': "Chatbot is not configured on the server."})
    
    try:
        data = request.json
        user_message = data.get('message', '')
        language = data.get('language', 'en')

        if not user_message: return jsonify({'reply': "Please ask me something!"})

        language_instruction = "YOU MUST ANSWER THE FOLLOWING QUESTION IN HINDI." if language == 'hi' else "YOU MUST ANSWER THE FOLLOWING QUESTION IN ENGLISH."
        full_prompt = f"{agro_persona}\n\n{language_instruction}\n\nFarmer asked: {user_message}\nAgro's Answer:"
        
        response = model.generate_content(full_prompt)
        return jsonify({'reply': response.text})
    except Exception as e:
        print(f"Error in chat: {e}")
        return jsonify({'reply': "Sorry, I'm having trouble connecting right now."}), 500

# This part is only for local testing. Gunicorn handles this in production.
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)