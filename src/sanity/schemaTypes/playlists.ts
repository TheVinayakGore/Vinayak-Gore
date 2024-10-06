import { defineField, defineType } from "sanity";

export const playlists = defineType({
  name: "playlists",
  title: "Playlists",
  type: "document",
  fields: [
    defineField({
      title: "Image",
      name: "image",
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
    }),
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "string",
    }),
    defineField({
      title: "Playlist URL",
      name: "playlistUrl",
      type: "url",
      description: "URL to the playlist",
      validation: (Rule) => Rule.uri({ allowRelative: false }),
    }),
    defineField({
      title: "Views",
      name: "views",
      type: "number",
    }),
  ],
});
