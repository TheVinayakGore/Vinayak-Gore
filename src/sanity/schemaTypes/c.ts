import { defineField, defineType } from "sanity";

export const c = defineType({
  name: "c",
  title: "C",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(50),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: "codeString",
      title: "Code",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
