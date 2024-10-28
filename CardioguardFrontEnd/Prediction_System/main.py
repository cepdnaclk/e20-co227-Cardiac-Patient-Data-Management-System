from flask import *
import json
from finalPrediction import testing_prediction

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        data = request.get_json(force=True)
        input_data = list(data['data'].values())
        dataset = testing_prediction(input_data)
        return jsonify(dataset)

if __name__ == '__main__':
    app.run(port=8000, debug=True)