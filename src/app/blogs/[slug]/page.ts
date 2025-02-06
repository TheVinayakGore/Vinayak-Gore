import { client } from "../../../sanity/lib/client";
import { Metadata } from "next";

interface Blog {
  title: string;
  desc: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const blog: Blog | null = await client.fetch(
    `*[_type == "blogs" && slug.current == $slug][0]{title, desc}`,
    { slug }
  );

  if (blog) {
    return {
      title: `${blog.title} | Blog Page`,
      description: `Details for the blog: ${blog.desc}`,
    };
  }

  return {
    title: "Blog Not Found",
    description: "This blog does not exist",
  };
}

export { default } from "./page.client";
