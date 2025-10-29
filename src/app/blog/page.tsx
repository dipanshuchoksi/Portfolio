"use client";
import { useEffect, useState } from "react";
import fetchPosts from "./getBlogs";
import Image from "next/image";
import Link from "next/link";
import { PostSeries } from "./[series]/[post]/const";

const seriesArr = ["create-your-own", "dsa-demystified", "let-us-learn"];

function Blog() {
  const [posts, setPosts] = useState<PostSeries[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function helper() {
      try {
        setLoading(true);
        const results = await Promise.all(
          seriesArr.map((temp) => fetchPosts(temp))
        );

        const allPosts = results
          .flatMap(
            (data, idx) =>
              (data = {
                seriesSlug: seriesArr[idx],
                posts: data?.data?.publication?.posts,
              })
          )
          .filter((dataElement) => dataElement?.posts?.edges?.length);

        setPosts(allPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    }
    helper();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error?.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-black text-text my-5"> My Blog</h1>

      {/* to indicate that there's no post that has been publish and there's one that i am working on. */}
      {posts.length == 0 ? (
        <p>Post is being written. Thanks for your patience.</p>
      ) : null}

      {/* display all the posts that I have written */}
      <ul>
        {posts.map((postNode, idx) => {
          return (
            <li key={idx}>
              {postNode.posts.edges.map((post) => {
                return (
                  <Link
                    key={post.node.id}
                    href={`blog/${postNode.seriesSlug}/${post.node.slug}`}
                    className="flex bg-background-accent hover:bg-background-accent/80 cursor-pointer p-5 rounded-2xl gap-5 items-center"
                  >
                    <div>
                      {post.node?.coverImage ? (
                        <Image
                          src={post.node?.coverImage}
                          alt="cover image of the blog"
                        />
                      ) : (
                        <div className="size-16 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-md font-bold">{post.node.title}</h2>
                      <div>{post.node.brief}</div>
                    </div>
                  </Link>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Blog;
