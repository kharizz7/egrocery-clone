const jwt = require("jsonwebtoken");

// Use environment variable for the secret key (make sure to set it in your environment)
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_default_secret_key"; 

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from 'Authorization' header

    if (!token) {
        return res.status(403).json({ message: "Access denied, token missing!" });
    }

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // Attach the decoded user info to the request object
        next(); // Continue with the next middleware or route handler
    } catch (err) {
        console.error("JWT Verification Error: ", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
