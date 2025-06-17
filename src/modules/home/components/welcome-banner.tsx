import Image from 'next/image';

import { NewPropertyButton } from '@/modules/properties';

export function WelcomeBanner() {
  return (
    <section className="relative h-[60vh]">
      <Image src="/home-banner.png" alt="home banner" fill className="object-cover object-center" />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white">
        <div className="font-josefinslab text-6xl! font-semibold uppercase text-shadow-sm">
          Welcome to
        </div>
        <div className="font-lilitaone text-9xl! uppercase text-shadow-sm">Mai Home</div>
        <div className="text-2xl! font-bold text-shadow-sm">Website tìm trọ tốt nhất hiện nay</div>
        <NewPropertyButton />
      </div>
    </section>
  );
}
