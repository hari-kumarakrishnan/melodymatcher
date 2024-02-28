from flask import Flask, request, jsonify
from flask_cors import CORS  # Make sure to import CORS
import requests
import numpy as np
import keras
import tensorflow as tf
app = Flask(__name__)
import sqlite3
import pandas as pd
import io
CORS(app)
def adapt_array(arr):
    """
    http://stackoverflow.com/a/31312102/190597 (SoulNibbler)
    """
    out = io.BytesIO()
    np.save(out, arr)
    out.seek(0)
    return sqlite3.Binary(out.read())

def convert_array(text):
    out = io.BytesIO(text)
    out.seek(0)
    return np.load(out)

conn = sqlite3.connect("music.db", detect_types=sqlite3.PARSE_DECLTYPES)
cur = conn.cursor()

df = pd.read_sql_query("SELECT * from music", conn)

print(df.head())




# Converts np.array to TEXT when inserting
sqlite3.register_adapter(np.ndarray, adapt_array)

# Converts TEXT to np.array when selecting
sqlite3.register_converter("array", convert_array)

model = tf.keras.models.load_model('model.h5')

def solve(df,model,sample):
    ans = []

    for i,r in df.iterrows():

        newX = np.zeros((1,50,25))

        print(r[4][:50]/r[-1])

        for j in range(newX[:50].shape[0]): 

            newX[0, j ,:13]= np.concatenate([r[5][j], [r[4][j]/r[4][-1]]])

            newX[0,:10,13:] = sample

            ans = model.predict([newX.reshape(1,50,-1),sample.flatten().reshape(1,120)])

            if(ans[0] > 0 and ans[1] > 0):

                difference_array = np.absolute(r[4]-(ans[0] * r[4][-1]))

                l = difference_array.argmin()

                difference_array = np.absolute(r[4]-(ans[1] * r[4][-1]))

                r = difference_array.argmin()

                if(l < r):
                    ans.append([np.linalg.norm(np.array(r[5][l:r]), np.array(sample)), r[1], r[2]])
    return sorted(ans,key=lambda x: x[0])
# @app.route('/keypress', methods=['POST'])  # Changed from GET to POST
# def handle_key_press():
#     data = request.json  # This will contain the data sent from the frontend
#     print(data)  # For demonstration, let's just print the received data
#     return jsonify({"message": "Key press received", "data": data}), 200
# def preprocess(data):
#     # Implement preprocessing of input data here
#     # This is highly dependent on your model and the data it expects
#     return data

# def postprocess(predictions):
#     # Implement postprocessing of predictions here
#     # This could include decoding predictions, converting to desired format, etc.
#     return predictions

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    if len(data) < 10:
        for i in range(len(data), 10):
            data.append([0] * 12)
            print("this is i: " + str(i))
    print(data)
    print(len(data))
    np_data = np.array(data).flatten()  # Assuming data is in the correct shape


    predictions = model.predict(np_data)  # Reshape if necessary

    # Convert predictions to list (if they're in NumPy array format) for JSON serialization
    predictions_list = predictions.tolist()
    print(predictions_list)
    # Return predictions as a response
    return jsonify(predictions_list)

def convert_seconds_to_minutes(seconds):
    # Calculate the minutes and remaining seconds
    minutes = int(seconds // 60)
    remaining_seconds = int(seconds % 60)
    
    # Format the string as "minutes:seconds"
    return f"{minutes}:{remaining_seconds:02d}"

# Example usage
seconds = 123.456  # Example number of seconds
time_string = convert_seconds_to_minutes(seconds)
time_string
# @app.route('/spotify_search', methods=['GET'])
def handle_spotify():
    query = r"remaster%2520track%3ASicko%2520Mode%2520artist%3ATravis%2520Scott"
    # type_ = request.args.get('type', 'track')
    # limit = request.args.get('limit', '2')
    # offset = request.args.get('offset', '0')
   # Use the provided query parameters
    url = f'https://api.spotify.com/v1/search?q={query}&type=track&limit=2&offset=5'
    # Make the API call to Spotify
    headers = {'Authorization': 'Bearer BQCdKs-FGtnkc7rvRWHJhNDK7jSZZXcr51d4OzyfC1KHPpm5KGY-spluZi3fzgr9GTTeuxsS60gaTvWNTWuKnj84ah_G1rNFCOC-Kz-4wzH3cSEcp7c'}
    response = requests.get(url, headers=headers).json()
    first_image_url = response['tracks']['items'][0]['album']['images'][0]['url']
    print(first_image_url)



if __name__ == '__main__':
    app.run(debug=True)  # debug=True is only for development!
    # print(handle_spotify())
    # # [[pitch]]