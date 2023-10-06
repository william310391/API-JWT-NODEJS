import jwt from "jsonwebtoken";

export const token = {
  verifyToken: (token)=> {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  },

  generationToken: (payload) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET);
  },
};
