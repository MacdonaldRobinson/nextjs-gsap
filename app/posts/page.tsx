"use client";
import { TPost } from "@/app/libs/fetchPosts";
import useFetchPosts from "../hooks/useFetchPost";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RenderPost from "./shared/RenderPost";
import { signIn, useSession } from "next-auth/react";

const PostsPage = () => {
    const { data: session } = useSession();

    const [selectedPost, setSelectedPost] = useState<TPost>();
    const { isLoading, data: posts } = useFetchPosts();

    const router = useRouter();

    const openModal = (post: TPost) => {
        window.history.pushState({}, "", `/posts/${post.id}`);
        setSelectedPost(post);
    };

    return (
        <>
            {!session && (
                <div>
                    <button onClick={() => signIn("google")}>Login</button>
                </div>
            )}
            {session && selectedPost && (
                <>
                    <RenderPost post={selectedPost} />
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
                </>
            )}
        </>
    );
};

export default PostsPage;
