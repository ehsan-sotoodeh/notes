import jwt from 'express-jwt';
import jwks  from 'jwks-rsa';
import dotenv from 'dotenv';
dotenv.config()


var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKSURI
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256']
  });

  export default jwtCheck;