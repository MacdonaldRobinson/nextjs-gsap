"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TPost } from "../libs/fetchPosts";

const useFetchPosts = ()=>{
    const query = useQuery({
        queryKey: ["posts"],
        queryFn: async ()=>{
            const {data} = await axios.get("/api/posts")
            return data as TPost[];
        }
    })

    return query;
}

export default useFetchPosts;