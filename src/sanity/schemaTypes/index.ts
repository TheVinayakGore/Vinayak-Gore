import { type SchemaTypeDefinition } from "sanity";
import { mainprojects } from "./mainprojects";
import { blogs } from "./blogs";
import { portfolioblog } from "./portfolioblog";
import { tutorials } from "./tutorials";
import { playlists } from "./playlists";
import { figma } from "./figma";
import { posters } from "./posters";
import { html } from "./html";
import { css } from "./css";
import { js } from "./js";
import { python } from "./python";
import { c } from "./c";
import { cpp } from "./cpp";
import { gallery } from "./gallery";
import { socialMedia } from "./socialmedia";
import { blogComments } from "./blogComments";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [mainprojects, gallery, blogs, blogComments, portfolioblog, tutorials, playlists, figma, posters, html, css, js, python, c, cpp, socialMedia],
};
