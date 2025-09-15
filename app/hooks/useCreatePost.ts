import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TPost } from "../libs/fetchPosts";

const useCreatePost = () => {
    const mutation = useMutation({
        mutationKey: ["createPost"],
        mutationFn: async (post: TPost) => {
            const { data } = await axios.post(`/api/posts`, post);
            return data as TPost;
        },
    });

    return mutation;
};

export default useCreatePost;
