import fs from 'fs';
import matter from 'gray-matter';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';

import { Button } from '@/base/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/base/components/ui/card';

export async function LatestNews() {
  const newsDir = path.join(process.cwd(), 'src', 'news');
  const latestSortedNews = fs
    .readdirSync(newsDir)
    .toSorted((a, b) => {
      const {
        data: { date: bDate },
      } = matter(fs.readFileSync(path.join(newsDir, b, 'post.mdx'), 'utf-8'));
      const {
        data: { date: aDate },
      } = matter(fs.readFileSync(path.join(newsDir, a, 'post.mdx'), 'utf-8'));
      const subDate = new Date(bDate).getTime() - new Date(aDate).getTime();

      if (subDate === 0) {
        const bModified = fs.statSync(path.join(newsDir, b)).mtime.getTime();
        const aModified = fs.statSync(path.join(newsDir, a)).mtime.getTime();
        return bModified - aModified;
      }

      return subDate;
    })
    .map((news) => {
      const {
        data: { title },
      } = matter(fs.readFileSync(path.join(newsDir, news, 'post.mdx'), 'utf-8'));

      return {
        id: news,
        title,
        coverImage: import(`@/news/${news}/cover.webp`).then((mod) => mod.default),
      };
    });

  return (
    <section>
      <Card>
        <CardHeader className="xs:text-2xl text-xl font-bold sm:text-3xl">
          <h2>Tin mới nhất</h2>
        </CardHeader>
        <div className="grid h-[640px] w-full grid-cols-1 grid-rows-3 gap-6 px-6 md:grid-cols-2">
          <div className="col-span-1 row-span-3 flex flex-col gap-4 md:gap-8">
            <div className="relative h-2/3 w-full">
              <Link href={`/news/${latestSortedNews[0].id}`}>
                <Image
                  src={await latestSortedNews[0].coverImage}
                  alt={latestSortedNews[0].title}
                  fill
                  className="rounded-md object-cover object-center"
                />
              </Link>
            </div>
            <Link href={`/news/${latestSortedNews[0].id}`}>
              <h3 className="xs:text-xl text-lg font-bold sm:text-2xl">
                {latestSortedNews[0].title}
              </h3>
            </Link>
          </div>
          <div className="col-span-1 row-span-1 grid grid-cols-3 gap-6">
            <div className="relative col-span-1 h-full">
              <Link href={`/news/${latestSortedNews[1].id}`}>
                <Image
                  src={await latestSortedNews[1].coverImage}
                  alt={latestSortedNews[1].title}
                  fill
                  className="rounded-md object-cover object-center"
                />
              </Link>
            </div>
            <h3 className="text-md xs:text-lg col-span-2 font-bold sm:text-xl">
              <Link href={`/news/${latestSortedNews[1].id}`}>{latestSortedNews[1].title}</Link>
            </h3>
          </div>

          <div className="col-span-1 row-span-1 grid grid-cols-3 gap-6">
            <div className="relative col-span-1 h-full">
              <Link href={`/news/${latestSortedNews[2].id}`}>
                <Image
                  src={await latestSortedNews[2].coverImage}
                  alt={latestSortedNews[2].title}
                  fill
                  className="rounded-md border object-cover object-center"
                />
              </Link>
            </div>
            <div className="text-md xs:text-lg col-span-2 font-bold sm:text-xl">
              <Link href={`/news/${latestSortedNews[2].id}`}>{latestSortedNews[2].title}</Link>
            </div>
          </div>

          <div className="col-span-1 row-span-1 grid grid-cols-3 gap-6">
            <div className="relative col-span-1 h-full">
              <Link href={`/news/${latestSortedNews[3].id}`}>
                <Image
                  src={await latestSortedNews[3].coverImage}
                  alt={latestSortedNews[3].title}
                  fill
                  className="rounded-md border object-cover object-center"
                />
              </Link>
            </div>
            <div className="xs:text-lg col-span-2 font-bold sm:text-xl">
              <Link href={`/news/${latestSortedNews[3].id}`}>{latestSortedNews[3].title}</Link>
            </div>
          </div>
        </div>
        <CardFooter className="flex justify-end">
          <Link href="/news/all">
            <Button variant="link" className="text-lg sm:text-xl">
              xem thêm
              <ChevronsRight className="size-5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
