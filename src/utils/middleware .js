import { usersValidates } from "../Validates/usersValidates.js";
import { businessException } from "../exceptions/businessException.js";
import { ResponseApi } from "../model/resposeApi.js";
import { rutas } from "./enum.js";
import { token } from "./token.js";

export const middleware = (req, res, next) => {
  //const tokenString = req.header("auth-token");
  const tokenString = req.header('Authorization').split(" ")[1]

  if (!tokenString) return res.status(401).json({ error: "Acceso denegado" });
  try {    
    if (!validateToken(tokenString))
      return res.status(401).json(businessException(401, "Token no valido"));

    const response = validarPayload(req);
    if (response.statusCode != 200) return res.status(response.statusCode).json(response);

    next();
  } catch (error) {
    return res.status(401).json(businessException(401, "Token no valido"));
  }
};

const validateToken = (tokenString) => {
  try {
    const verificar = token.verifyToken(tokenString);
    if (!(Object.entries(verificar).length === 0)) return true;
  } catch (error) {
    return false;
  }
};

const validarPayload = (req) => {
  const url = req.baseUrl + req.path;
  const body = req.body;
  const query = req.query;
  const params = req.params;
  // console.log(url, body, query, params, req.baseUrl, req.path);
  // console.log(rutas.admin.base, rutas.admin.prueba);

  const response = new ResponseApi({});
  let error;
  switch (url) {
    case `${rutas.admin.base}${rutas.admin.prueba}`:
      error = usersValidates.validateLogin.validate(body).error;

      if (error) {
        return businessException(500, error.details[0].message);
      }
      break;
    case `${rutas.auth.base}${rutas.auth.login}`:
      error = usersValidates.validateLogin.validate(body).error;
      if (error) {
        return businessException(500, error.details[0].message);
      }
      break;

      case `${rutas.auth.base}${rutas.auth.register}`:
        error = usersValidates.validateRegister.validate(body).error;
        if (error) {
          return businessException(500, error.details[0].message);
        }
        break;
    default:
      return response;
  }

  return response;
};
