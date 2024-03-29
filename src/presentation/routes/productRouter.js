import { Router } from "express";
import ProductController, {
  deleteOne,
  getOne,
  save,
  update,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/category=?limit=?page=1", ProductController.getAll);
productRouter.get("/:id", getOne);
productRouter.post("/", save);
productRouter.put("/:id", update);
productRouter.delete("/:id", deleteOne);

export default productRouter;
