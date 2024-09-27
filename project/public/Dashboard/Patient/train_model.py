# Save this in a Python file (e.g., train_model.py)
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

# Simulate some data (replace this with actual data)
data = {
    'Heart Rate': [100, 75, 110, 65, 85],
    'Sleep Hours': [5, 8, 4, 7, 6],
    'Stress Level': [8, 3, 9, 2, 5],
    'Stress Condition': [1, 0, 1, 0, 0]  # 1 = High stress, 0 = Low stress
}

df = pd.DataFrame(data)

# Split into features (X) and target (y)
X = df[['Heart Rate', 'Sleep Hours', 'Stress Level']]
y = df['Stress Condition']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, 'stress_model.pkl')

# Test model
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")
