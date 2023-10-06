import { usersController } from "../controllers/usersController.js";
import { rutas } from "../utils/enum.js";
import { router } from "../utils/express.js";

router.post(rutas.auth.register, async (req, res) => {
  const response = await usersController.register(req.body);
  res.status(response.statusCode).json(response);
});

router.post(rutas.auth.login, async (req, res) => {
  const response = await usersController.login(req.body);
  res.status(response.statusCode).json(response);
});

export default router;
