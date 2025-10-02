# AgriOptimize AI 🌱🤖

**AgriOptimize AI** is a comprehensive web application designed to empower farmers with modern, AI-driven tools. It provides intelligent recommendations for both crop selection and fertilizer application, and features an interactive chatbot assistant named "Agro" for general farming queries.

The project is built with a microservice architecture, where distinct AI models for crop and fertilizer prediction are served by their own APIs, orchestrated by a central backend.

---

## ✨ Features

*   **AI Crop Recommendation**: Recommends the most suitable crop to plant based on soil composition (N, P, K), temperature, humidity, pH, and rainfall.
*   **AI Fertilizer Recommendation**: Predicts the optimal fertilizer name based on a comprehensive set of soil and environmental data, including soil type, crop type, and nutrient values.
*   **"Agro" the Chatbot**: An interactive AI assistant powered by Google's Gemini API, trained to answer a wide range of farming-related questions in a helpful and concise manner.
*   **Microservice Architecture**: Decoupled AI models allow for independent development, scaling, and updates.
*   **Modern Frontend**: A clean, responsive user interface built with HTML and styled with Tailwind CSS.

---

## 🛠️ Technology Stack

*   **Frontend**: HTML, JavaScript, Tailwind CSS
*   **Backend (API Gateway)**: Flask (Python)
*   **AI Models**:
    *   **Framework**: Scikit-learn, Pandas
    *   **Serving**: Flask (Python)
*   **Chatbot**: Google Gemini API
*   **Architecture**: 3 distinct server processes (Backend Gateway, Crop Model, Fertilizer Model)

---

## 🚀 How to Run The Project Locally

Follow these steps to set up and run the entire application on your local machine. You will need **three separate terminal windows**.

### Prerequisites

*   Python 3.8+
*   `pip` (Python package installer)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd agri-optimize-ai```

### Step 2: Get Your Google Gemini API Key

1.  Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)** to get a free API key.
2.  Copy this key. You will need it for the backend setup.

### Step 3: Set up and Run the AI Models & Backend

#### Terminal 1: Crop Recommendation Model

1.  Navigate to the `ml` directory:
    ```bash
    cd ml
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Train the model:
    ```bash
    python train.py
    ```
5.  Start the server (runs on port 5001):
    ```bash
    python model_server.py
    ```
    **Keep this terminal running.**

#### Terminal 2: Fertilizer Recommendation Model

1.  Open a **new terminal**.
2.  Navigate to the `fertilizer_model` directory:
    ```bash
    cd fertilizer_model
    ```
3.  Create and activate its virtual environment:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
4.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5.  Train the model:
    ```bash
    python train.py
    ```
6.  Start the server (runs on port 5002):
    ```bash
    python model_server.py
    ```
    **Keep this terminal running.**

#### Terminal 3: Main Backend (API Gateway)

1.  Open a **third terminal**.
2.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
3.  Create and activate its virtual environment:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
4.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5.  **Configure Agro:** Open the `backend/app.py` file and paste your Google Gemini API key into the `GEMINI_API_KEY` variable.
6.  Start the server (runs on port 5000):
    ```bash
    python app.py
    ```
    **Keep this terminal running.**

### Step 4: Access the Application

*   Navigate to the `frontend` folder in your file explorer.
*   Double-click the `index.html` file to open it in your web browser.

The application is now fully running on your local machine!