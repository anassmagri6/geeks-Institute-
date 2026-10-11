import JWT from 'jsonwebtoken';
import User from '../models/users.js';

export async function verifyToken(req, res, next) {
  try {
    const token = req.cookies?.chapter_token;

    if (!token) {
      return res.status(401).json({ message:'please login to access this resource.' });
    }

   const decoded = JWT.verify(token, process.env.JWT_SECRET);
    
    const userId = decoded.userId || decoded.sub;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message:'the user does not exist.'});
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'The session has expired; please log in again' });
  }
}


export default verifyToken;