async function getPost(slug: string, host: string) {
  const data = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
            query Publication {
              publication(host: "${host}.hashnode.dev") {
                post(slug: "${slug}") {
                  id
                  title
                  content {
                    markdown
                    html
                  }
                }
              }
            }
        `,
    }),
  });
  const post = await data.json();
  return post;
}

export default getPost;
