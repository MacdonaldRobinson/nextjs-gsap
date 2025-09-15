import { fetchPosts, TPost } from "@/app/libs/fetchPosts";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addPostToDb } from "@/app/libs/addPost";

export const GET = async (request: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            {
                message: "Not auth",
            },
            {
                status: 403,
            }
        );
    }

    const { data: posts } = await fetchPosts();

    return NextResponse.json(posts);
};

export const POST = async (request: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            {
                message: "Not auth",
            },
            {
                status: 403,
            }
        );
    }

    const post: TPost = await request.json();

    const newPost = await addPostToDb(post);

    console.log(newPost);

    return NextResponse.json(newPost);
};
