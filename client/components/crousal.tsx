/* -------------------------------------------------------------------------- */
/*                           Client-side Carousel                             */
/* -------------------------------------------------------------------------- */

/**
 * This is a "client" component that handles interactivity (carousel).
 * It must be a client component because it uses hooks.
 *
 * Drop it in the same file; "use client" must be at the top of the component.
 */

"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function CarouselClient({ slides }: { slides: any[] }) {
  const [index, setIndex] = useState(0);
  const length = slides?.length ?? 0;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // autoplay: advance every 4s
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % Math.max(1, length));
    }, 4000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [length]);

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-56 flex items-center justify-center rounded-lg border border-dashed border-zinc-200 dark:border-white/[.06]">
        <span className="text-zinc-500">No slides configured</span>
      </div>
    );
  }

  const goPrev = () => setIndex((i) => (i - 1 + length) % length);
  const goNext = () => setIndex((i) => (i + 1) % length);

//   console.log(slides)

  return (
    <div className="relative">
      {/* Slides */}
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500"
          style={{ width: `${length * 100}%`, transform: `translateX(-${(index * 100) / length}%)` }}
        >
          {slides.map((s, i) => (
            <div key={s.id ?? i} style={{ width: `${100 / length}%` }} className="flex-shrink-0">
              {/* If path is an image URL/path, show image. Otherwise show fallback box. */}
              {s.path ? (
                // Using next/image; if path is a relative path in Strapi you may need to prefix with Strapi host.
                <div className="relative w-full h-64 sm:h-80 md:h-96 bg-zinc-100 dark:bg-white/[0.03] flex items-center justify-center">
                  {/* try to display the image; if it fails the alt text will show */}
                  <Image
                    src={`http://localhost:1337/uploads${s.path}`}
                    alt={`slide-${i}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-semibold">Slide {i + 1}</div>
                    <div className="text-sm text-zinc-600">No image path provided</div>
                  </div>
                </div>
              )}

              {/* Slide caption / meta */}
              <div className="p-3 bg-white dark:bg-[#0b0b0b] border-t border-zinc-100 dark:border-white/[.03]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Slide {i + 1}</div>
                  <div className="text-xs text-zinc-500">{s.path}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-y-1/2 left-3 transform -translate-y-1/2">
        <button
          onClick={goPrev}
          aria-label="Previous"
          className="bg-white/90 dark:bg-black/70 backdrop-blur-sm p-2 rounded-full shadow hover:scale-105 transition"
        >
          ‹
        </button>
      </div>
      <div className="absolute inset-y-1/2 right-3 transform -translate-y-1/2">
        <button
          onClick={goNext}
          aria-label="Next"
          className="bg-white/90 dark:bg-black/70 backdrop-blur-sm p-2 rounded-full shadow hover:scale-105 transition"
        >
          ›
        </button>
      </div>

      {/* Indicators */}
      <div className="flex gap-2 justify-center mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-zinc-900" : "bg-zinc-300 dark:bg-white/[.12]"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselClient;