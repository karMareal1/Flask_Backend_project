# 📚 Complete API Methods Guide

This guide explains HTTP methods and how they work with REST APIs.

## 🌐 What are HTTP Methods?

HTTP methods (also called HTTP verbs) tell the server what action you want to perform on a resource. Think of them as different types of requests you can make.

---

## 📖 The 5 Main HTTP Methods

### 1. **GET** - Read Data
**Purpose:** Retrieve information from the server (read-only)

**Characteristics:**
- ✅ Safe: Doesn't change server data
- ✅ Idempotent: Same request = same result
- ✅ Can be cached by browsers
- ❌ No request body needed

**When to use:**
- Fetching a list of items
- Getting details of a specific item
- Searching/filtering data

**Example:**
```javascript
// Get all users
GET /api/users

// Get user by ID
GET /api/users/1
```

**Response:** Returns data (usually JSON)

---

### 2. **POST** - Create New Data
**Purpose:** Create a new resource on the server

**Characteristics:**
- ❌ Not safe: Changes server state
- ❌ Not idempotent: Same request creates multiple resources
- ✅ Requires request body with data
- ✅ Returns the newly created resource

**When to use:**
- Creating a new user
- Submitting a form
- Adding a new item to a list

**Example:**
```javascript
POST /api/users
Body: {
  "name": "Alice",
  "email": "alice@example.com"
}
```

**Response:** Returns the created resource with a new ID (usually 201 status code)

---

### 3. **PUT** - Replace Entire Resource
**Purpose:** Update/replace an entire resource

**Characteristics:**
- ❌ Not safe: Changes server data
- ✅ Idempotent: Same request = same result
- ✅ Requires request body with ALL fields
- ✅ Replaces the entire resource

**When to use:**
- Updating all fields of a resource
- Replacing an entire object

**Example:**
```javascript
PUT /api/users/1
Body: {
  "name": "Alice Updated",
  "email": "alice.new@example.com"
}
// This REPLACES the entire user object
```

**Response:** Returns the updated resource (200 status code)

---

### 4. **PATCH** - Partial Update
**Purpose:** Update only specific fields of a resource

**Characteristics:**
- ❌ Not safe: Changes server data
- ✅ Idempotent: Same request = same result
- ✅ Requires request body with ONLY fields to update
- ✅ Only modifies specified fields

**When to use:**
- Updating just the name
- Changing only the email
- Partial modifications

**Example:**
```javascript
PATCH /api/users/1
Body: {
  "name": "Alice New Name"
}
// Only updates the name, email stays the same
```

**Response:** Returns the updated resource (200 status code)

**PUT vs PATCH:**
- **PUT:** "Replace everything" - You must send all fields
- **PATCH:** "Update only this" - You only send fields you want to change

---

### 5. **DELETE** - Remove Data
**Purpose:** Delete a resource from the server

**Characteristics:**
- ❌ Not safe: Changes server data
- ✅ Idempotent: Deleting twice = same result (already deleted)
- ❌ No request body needed
- ✅ Usually returns success message

**When to use:**
- Removing a user
- Deleting an item
- Removing data permanently

**Example:**
```javascript
DELETE /api/users/1
// Deletes user with ID 1
```

**Response:** Returns success message (200 status code)

---

## 🔄 How Frontend and Backend Interact

### The Request-Response Cycle

```
┌─────────┐         HTTP Request          ┌─────────┐
│         │ ────────────────────────────> │         │
│ React   │                               │ Flask   │
│ Frontend│                               │ Backend │
│         │ <──────────────────────────── │         │
└─────────┘      HTTP Response            └─────────┘
```

### Step-by-Step Example (Creating a User):

1. **User clicks "Create User" button** in React
2. **React sends POST request:**
   ```javascript
   axios.post('http://localhost:5000/api/users', {
     name: "John",
     email: "john@example.com"
   })
   ```
3. **Flask receives request** at `/api/users` endpoint
4. **Flask processes** the data (validates, saves)
5. **Flask sends response:**
   ```json
   {
     "success": true,
     "message": "User created successfully",
     "data": {
       "id": 4,
       "name": "John",
       "email": "john@example.com"
     }
   }
   ```
6. **React receives response** and updates the UI

---

## 📊 HTTP Status Codes

The server responds with status codes to indicate success or failure:

- **200 OK** - Request successful
- **201 Created** - Resource created successfully (POST)
- **400 Bad Request** - Invalid data sent
- **404 Not Found** - Resource doesn't exist
- **500 Internal Server Error** - Server error

---

## 🛠️ Testing Your API

### Using the React Frontend:
1. Start Flask backend: `python app.py`
2. Start React frontend: `cd frontend && npm start`
3. Open browser to `http://localhost:3000`
4. Click buttons to test each method!

### Using Browser DevTools:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Make requests from the frontend
4. See the actual HTTP requests and responses

### Using curl (Command Line):
```bash
# GET all users
curl http://localhost:5000/api/users

# POST create user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'

# PUT update user
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","email":"updated@example.com"}'

# PATCH partial update
curl -X PATCH http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"New Name"}'

# DELETE user
curl -X DELETE http://localhost:5000/api/users/1
```

---

## 🎯 Key Takeaways

1. **GET** = Read (safe, no changes)
2. **POST** = Create (new resource)
3. **PUT** = Replace (entire resource)
4. **PATCH** = Update (partial changes)
5. **DELETE** = Remove (delete resource)

6. **Frontend (React)** makes requests → **Backend (Flask)** processes → **Backend** responds → **Frontend** updates UI

7. **RESTful APIs** use these methods to perform CRUD operations:
   - **C**reate = POST
   - **R**ead = GET
   - **U**pdate = PUT/PATCH
   - **D**elete = DELETE

---

## 🚀 Next Steps

1. Try each method in the React frontend
2. Open browser DevTools to see the actual HTTP requests
3. Modify the Flask endpoints to add more features
4. Add validation and error handling
5. Connect to a real database (SQLite, PostgreSQL, etc.)

Happy coding! 🎉

