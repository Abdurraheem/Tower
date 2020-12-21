/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
import jwt from 'jsonwebtoken';
import CONFIG from '../config';
import hash from 'object-hash';

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



//Middleware Function to Check Cache
export const checkCache = (req, res, next) => {
  const { name, location, limit, offset } = req.query;
  const filterKey = `${hash({name, location, limit, offset})}`;
  req.redis.get(filterKey, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) { 
      res.send(JSON.parse(data));
    } else {
      //proceed to next middleware function
      next();
    }
  });
};
