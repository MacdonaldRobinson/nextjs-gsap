"use client";

import { addPostAction } from "@/app/libs/actions/addPostAction";
import { TPost } from "@/app/libs/fetchPosts";

export type TRenderPost = {
    post: TPost;
};

const RenderPost = ({ post }: TRenderPost) => {
    return (
        <div>
            <span>{post.title}</span>
            <p>{post.body}</p>
            <button onClick={() => addPostAction(post)}>Add to Database</button>
        </div>
    );
};
export default RenderPost;
