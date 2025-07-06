import * as fs from 'fs/promises';
import matter from 'gray-matter';
import { Metadata } from 'next';
import Link from 'next/link';
import { join } from 'path';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/base/components/ui/breadcrumb';
import { Card, CardContent } from '@/base/components/ui/card';
import { NewsCategory, newsCategory } from '@/modules/home/types';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await fs.readdir(join(process.cwd(), './src/news/'));

  return posts.map((post) => ({
    id: post,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const content = await fs.readFile(join(process.cwd(), `./src/news/${id}/post.mdx`), 'utf-8');
  const {
    data: { title, description, date },
  } = matter(content);

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: new Date(date).toISOString(),
      url: `https://mai-home.info.vn/news/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      site: `https://mai-home.info.vn/news/${id}`,
      title,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const { default: Post } = await import(`@/news/${id}/post.mdx`);
  const content = await fs.readFile(join(process.cwd(), `./src/news/${id}/post.mdx`), 'utf-8');
  const {
    data: { category, title },
  } = matter(content);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className="flex-nowrap">
          <BreadcrumbItem className="text-nowrap">
            <Link href={`/news/all?category=${category}`} className="text-nowrap">
              {newsCategory[category as NewsCategory]}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="line-clamp-1">{title}</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <Card>
          <CardContent>
            <article className="prose prose-blockquote:border-primary prose-blockquote:text-muted-foreground mx-auto size-full">
              <Post />
            </article>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
