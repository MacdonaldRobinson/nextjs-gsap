import { fetchPost } from "@/app/libs/fetchPosts";
import RenderPost from "../shared/RenderPost";

type TPostParams = {
    params: {
        postId: number;
    };
};
const PostPage = async ({ params }: TPostParams) => {
    const { postId } = await params;
    const { data: post } = await fetchPost(postId);
    return <RenderPost post={post} />;
};

export default PostPage;
