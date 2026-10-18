
import { Router } from "express";
import { PostController } from "./post.controller.ts";
const router = Router();

router.post('/', PostController.createPost)
router.get('/', PostController.getAllPosts)
router.patch('/:postId', PostController.updatePostsById)

export const PostRouters = router;