import { defineField, defineType } from "sanity";

export const tutorials = defineType({
  name: "tutorials",
  title: "Tutorials",
  type: "document",
  fields: [
    defineField({
      title: "Tutorial Title",
      name: "tuttitle",
      type: "string",
    }),
    defineField({
      title: "Tutorial Stack",
      name: "tutstack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      title: "Likes",
      name: "likes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      title: "Tutorial Image",
      name: "tutimage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      title: "Tutorial Short Description",
      name: "tutshortdesc",
      type: "string",
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 5", value: "h5" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
            { title: "Square", value: "square" },
            { title: "Circle", value: "circle" },
            { title: "Alphabet", value: "alpha" },
            { title: "Roman", value: "roman" },
          ],
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "attribution",
              type: "string",
              title: "Attribution",
            },
          ],
        },
        {
          type: "code",
          title: "Code Block",
          options: {
            language: "javascript",
          },
        },
      ],
    }),
    defineField({
      title: "Tutorial Download URL",
      name: "tutdownloadUrl",
      type: "url",
    }),
    defineField({
      title: "Tutorial GitHub URL",
      name: "tutorialGitUrl",
      type: "url",
      description: "URL to the github repo",
    }),
    defineField({
      title: "Tutorial YouTube URL",
      name: "tutorialYTUrl",
      type: "url",
      description: "URL to the tutorial",
    }),
  ],
});
