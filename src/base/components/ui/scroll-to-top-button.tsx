'use client';

import { ArrowUpIcon } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from './button';

export function ScrollToTopButton() {
  const handleScrollToTop = () => {
    document.querySelector<HTMLDivElement>('.app-scroll-area > div')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const scrollArea = document.querySelector<HTMLDivElement>('.app-scroll-area > div');
    const scrollToTopButton = document.querySelector<HTMLDivElement>('.scroll-to-top-btn');

    if (scrollArea) {
      scrollArea.addEventListener(
        'scroll',
        () => {
          const scrollTop = scrollArea.scrollTop;

          if (scrollTop > 300) {
            scrollToTopButton?.style.setProperty('opacity', '1', 'important');
            scrollToTopButton?.style.setProperty('cursor', 'pointer', 'important');
            scrollToTopButton?.style.setProperty('pointer-events', 'auto', 'important');
          } else {
            scrollToTopButton?.style.setProperty('opacity', '0', 'important');
            scrollToTopButton?.style.setProperty('cursor', 'default', 'important');
            scrollToTopButton?.style.setProperty('pointer-events', 'none', 'important');
          }
        },
        { signal: abortController.signal },
      );
    }

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Button
      size="icon"
      className="scroll-to-top-btn pointer-events-none fixed right-10 bottom-10 z-50 cursor-default rounded-full p-6 opacity-0 transition-opacity"
      onClick={handleScrollToTop}
    >
      <ArrowUpIcon className="size-6" />
    </Button>
  );
}
