/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
import jwt from 'jsonwebtoken';
import CONFIG from '../config';

export const Authorization = (req, res, next) => {
    const token = req.headers.authorization; 
    const errorMsg = { auth: false, message: 'Failed to authenticate token.' };
    // Helper method to clear a token and invoke the next middleware
    function clearTokenAndNext() {
        req.headers.authorization = null;;
        const msg = { auth: false, message: 'No token provided.' };
        return res.status(401).send(msg);
    }
    if (!token) {
        return clearTokenAndNext();
    }

    jwt.verify(
        token,
        CONFIG.SECRET,
        (err, decoded) => {
            if (err) return res.status(401).send(errorMsg);
            req.userId = decoded.name;  //Add the payload as per requirement
            return next();
        }
    );
    return true;
};

