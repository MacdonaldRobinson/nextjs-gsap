import { fetchPosts } from "@/app/libs/fetchPosts";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest)=>{    
    const {data: posts} = await fetchPosts();

    return NextResponse.json(posts)
}