import jwt from 'express-jwt';

const checkJwt = jwt({ secret: process.env.JWT_SECRET ?? '', algorithms: ['HS256'] });

export default checkJwt;
