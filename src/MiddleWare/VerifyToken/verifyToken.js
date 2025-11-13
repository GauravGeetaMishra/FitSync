import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];   
    jwt.verify(token, "helloFITSYNC1234", (error, payload) => {
      if (error) {
        res.status(401).send({ message: "Token is invalid" });
      } else {
        console.log(payload);
        
        req.email = payload.email;
        req.role = payload.role; 
        next();
      }
    });
  } else {
    res.status(400).send({ message: "Token is missing" });
  }
}


export function authorize(allowedRoles){
    return (request, response, next)=>{
        if(allowedRoles.includes(request.role)){
            next();
        }
        else{
            response.status(403).send({message:'Access denied'});
        }
    }
}