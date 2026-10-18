import { Router } from "express";
import { CommentController } from "./comment.controller.ts";

const router = Router();


router.post('/:postId', CommentController.createCommnet)


export const CommentRouters = router;