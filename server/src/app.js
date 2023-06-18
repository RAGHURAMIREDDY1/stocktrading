const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const request = require("request");
const { MONGO_URI } = require("./db/connect");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const models = require("./models/schema");

// app.use(bodyParser.json());
app.use(cors());

// admin middelware

// user middleware
const userAuthenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    console.log(authHeader);
    if (!token) {
      res.status(401);
      return res.send("Invalid JWT Token");
    }
    const decoded = jwt.verify(token, "USER_SECRET_TOKEN");
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send("Server Error");
  }
};

// Add a new category to the database
// API endpoint to add a category
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});
// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/stock-data", (req, res) => {
  // Replace the "demo" API key below with your own key from https://www.alphavantage.co/support/#api-key
  const url =
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=KGQKD6W74CBISPFO.";

  request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, apiRes, data) => {
      if (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Failed to fetch stock data" });
      } else if (apiRes.statusCode !== 200) {
        console.log("Status:", apiRes.statusCode);
        res
          .status(apiRes.statusCode)
          .json({ error: "Failed to fetch stock data" });
      } else {
        // Data is successfully fetched from the API
        res.json(data);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
module.exports = app;
