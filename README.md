# 🚀 Flask + React API Learning Project

A complete beginner-friendly project to learn how Flask backend and React frontend interact through HTTP API methods (GET, POST, PUT, PATCH, DELETE).

## 📋 What This Project Teaches

- **Flask Backend**: Creating RESTful API endpoints
- **React Frontend**: Making HTTP requests to backend
- **HTTP Methods**: Understanding GET, POST, PUT, PATCH, DELETE
- **API Communication**: How frontend and backend exchange data
- **CORS**: Cross-Origin Resource Sharing setup

## 🏗️ Project Structure

```
Flask_Backend_project/
├── app.py                 # Flask backend with all API endpoints
├── requirements.txt       # Python dependencies
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── App.js        # Main React component with API calls
│   │   ├── App.css       # Styling
│   │   └── index.js      # React entry point
│   ├── public/
│   └── package.json      # Node.js dependencies
├── API_GUIDE.md          # Complete guide to HTTP methods
└── README.md             # This file
```

## 🚀 Quick Start

### Step 1: Set Up Flask Backend

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask server:**
   ```bash
   python app.py
   ```

   The server will start at `http://localhost:5000`

3. **Test the API:**
   - Open browser to `http://localhost:5000`
   - You should see available endpoints

### Step 2: Set Up React Frontend

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

### Step 3: Test the Application

1. **Make sure both servers are running:**
   - Flask: `http://localhost:5000`
   - React: `http://localhost:3000`

2. **Open the React app** in your browser

3. **Try each feature:**
   - ✅ **GET**: Click "Refresh Users" to fetch all users
   - ✅ **POST**: Create a new user using the form
   - ✅ **PUT**: Click "Edit" on a user, modify fields, click "Update"
   - ✅ **PATCH**: Click "Patch Name" to update only the name
   - ✅ **DELETE**: Click "Delete" to remove a user

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/<id>` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/<id>` | Update entire user |
| PATCH | `/api/users/<id>` | Partially update user |
| DELETE | `/api/users/<id>` | Delete user |

## 🎓 Learning Resources

- **API_GUIDE.md**: Complete explanation of HTTP methods and how they work
- **app.py**: Well-commented Flask code showing each endpoint
- **App.js**: React code demonstrating API calls with axios

## 🔍 Understanding the Code

### Backend (Flask):
- Each endpoint handles a specific HTTP method
- Returns JSON responses
- Uses CORS to allow React frontend access

### Frontend (React):
- Uses `axios` library to make HTTP requests
- Updates UI based on API responses
- Shows success/error messages

## 🛠️ Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: React (JavaScript)
- **HTTP Client**: Axios
- **CORS**: flask-cors

## 📖 Next Steps

1. Read `API_GUIDE.md` for detailed explanations
2. Open browser DevTools (F12) → Network tab to see HTTP requests
3. Modify the code to add more features
4. Add a database (SQLite, PostgreSQL) instead of in-memory storage
5. Add authentication and authorization
6. Add input validation and error handling

## 💡 Tips for Learning

- **Open DevTools**: Watch the Network tab to see actual HTTP requests
- **Read the comments**: Both Flask and React code are heavily commented
- **Experiment**: Try modifying endpoints and see what happens
- **Test with curl**: Use command line to test API directly

## 🐛 Troubleshooting

**CORS errors?**
- Make sure `flask-cors` is installed
- Check that Flask server is running on port 5000

**React can't connect to Flask?**
- Verify Flask is running: `http://localhost:5000`
- Check the API_BASE_URL in App.js matches your Flask port

**Port already in use?**
- Change Flask port in `app.py`: `app.run(debug=True, port=5001)`
- Update API_BASE_URL in `App.js` accordingly

## 📝 License

This is a learning project - feel free to use and modify as you wish!

---

**Happy Learning! 🎉**
