import admin from 'firebase-admin'

const authenticate = async (req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  
  // In development mode, bypass authentication
  if (isDevelopment) {
    req.user = { 
      uid: 'dev-user-123',
      email: 'dev@example.com',
      name: 'Development User'
    };
    return next();
  }

  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;
