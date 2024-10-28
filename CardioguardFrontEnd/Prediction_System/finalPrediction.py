# from flask import Flask, request, jsonify
# from flask_cors import CORS

# import numpy as np
# from sklearn.linear_model import LogisticRegression
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score
# import pandas as pd

# # Initialize Flask app
# app = Flask(__name__)

# # Enable CORS
# CORS(app)

# # Load and preprocess the dataset
# heart_data = pd.read_csv('Prediction System\heart_disease_data.csv')
# heart_data = heart_data.dropna().drop_duplicates()

# # Separate features and target
# X = heart_data.drop(columns='target', axis=1)
# Y = heart_data['target']

# # Split the data into training and testing sets
# X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.5, stratify=Y, random_state=2)

# # Train a logistic regression model
# model = LogisticRegression(max_iter=1000)
# model.fit(X_train, Y_train)

# # Calculate accuracy on training data
# X_train_prediction = model.predict(X_train)
# training_data_accuracy = accuracy_score(Y_train, X_train_prediction)

# # Calculate accuracy on test data
# X_test_prediction = model.predict(X_test)
# test_data_accuracy = accuracy_score(Y_test, X_test_prediction)

# def testing_prediction(input_data):
#     input_data_as_numpy_array = np.asarray(input_data)
#     input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
#     prediction = model.predict(input_data_reshaped)
    
#     result = 'The Person has the possibility to have a Heart Disease' if prediction[0] == 1 else 'The Person does not show any risk of a Heart Disease'
#     dataset = {
#         'Result': result,
#         'Accuracy on Training data': f'{round(training_data_accuracy * 100, 2)}%',
#         'Accuracy on Test data': f'{round(test_data_accuracy * 100, 2)}%'
#     }
#     return dataset

# @app.route('/predict', methods=['POST'])
# def predict():
#     if request.method == 'POST':
#         data = request.get_json(force=True)
#         input_data = list(data['data'].values())
#         dataset = testing_prediction(input_data)
#         return jsonify(dataset)

# if __name__ == '__main__':
#     app.run(port=8005, debug=True)
    
# CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})
# ==================================================================================================
# # Version 2

# from flask import Flask, request, jsonify
# from flask_cors import CORS

# import numpy as np
# from sklearn.linear_model import LogisticRegression
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score
# import pandas as pd

# # Initialize Flask app
# app = Flask(__name__)

# # Enable CORS
# CORS(app)

# # Load and preprocess the dataset
# # Ensure that the file path is correct and uses double backslashes for Windows or forward slashes.
# heart_data = pd.read_csv('Prediction_System/heart_disease_data.csv')
# heart_data = heart_data.dropna().drop_duplicates()

# # Separate features and target
# X = heart_data.drop(columns='target', axis=1)
# Y = heart_data['target']

# # Split the data into training and testing sets
# X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.5, stratify=Y, random_state=2)

# # Train a logistic regression model
# model = LogisticRegression(max_iter=1000)
# model.fit(X_train, Y_train)

# # Calculate accuracy on training data
# X_train_prediction = model.predict(X_train)
# training_data_accuracy = accuracy_score(Y_train, X_train_prediction)

# # Calculate accuracy on test data
# X_test_prediction = model.predict(X_test)
# test_data_accuracy = accuracy_score(Y_test, X_test_prediction)

# # Prediction function
# def testing_prediction(input_data):
#     input_data_as_numpy_array = np.asarray(input_data)
#     input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
#     prediction = model.predict(input_data_reshaped)
    
#     result = 'Higher chance for a Heart Disease' if prediction[0] == 1 else 'Minimum signs of a Heart Disease'
#     dataset = {
#         'Result': result,
#         'Accuracy on Training data': f'{round(training_data_accuracy * 100, 2)}%',
#         'Accuracy on Test data': f'{round(test_data_accuracy * 100, 2)}%'
#     }
#     return dataset

# # Prediction API endpoint
# @app.route('/predict', methods=['POST'])
# def predict():
#     if request.method == 'POST':
#         data = request.get_json(force=True)
#         input_data = list(data['data'].values())
#         dataset = testing_prediction(input_data)
#         return jsonify(dataset)

# # Run Flask app
# if __name__ == '__main__':
#     app.run(port=8005, debug=True)


# =============================================================================================================

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import pandas as pd
# from sklearn.linear_model import LogisticRegression
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score
# import matplotlib.pyplot as plt
# import base64
# from io import BytesIO

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# # Load and preprocess the dataset
# heart_data = pd.read_csv('Prediction_System/heart_disease_data.csv')
# heart_data = heart_data.dropna().drop_duplicates()

# # Separate features and target
# X = heart_data.drop(columns='target', axis=1)
# Y = heart_data['target']

# # Split the data into training and testing sets
# X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.5, stratify=Y, random_state=2)

# # Train a logistic regression model
# model = LogisticRegression(max_iter=1000)
# model.fit(X_train, Y_train)

# # Calculate accuracy
# training_data_accuracy = accuracy_score(Y_train, model.predict(X_train))
# test_data_accuracy = accuracy_score(Y_test, model.predict(X_test))

# # Prediction function with graph generation
# def testing_prediction(input_data):
#     input_data_as_numpy_array = np.asarray(input_data)
#     input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
#     prediction = model.predict(input_data_reshaped)
    
#     result = 'Higher chance for a Heart Disease' if prediction[0] == 1 else 'Minimum signs of a Heart Disease'
    
#     # Create graphs comparing input data to the dataset
#     graphs = {}
#     for i, feature in enumerate(X.columns):
#         plt.figure()
#         plt.hist(X[feature], bins=30, alpha=0.7, label='Dataset')
#         plt.axvline(input_data[i], color='r', linestyle='dashed', linewidth=2, label='Input Data')
#         plt.title(f'{feature} Comparison')
#         plt.legend()

#         # Convert graph to base64 image
#         buffer = BytesIO()
#         plt.savefig(buffer, format='png')
#         buffer.seek(0)
#         image_base64 = base64.b64encode(buffer.read()).decode('utf-8')
#         plt.close()

#         graphs[feature] = image_base64

#     dataset = {
#         'Result': result,
#         'Accuracy on Training data': f'{round(training_data_accuracy * 100, 2)}%',
#         'Accuracy on Test data': f'{round(test_data_accuracy * 100, 2)}%',
#         'Graphs': graphs
#     }
    
#     return dataset

# # Prediction API endpoint
# @app.route('/predict', methods=['POST'])
# def predict():
#     if request.method == 'POST':
#         data = request.get_json(force=True)
#         input_data = list(data['data'].values())
#         dataset = testing_prediction(input_data)
#         return jsonify(dataset)

# # Run Flask app
# if __name__ == '__main__':
#     app.run(port=8005, debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

# Constants
MODEL_PARAMS = {'max_iter': 1000}
TEST_SIZE = 0.5
RANDOM_STATE = 2

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

def load_data(filepath):
    """
    Load and preprocess the heart disease dataset.

    Args:
        filepath (str): Path to the dataset file.
    
    Returns:
        X (DataFrame): Features.
        Y (Series): Target.
    """
    try:
        data = pd.read_csv(filepath)
        data = data.dropna().drop_duplicates()
        X = data.drop(columns='target', axis=1)
        Y = data['target']
        return X, Y
    except Exception as e:
        raise Exception(f"Error loading dataset: {str(e)}")

def train_model(X_train, Y_train):
    """
    Train a logistic regression model.

    Args:
        X_train (DataFrame): Training features.
        Y_train (Series): Training target.
    
    Returns:
        model (LogisticRegression): Trained logistic regression model.
    """
    model = LogisticRegression(**MODEL_PARAMS)
    model.fit(X_train, Y_train)
    return model

def get_model_metrics(model, X_train, Y_train, X_test, Y_test):
    """
    Get model accuracy and confusion matrix.

    Args:
        model (LogisticRegression): Trained logistic regression model.
        X_train (DataFrame): Training features.
        Y_train (Series): Training target.
        X_test (DataFrame): Testing features.
        Y_test (Series): Testing target.
    
    Returns:
        dict: Dictionary containing accuracy on training and test data, and confusion matrix.
    """
    # Training accuracy
    train_pred = model.predict(X_train)
    train_acc = accuracy_score(Y_train, train_pred)

    # Test accuracy
    test_pred = model.predict(X_test)
    test_acc = accuracy_score(Y_test, test_pred)

    # Confusion matrix
    conf_matrix = confusion_matrix(Y_test, test_pred)
    
    return {
        'train_acc': train_acc,
        'test_acc': test_acc,
        'conf_matrix': conf_matrix
    }

# Load dataset and prepare data
X, Y = load_data('Prediction_System/heart_disease_data.csv')
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=TEST_SIZE, stratify=Y, random_state=RANDOM_STATE)

# Train the model
model = train_model(X_train, Y_train)

# Get model metrics
metrics = get_model_metrics(model, X_train, Y_train, X_test, Y_test)

def testing_prediction(input_data):
    """
    Make predictions on input data and return results.

    Args:
        input_data (list): Input features for prediction.
    
    Returns:
        dict: Prediction results with accuracy and confusion matrix.
    """
    try:
        input_data_as_numpy_array = np.asarray(input_data)
        input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
        prediction = model.predict(input_data_reshaped)

        result = 'Higher chance for a Heart Disease' if prediction[0] == 1 else 'Minimum signs of a Heart Disease'
        return {
            'Result': result,
            'Accuracy on Training data': f'{round(metrics["train_acc"] * 100, 2)}%',
            'Accuracy on Test data': f'{round(metrics["test_acc"] * 100, 2)}%',
            'Confusion Matrix': metrics['conf_matrix'].tolist()
        }
    except Exception as e:
        return {'error': str(e)}

# API route for predictions
@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint for heart disease prediction.
    
    Returns:
        json: Prediction result.
    """
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            input_data = list(data['data'].values())
            prediction_result = testing_prediction(input_data)
            return jsonify(prediction_result)
        except Exception as e:
            return jsonify({'error': f"Failed to process input: {str(e)}"}), 400

# Run Flask app
if __name__ == '__main__':
    app.run(port=8005, debug=True)
