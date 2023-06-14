const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log("Entering authenticateToken")
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; 
  console.log(token)
  const tokenWithoutQuotes = token.replace(/"/g, '');
  console.log(tokenWithoutQuotes)
  if (!token) {
    return res.status(401).send('Access denied. Missing token.');
  }

  try {
    const decodedToken = jwt.verify(tokenWithoutQuotes, process.env.TOKEN_SECRET, { algorithms: ['HS256'] });
    console.log(decodedToken)
    req.userId = decodedToken._id; // Add the user ID to the request object
    next();
  } catch (error) {
    console.error('Error while verifying token:', error);
    res.status(403).send('Invalid token.');
  }
};

module.exports  = {authenticateToken}