import { rutas } from "../utils/enum.js";
import { router } from "../utils/express.js";

router.post(rutas.admin.prueba, async (req, res) => {
  res.send("okkkkk");
});

export default router;
