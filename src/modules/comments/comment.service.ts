import { db } from "../../config/db.ts"
import type { ICommentInput } from "./comment.interface.ts"

const createComment = async (payload:ICommentInput) => {
  return db.orm.public.Comment.create({...payload})
}


export const CommentService = {
  createComment
}