import React from "react";
import Blogs from "./page.client";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Web Development related blogs',
};

export default function Page() {
  return <Blogs />;
}