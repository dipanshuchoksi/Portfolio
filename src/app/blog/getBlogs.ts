export default async function fetchPosts(host: string) {
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
            query Publication {
              publication(host:"${host}.hashnode.dev") {
                title
                posts(first: 5) {
                  edges {
                    node {
                      title
                      brief
                      slug
                      id
                      coverImage { url }
                    }
                  }
                }
              }
            }
          `,
    }),
  });

  const json = await res.json();
  return json;
}
