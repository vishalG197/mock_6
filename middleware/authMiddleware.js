const jwt = require('jsonwebtoken');

async function auth (req, res, next) {

try {
   const token = req.headers.authorization.split(' ')[1];

   if(!token){
      res.status(403).json({message: 'to access restricted resource login first'});
   }

   const decoded = jwt.verify(token,"mocke_6");
   if(!decoded){
      res.status(403).json({message: "Invalid token"});
   }
   req.body.username = decoded.username;
   req.body.userId = decoded.userId;
   req.body.date = new Date().toLocaleDateString();
   req.body.likes=0;
   req.body.comment=[];

next();

} catch (error) {
   res.status(500).json({ error: error.message });
}

}

module.exports = auth;