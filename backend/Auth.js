const JWT_SECRET = require("./config"); // Ensure this is the correct secret key
const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
    const authHeaders = req.headers['authorization'];

    if (! authHeaders) {
        return res.status(403).json({ message: 'Authorization header missing' });
    }

    const token = authHeaders.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token missing in authorization header' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId; // Attach userId to the request object
            next(); // Proceed to the next middleware
        } else {
            res.status(403).json({ message: 'Invalid token' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' }); // Handle JWT verification failure
    }
};

module.exports = authmiddleware;
