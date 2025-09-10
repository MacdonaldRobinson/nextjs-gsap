import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export type TPost = {
    userId: number;
    id:     number;
    title:  string;
    body:   string;
}

export const GET = async (nextRequest: NextRequest)=>{

    const {data} = await axios.get<TPost[]>("https://jsonplaceholder.typicode.com/posts")


    return NextResponse.json({
        posts: data
    })
}