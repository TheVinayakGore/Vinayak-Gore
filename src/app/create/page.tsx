import React from "react";
import Create from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Explore various resources such as tutorials, playlists, design tools like Figma, cheat sheets, and posters.",
};

export default function Page() {
  return <Create />;
}
