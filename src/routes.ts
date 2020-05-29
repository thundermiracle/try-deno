import { Router } from "https://deno.land/x/oak/mod.ts";
import { getUsers, getUser, updUser, addUser, delUser } from "./controllers/users.ts";

const router = new Router();

router
  .get("/users", getUsers)
  .get("/users/:id", getUser)
  .put("/users/:id", updUser)
  .delete("/users/:id", delUser)
  .post("/users", addUser);

export default router;
