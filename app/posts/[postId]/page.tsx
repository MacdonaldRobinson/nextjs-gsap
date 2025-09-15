import { fetchPost, TPost } from "@/app/libs/fetchPosts";
import RenderPost from "../shared/RenderPost";
import { addPostToDb } from "@/app/libs/addPost";

type TPostParams = {
    params: {
        postId: number;
    };
};
const PostPage = async ({ params }: TPostParams) => {
    const { postId } = await params;
    const { data: post } = await fetchPost(postId);

    const handleAddPostToDatabase = async (post: TPost) => {
        await addPostToDb(post);
    };

    return <RenderPost post={post} />;
};

export default PostPage;
