"use client";
import { TPost } from "@/app/libs/fetchPosts";
import useFetchPosts from "../hooks/useFetchPost";
import { useState } from "react";
import RenderPost from "./shared/RenderPost";
import { signIn, useSession } from "next-auth/react";
import useCreatePost from "../hooks/useCreatePost";

const PostsPage = () => {
    const { data: session } = useSession();

    const [selectedPost, setSelectedPost] = useState<TPost>();
    const { data: posts } = useFetchPosts();

    const { mutateAsync } = useCreatePost();

    const openModal = (post: TPost) => {
        window.history.pushState({}, "", `/posts/${post.id}`);
        setSelectedPost(post);
    };

    const handleAddPostToDatabase = async (post: TPost) => {
        await mutateAsync(post);
    };

    return (
        <>
            {!session && (
                <div>
                    <button onClick={() => signIn("google")}>Login</button>
                </div>
            )}
            {selectedPost && <RenderPost post={selectedPost} />}
            {session && (
                <div>
                    Posts
                    {posts &&
                        posts.map((post: TPost) => {
                            return (
                                <div key={post.id}>
                                    <a
                                        className="cursor-pointer"
                                        onClick={() => openModal(post)}
                                    >
                                        {post.title}
                                    </a>
                                </div>
                            );
                        })}
                </div>
            )}
        </>
    );
};

export default PostsPage;
