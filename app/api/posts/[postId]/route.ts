import { AppRouteHandlerRoutes } from "@/.next/types/routes"
import { fetchPost } from "@/app/libs/fetchPosts";
import { NextRequest, NextResponse } from "next/server"

type TParams = {
    postId:string;
}

export const GET = async (request: NextRequest, ctx: RouteContext<AppRouteHandlerRoutes>)=>{    
    const {postId} = await ctx.params as TParams    
    const {data: post} = await fetchPost(postId);

    return NextResponse.json(post)
}