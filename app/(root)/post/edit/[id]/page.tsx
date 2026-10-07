import EditPost from "@/components/EditPost";
import { GetPostById } from "@/components/lib/action/GetPostById.action";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await GetPostById({
    postId: id,
  });

  if (!result.success || !result.data?.post) {
    throw new Error("Post not found");
  }

  const post = result.data?.post;

  return (
    <div>
      <EditPost postId={post?._id} content={post?.content} />
    </div>
  );
}

export default page;
