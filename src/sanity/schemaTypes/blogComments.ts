import { defineField, defineType } from "sanity";

export const blogComments = defineType({
  title: "Blog Comments",
  name: "blogComments",
  type: "document", // Change this to 'document' instead of 'array'
  fields: [
    defineField({
      title: "UserName",
      name: "username",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Message",
      name: "message",
      type: "text", // Changed to 'text' for longer comments
    }),
    defineField({
      title: "Date",
      name: "date",
      type: "datetime",
    }),
    defineField({
      title: "Blog Reference",
      name: "blog",
      type: "reference",
      to: [{ type: "blogs" }], // Linking comment to a blog
    }),
  ],
});




