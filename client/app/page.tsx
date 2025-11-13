// app/page.tsx
import CarouselClient from "@/components/crousal";
import Image from "next/image";
import React from "react";

/**
 * Server Component (App Router)
 * - Fetches data server-side
 * - Passes data to the client carousel component below
 */
export default async function Home() {
  const BASE_URL = "http://localhost:1337/api";
  const token =
    "609433d77d3889f29e311b6dd2975929cbbfb0148dc3bdaa72130758b8ceccd76e9a574b387932e9038074cf7b718786296a2315b4868224b55ed849382d7a86a272da98eec86474b8e583a23e13cd71fb83eb463d88aae9c8b20e3410988903de924eef671164d13743aaf36cf3faa7ac92d81da0ff41b826cfea6d9245568f";

  const res = await fetch(`${BASE_URL}/home-pages?populate=deep`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // remove cache or tweak according to needs
    cache: "no-store",
  });

  if (!res.ok) {
    // simple error state - adapt as needed
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Failed to fetch data: {res.status}</p>
      </div>
    );
  }

  const json = await res.json();

  // take the first item (based on the JSON you provided)
  const item = json?.data?.[0] ?? null;

  console.log(item,"item")

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
      {/* Top navbar */}
      <header className="w-full bg-white dark:bg-[#0b0b0b] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* logo (if available) */}
            {item?.logo?.path ? (
              // using next/image for logo - adjust width/height as needed
              <Image
                src={item.logo.path}
                alt={item.logo.title ?? "logo"}
                width={48}
                height={48}
                className="rounded"
              />
            ) : (
              <div className="w-12 h-12 bg-zinc-200 rounded flex items-center justify-center text-sm">
                Logo
              </div>
            )}

            <div className="font-semibold text-lg">Your Site</div>
          </div>

          {/* navbar links */}
          <nav>
            <ul className="flex gap-4 items-center">
              {item?.navbar?.map((nav: any) => (
                <li key={nav.id}>
                  <a
                    href={nav.path}
                    className="px-3 py-1 rounded hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition"
                  >
                    {nav.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: carousel (client component) */}
          <section className="lg:col-span-2 bg-white dark:bg-[#0b0b0b] rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Hero Carousel</h2>
            {/* @ts-ignore-next-line server-component-prop */}
            <CarouselClient slides={item?.carousel ?? []} />
          </section>

          {/* Right: content + debug JSON */}
          <aside className="bg-white dark:bg-[#0b0b0b] rounded-2xl shadow p-6">
            <h3 className="text-xl font-medium mb-3">Page meta</h3>
            <dl className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
              <div>
                <dt className="font-semibold">Document ID</dt>
                <dd>{item?.documentId ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Created At</dt>
                <dd>{item?.createdAt ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Published At</dt>
                <dd>{item?.publishedAt ?? "—"}</dd>
              </div>
            </dl>

            <hr className="my-4" />

            <h4 className="font-medium mb-2">Raw data (for debugging)</h4>
            <pre className="text-xs leading-5 max-h-64 overflow-auto bg-zinc-50 dark:bg-[#080808] p-3 rounded">
              {JSON.stringify(item, null, 2)}
            </pre>
          </aside>
        </div>
      </main>
    </div>
  );
}

