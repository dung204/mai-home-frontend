import * as fs from 'fs/promises';
import { join } from 'path';

export async function generateStaticParams() {
  const posts = (await fs.readdir(join(process.cwd(), './src/news/'))).map((file) =>
    file.replace(/\.mdx?$/, ''),
  );

  return posts.map((post) => ({
    id: post,
  }));
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const { default: Post } = await import(`@/news/${id}.mdx`);

  return <Post />;
}
