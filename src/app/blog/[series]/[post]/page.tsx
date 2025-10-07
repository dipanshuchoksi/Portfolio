"use client";

import { useEffect, useState } from "react";
import getPost from "./getBlog";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PostInterface } from "./const";

function Post() {
  const [post, setPost] = useState<PostInterface>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [host, slug] = usePathname().split("/").slice(2);

  useEffect(() => {
    async function helper() {
      try {
        setLoading(true);
        const data = await getPost(slug, host);
        setPost(data.data.publication.post);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(Error("something went wrong. Try again later."));
        }
      } finally {
        setLoading(false);
      }
    }
    helper();
  }, [host, slug]);

  if (error) return <div>{error.message}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center flex-col">
      {/* Title */}
      <h1 className="text-3xl font-bold my-5">{post?.title}</h1>

      {/* Markdown Content */}
      <article className="prose lg:prose-md prose-text">
        <ReactMarkdown>{post?.content?.markdown}</ReactMarkdown>
      </article>
    </div>
  );
}

export default Post;
