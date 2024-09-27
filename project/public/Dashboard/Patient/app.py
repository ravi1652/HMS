from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load your trained AI model (previously saved)
model = joblib.load('stress_prediction_model.pkl')

# Route to serve the patient dashboard
@app.route('/')
def patient_dashboard():
    return render_template('patient.html')  # Renders patient.html from templates folder

# Route to handle the prediction logic
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    heart_rate = data['heart_rate']
    sleep_hours = data['sleep_hours']
    stress_level = data['stress_level']

    # Prepare the input for the model
    input_data = np.array([[heart_rate, sleep_hours, stress_level]])

    # Predict stress condition (1 = High, 0 = Low)
    prediction = model.predict(input_data)
    stress_condition = "High" if prediction[0] == 1 else "Low"

    return jsonify({'stress_condition': stress_condition})

if __name__ == '__main__':
    app.run(debug=True)
