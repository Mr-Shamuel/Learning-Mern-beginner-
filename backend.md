
# 🛠 MERN Backend Setup Guide

This is a **step-by-step guide** to set up a clean MERN backend structure with **Express, MongoDB, and Node.js**.

---

## 1️⃣ Initialize Project

```bash
npm init -y
```

This creates `package.json` for your project.

---

## 2️⃣ Install Dependencies

```bash
npm install express mongoose dotenv cors
npm install nodemon --save-dev
```

* `express` → backend framework
* `mongoose` → MongoDB ORM
* `dotenv` → environment variables
* `cors` → allow requests from frontend
* `nodemon` → automatically restarts server on changes

Add script to `package.json`:

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

---

## 3️⃣ Create `server.js` (Entry Point)

```javascript
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("API running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

---

## 4️⃣ Create `.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mernapp
```

> Replace `MONGO_URI` with your MongoDB Atlas URI if needed.

---

## 5️⃣ Setup MongoDB Connection

📁 `config/db.js`

```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
```

---

## 6️⃣ Create Model

📁 `models/User.js`

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
```

---

## 7️⃣ Create Controller

📁 `controllers/userController.js`

```javascript
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};
```

---

## 8️⃣ Create Routes

📁 `routes/userRoutes.js`

```javascript
import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
```

---

## 9️⃣ Connect Routes to Server

Update **server.js**:

```javascript
import userRoutes from "./routes/userRoutes.js";

app.use("/api/users", userRoutes);
```

---

## 🔟 Run the Server

```bash
npm run dev
```

Test your API using **Postman** or **Thunder Client**:

* GET → `http://localhost:5000/api/users`
* POST → `http://localhost:5000/api/users` with JSON body

---

## ✅ Next Steps

1. Add **Authentication (JWT)**
2. Create **Login/Register routes**
3. Add **Error handling middleware**
4. Add **Request validation**
5. Expand **folder structure** with `services/` & `utils/` for larger projects

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── userController.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── middleware/
│   └── authMiddleware.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

this is for demo  setup and flow


