import { client } from "../../../sanity/lib/client";

export const getCodeSnippets = async () => {
  const query = `*[_type == "css"]{
    title,
    description,
    codeString
  }`;

  const snippets = await client.fetch(query);
  return snippets;
};
