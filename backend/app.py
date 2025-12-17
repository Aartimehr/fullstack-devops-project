from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
import os
import time

# 🔐 JWT
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)

# -------------------- APP CONFIG --------------------
app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key")
jwt = JWTManager(app)

# -------------------- DATABASE CONFIG --------------------
DB_CONFIG = {
    "host":os.getenv("DB_HOST", "mysql_db"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "Nikku1234@"),
    "database": os.getenv("DB_NAME", "task_manager"),
    "port": 3306
}

db = None
cursor = None


def connect_db():
    """Retry MySQL connection until it is ready"""
    global db, cursor

    retries = 10
    while retries > 0:
        try:
            db = mysql.connector.connect(**DB_CONFIG)
            cursor = db.cursor(dictionary=True)
            print("✅ MySQL connected successfully")
            return
        except mysql.connector.Error as e:
            print(f"⏳ Waiting for MySQL... ({e})")
            retries -= 1
            time.sleep(3)

    raise Exception("❌ Could not connect to MySQL after retries")


# 🔥 CONNECT TO DB (SAFE WAY)
connect_db()

# -------------------- HEALTH CHECK --------------------
@app.route("/health")
def health():
    return jsonify({"message": "Backend is running"}), 200


# -------------------- REGISTER --------------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields required"}), 400

    hashed = generate_password_hash(password)

    try:
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, hashed)
        )
        db.commit()
        return jsonify({"message": "User registered successfully"}), 201

    except mysql.connector.errors.IntegrityError:
        return jsonify({"message": "Email already exists"}), 409


# -------------------- LOGIN --------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()

    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity={
        "id": user["id"],
        "name": user["name"],
        "email": user["email"]
    })

    return jsonify({"access_token": token}), 200


# -------------------- DASHBOARD (PROTECTED) --------------------
@app.route("/dashboard")
@jwt_required()
def dashboard():
    user = get_jwt_identity()
    return jsonify({
        "message": "Welcome to dashboard",
        "user": user
    })


# -------------------- START SERVER --------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
