import type { Request, Response } from "express"
import { CommentService } from "./comment.service.ts";


const createCommnet = async (req: Request, res: Response) => {
   try {
    const postId = req.params.postId as string;
    console.log(postId);
    
    if(!postId){
      return res.status(400).send({
        message: "Post id required",
        success: false,
      })
    }
    const {rating, content, authorId } = req.body;
    
    const payload = {rating, content,postId, authorId}
    
    console.log(payload);
      const comment = await CommentService.createComment({...payload});
      return res.status(201).send({
        message: "Successfull",
        success: true,
        data: comment
      })
    } catch (error) {
      return res.status(500).send({
        message: "Server Error",
        success: false,
      })
    }
}


export const CommentController = {
  createCommnet,
}