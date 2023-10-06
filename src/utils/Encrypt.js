import  bcrypt  from "bcrypt";


export const Encrypt = {
  Encrypt: async (value) => {
    const salt= await bcrypt.genSalt(10)
    return await bcrypt.hash(value, salt);
  },
  ValidadHash: async (value, hash) => {
    return await bcrypt.compare(value, hash);
  },
};