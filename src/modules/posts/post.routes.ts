
import { Router } from "express";
import { PostController } from "./post.controller.ts";
const router = Router();

router.post('/', PostController.createPost)
router.get('/', PostController.getAllPosts)

export const PostRouters = router;