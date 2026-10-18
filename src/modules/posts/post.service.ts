import { db } from "../../config/db.ts"
import type { IPostCreateInput } from "./post.interface.ts"


const findExistingPostByTitle = async (title:string) => {
  return await db.orm.public.Post.first({title})
}

const findPostById = async (postId: string) => {
  return db.orm.public.Post.select("id","title").first({id:postId})
}

const createPost = async (payload:IPostCreateInput) => {
  const post = await db.orm.public.Post.create({
    ...payload,
  });

  return db.orm.public.Post.include("author").first({id: post.id})

}


const updatePostById = async (id:string,payload:IPostCreateInput) => {
  const post = await db.orm.public.Post.where({id}).update(payload);
  if(!post) return null;
  return await db.orm.public.Post.include("author").first({id:post.id});
}


const getAllPosts = async () => {
  return db.orm.public.Post.include("comments").include("author").all();
}


export const PostService = {
  findExistingPostByTitle,
  findPostById,
  createPost,
  updatePostById,
  getAllPosts,
}