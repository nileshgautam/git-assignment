from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import json
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["student_db"]
collection = db["users"]

# API Route
@app.route('/api/', methods=['GET'])
def get_data():
    with open('data.json', 'r') as file:
        data = json.load(file)

    return jsonify(data)

# Form Submit Route


@app.route('/submit', methods=['POST'])
def submit_data():

    try:

        data = request.json

        result = collection.insert_one(data)

        return jsonify({
            "success": True,
            "message": "Data inserted successfully",
            "id": str(result.inserted_id)
        }), 201

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/submittodoitem', methods=['POST'])
def submit_todo():

    try:

        data = request.get_json()

        print(data)

        item = {
            "itemName": data.get("item_name"),
            "itemDescription": data.get("item_description")
        }

        result = db["todo_list"].insert_one(item)

        return jsonify({
            "success": True
        })

    except Exception as e:

        print(e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
        
if __name__ == '__main__':
    app.run(debug=True)