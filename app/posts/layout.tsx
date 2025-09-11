"use client";
import Providers from "../contexts/Providers";

type TPostsLayout = {
    children: React.ReactNode;
    modal?: React.ReactNode;
};

const PostsLayout = ({ children, modal }: TPostsLayout) => {
    return (
        <Providers>
            <div>
                PostsLayout
                {modal && <div>{modal}</div>}
                {children && <div>{children}</div>}
            </div>
        </Providers>
    );
};

export default PostsLayout;
