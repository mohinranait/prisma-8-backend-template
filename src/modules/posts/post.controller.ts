import type { Request, Response } from "express";
import { PostService } from "./post.service.ts";
import { catchAsync } from "../../lib/catchAsync.ts";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;

  if (!title.trim() || !authorId) {
    return res.status(400).send({
      message: "Required all inputs",
      success: false,
    });
  }

  const isExists = await PostService.findExistingPostByTitle(title);
  if (isExists) {
    return res.status(400).send({
      message: "This title already exists",
      success: false,
    });
  }

  const post = await PostService.createPost({ title, content, authorId });

  return res.status(201).send({
    success: true,
    message: "Post Created",
    data: post,
  });
});

const updatePostsById = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const postId = req.params.postId as string;

  const isExist = await PostService.findPostById(postId);
  if (!isExist) {
    return res.status(404).send({
      message: "Post Not found",
      success: false,
    });
  }

  const post = await PostService.updatePostById(postId, body);
  if (!post) {
    return res.status(404).send({
      message: "Post Not found",
      success: false,
    });
  }

  return res.status(200).send({
    message: "Success",
    success: false,
    data: post,
  });
});

const getAllPosts = catchAsync(async (_req: Request, res: Response) => {
  const posts = await PostService.getAllPosts();
  return res.status(200).send({
    message: "Successfull",
    success: true,
    data: {
      posts,
    },
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  updatePostsById,
};
