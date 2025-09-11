import { TPost } from "@/app/libs/fetchPosts";

const RenderPost = ({ post }: { post: TPost }) => {
    return (
        <div>
            <span>{post.title}</span>
            <p>{post.body}</p>
        </div>
    );
};
export default RenderPost;
