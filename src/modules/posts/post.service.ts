import { db } from "../../config/db.ts"
import type { IPostCreateInput } from "./post.interface.ts"

const createPost = async (payload:IPostCreateInput) => {
  return db.orm.public.Post.create({
    ...payload,
  })
}


const getAllPosts = async () => {
  return db.orm.public.Post.include("comments").include("author").all();
}


export const PostService = {
  createPost,
  getAllPosts,
}