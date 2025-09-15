"use server";

import { addPostToDb } from "../addPost";
import { TPost } from "../fetchPosts";

export async function addPostAction(post: TPost) {
    await addPostToDb(post);
}
