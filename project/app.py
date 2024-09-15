from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

def get_disease_by_symptoms(symptoms):
    conn = sqlite3.connect('health.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Disease WHERE symptoms LIKE ?", ('%' + symptoms + '%',))
    disease = cursor.fetchone()
    conn.close()
    return disease

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    symptoms = request.form['symptoms']
    disease = get_disease_by_symptoms(symptoms)
    
    if disease:
        if disease[4]:  # curable
            message = f"The disease might be {disease[1]}. Recommended medicine: {disease[3]}."
        else:
            message = f"The disease might be {disease[1]}. Please consult a doctor."
    else:
        message = "No matching disease found. Please consult a doctor."
    
    return render_template('result.html', message=message)

if __name__ == '__main__':
    app.run(debug=True)
