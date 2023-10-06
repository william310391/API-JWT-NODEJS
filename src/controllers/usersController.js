import { ResponseApi } from "../model/resposeApi.js";
import { usersRepository } from "../respositories/usersRepository.js";
import { businessException } from "../exceptions/businessException.js";
import { Encrypt } from "../utils/Encrypt.js";
import { token } from "../utils/token.js";

export const usersController = {
  register: async (user) => {
    try {
      user.password = await Encrypt.Encrypt(user.password);
      const newUser = await usersRepository.save(user);
      return new ResponseApi(newUser);
    } catch (error) {
      return businessException(500, "error al realizar el registro");
    }
  },

  login: async (user) => {
    //const responseApi = new ResponseApi({});
    try {

      const userVal = await usersRepository.findByEmail(user.email);
      if (!userVal) return businessException(500, "credenciales invalidas");

      const validatePassword = await Encrypt.ValidadHash(
        user.password,
        userVal.password
      );
      if (!validatePassword)
        return businessException(500, "credenciales invalidas");

      const token2 = token.generationToken({
        name: userVal.name,
        id: userVal.id,
      });

      return new ResponseApi({ token: token2 });
    } catch (error) {
      return businessException(500, "error al realizar el login");
    }
  },
};
