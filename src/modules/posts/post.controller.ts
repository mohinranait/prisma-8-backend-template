import type { Request, Response } from "express";
import { PostService } from "./post.service.ts";

const createPost = async (req: Request, res: Response) => {
  try {
    const {title,content,authorId} = req.body;

    if(!title.trim() || !authorId){
      res.status(400).send({
        message: "Required all inputs",
        success: false,
      })
    }


    const post = await PostService.createPost({title, content,authorId});

    return res.status(201).send({
      success: true,
      message: "Post Created",
      data: post,
    })

  } catch (error) {
    return res.status(500).send({
      success: false,
      messsage: "Server error",
    });
  }
};


const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await PostService.getAllPosts();
    return res.status(200).send({
      message: "Successfull",
      success: true,
      data: {
        posts,
      }
    })
  } catch (error) {
    return res.status(500).send({
      message: "Server Error",
      success: false,
    })
  }
}

export const PostController = {
  createPost,
  getAllPosts,
};
