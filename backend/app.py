from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from sensor_reader import read_sensor
from cost_calc import calculate_energy_cost, calculate_mold_risk

app = Flask(__name__)
CORS(app)

# JWT Secret
app.config["SECRET_KEY"] = "temp_secret_key_for_hackathon"

# In-memory user store (for demo/hackathon)
users_db = {}  # {username: {"password_hash":..., "goals":[...] }}

# ------------------ Auth Routes ------------------

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    goals = data.get("goals", [])

    if username in users_db:
        return jsonify({"error": "User already exists"}), 400

    password_hash = generate_password_hash(password)
    users_db[username] = {"password_hash": password_hash, "goals": goals}

    token = jwt.encode(
        {"username": username, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({"token": token, "goals": goals})


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users_db.get(username)
    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode(
        {"username": username, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({"token": token, "goals": user.get("goals", [])})


# ------------------ Sensor Routes ------------------

@app.route("/")
def index():
    return jsonify({"message": "Smart Home Savings Backend Running 🚀"})


@app.route("/latest", methods=["GET"])
def latest_reading():
    temp, humidity = read_sensor()

    if temp is None or humidity is None:
        return jsonify({"error": "No data found in Firebase"}), 404

    energy_cost = calculate_energy_cost(temp)
    mold_risk = calculate_mold_risk(humidity)

    return jsonify({
        "temperature": temp,
        "humidity": humidity,
        "energy_cost": energy_cost,
        "mold_risk": mold_risk
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
    print("Backend server is running...")
