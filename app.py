from flask import Flask, request, jsonify
from flask_cors import CORS

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow React frontend to make requests

# Simple in-memory data store (in a real app, you'd use a database)
users = [
    {"id": 1, "name": "John Doe", "email": "john@example.com"},
    {"id": 2, "name": "Jane Smith", "email": "jane@example.com"},
    {"id": 3, "name": "Bob Johnson", "email": "bob@example.com"}
]

# Counter for generating new IDs
next_id = 4


# ========== GET ENDPOINTS ==========
# GET: Retrieve data (read-only, no side effects)

@app.route('/api/users', methods=['GET'])
def get_all_users():
    """
    GET /api/users
    Returns all users in the database
    """
    return jsonify({
        "success": True,
        "count": len(users),
        "data": users
    }), 200


@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    GET /api/users/<id>
    Returns a specific user by ID
    """
    user = next((u for u in users if u["id"] == user_id), None)
    
    if user:
        return jsonify({
            "success": True,
            "data": user
        }), 200
    else:
        return jsonify({
            "success": False,
            "message": f"User with ID {user_id} not found"
        }), 404


# ========== POST ENDPOINT ==========
# POST: Create new resources

@app.route('/api/users', methods=['POST'])
def create_user():
    """
    POST /api/users
    Creates a new user
    Expected JSON body: {"name": "string", "email": "string"}
    """
    global next_id
    
    # Get JSON data from request body
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('name') or not data.get('email'):
        return jsonify({
            "success": False,
            "message": "Name and email are required"
        }), 400
    
    # Create new user
    new_user = {
        "id": next_id,
        "name": data["name"],
        "email": data["email"]
    }
    next_id += 1
    users.append(new_user)
    
    return jsonify({
        "success": True,
        "message": "User created successfully",
        "data": new_user
    }), 201  # 201 = Created


# ========== PUT ENDPOINT ==========
# PUT: Update/replace entire resource

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """
    PUT /api/users/<id>
    Updates an entire user (replaces all fields)
    Expected JSON body: {"name": "string", "email": "string"}
    """
    user = next((u for u in users if u["id"] == user_id), None)
    
    if not user:
        return jsonify({
            "success": False,
            "message": f"User with ID {user_id} not found"
        }), 404
    
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('email'):
        return jsonify({
            "success": False,
            "message": "Name and email are required"
        }), 400
    
    # Replace entire user object
    user["name"] = data["name"]
    user["email"] = data["email"]
    
    return jsonify({
        "success": True,
        "message": "User updated successfully",
        "data": user
    }), 200


# ========== PATCH ENDPOINT ==========
# PATCH: Partial update (update only specified fields)

@app.route('/api/users/<int:user_id>', methods=['PATCH'])
def patch_user(user_id):
    """
    PATCH /api/users/<id>
    Partially updates a user (only updates provided fields)
    Expected JSON body: {"name": "string"} OR {"email": "string"} OR both
    """
    user = next((u for u in users if u["id"] == user_id), None)
    
    if not user:
        return jsonify({
            "success": False,
            "message": f"User with ID {user_id} not found"
        }), 404
    
    data = request.get_json()
    
    if not data:
        return jsonify({
            "success": False,
            "message": "No data provided"
        }), 400
    
    # Update only provided fields
    if "name" in data:
        user["name"] = data["name"]
    if "email" in data:
        user["email"] = data["email"]
    
    return jsonify({
        "success": True,
        "message": "User updated successfully",
        "data": user
    }), 200


# ========== DELETE ENDPOINT ==========
# DELETE: Remove a resource

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """
    DELETE /api/users/<id>
    Deletes a user by ID
    """
    global users
    user = next((u for u in users if u["id"] == user_id), None)
    
    if not user:
        return jsonify({
            "success": False,
            "message": f"User with ID {user_id} not found"
        }), 404
    
    users = [u for u in users if u["id"] != user_id]
    
    return jsonify({
        "success": True,
        "message": f"User with ID {user_id} deleted successfully"
    }), 200


# ========== ERROR HANDLING ==========

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "message": "Endpoint not found"
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "message": "Internal server error"
    }), 500


# ========== ROOT ENDPOINT ==========

@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to Flask API!",
        "endpoints": {
            "GET /api/users": "Get all users",
            "GET /api/users/<id>": "Get user by ID",
            "POST /api/users": "Create new user",
            "PUT /api/users/<id>": "Update entire user",
            "PATCH /api/users/<id>": "Partially update user",
            "DELETE /api/users/<id>": "Delete user"
        }
    }), 200


if __name__ == '__main__':
    print("\n" + "="*50)
    print("Flask API Server Starting...")
    print("="*50)
    print("\nAvailable endpoints:")
    print("  GET    /api/users          - Get all users")
    print("  GET    /api/users/<id>     - Get user by ID")
    print("  POST   /api/users          - Create new user")
    print("  PUT    /api/users/<id>     - Update entire user")
    print("  PATCH  /api/users/<id>     - Partially update user")
    print("  DELETE /api/users/<id>     - Delete user")
    print("\nServer running at: http://localhost:5000")
    print("="*50 + "\n")
    
    app.run(debug=True, port=5000)

