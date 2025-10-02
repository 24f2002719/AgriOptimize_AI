import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

# Load the dataset
data = pd.read_csv('fertilizer_dataset.csv')

# Identify categorical features
categorical_features = ['Soil_Type', 'Crop_Type']
encoders = {}
for col in categorical_features:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    encoders[col] = le
    
# Define features (X) and target (y)
X = data.drop('Fertilizer_Name', axis=1)
y = data['Fertilizer_Name']

# --- NEW: SAVE THE COLUMN NAMES AND ORDER ---
# This is the crucial new step. We save the exact schema.
model_columns = list(X.columns)
joblib.dump(model_columns, 'fertilizer_model_columns.pkl')
print(f"Model columns saved: {model_columns}")
# -------------------------------------------

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest Classifier model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, y_pred)}")

# Save the trained model, encoders, and now the columns file
joblib.dump(model, 'fertilizer_recommendation_model.pkl')
joblib.dump(encoders, 'fertilizer_encoders.pkl')

print("Model, encoders, and columns have been saved.")