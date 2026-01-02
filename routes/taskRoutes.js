import { Router } from "express";
import {
  GET_ALL_TASKS,
  CREATE_TASK,
  DELETE_TASK,
} from "../controllers/taskControllers.js";

const router = Router();

router.route("/").get(GET_ALL_TASKS).post(CREATE_TASK);
router.route("/:id").delete(DELETE_TASK);

export default router;
