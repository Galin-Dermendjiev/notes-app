import jwt from 'jsonwebtoken';

async function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Handle Bearer prefix
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attach user ID to the request object
        next();
    } catch (err) {
        // Handle token expiration or general invalid token errors
        if (err && err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired, please log in again' });
        }
        return res.status(401).json({ message: 'Unauthorized access' });
    }
}

export default authMiddleware;
