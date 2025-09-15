import { PrismaClient } from "@prisma/client";
import { TPost } from "./fetchPosts";

const prisma = new PrismaClient();

export const getAllPostsFromDb = async (post: TPost) => {
    const posts = await prisma.post.findMany();

    return posts;
};

export const addPostToDb = async (post: TPost) => {
    const mutation = await prisma.post.create({
        data: {
            title: post.title,
            body: post.body,
        },
    });

    return mutation;
};
