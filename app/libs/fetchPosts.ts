import axios from "axios";

export type TPost = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export const fetchPosts = async () => {
    const query = await axios.get<TPost[]>(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );
    return query;
};

export const fetchPost = async (postId: number) => {
    const query = await axios.get<TPost>(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return query;
};
