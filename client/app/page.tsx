// app/page.tsx
import Image from "next/image";
import Link from "next/link";

const API_URL = "http://localhost:1337";
const API_TOKEN =
  "f5a59c478644b5c3c38529096624b5c98536b2e890e7d8c83bd60e24cf2eb33aa6af3408b405277d2537a0ecfb4ce76dbfc0afafad099995eb62b0f29a4393cd40e711d3206409c63671b54c72f65835f4c4049e31f53ca4beb0d708ea41715db71fbc035c0ecc4051e460ae3278a25cfa5d5200db1a17f2adae61cd7e75e57f";

async function getHomePageData() {
  const url = new URL(`${API_URL}/api/home-page`);

  url.searchParams.append("populate[navbar][populate][navLinks][populate]", "*");
  url.searchParams.append("populate[block][on][layout.carousel][populate][carousel_list][populate][carousel_item][populate]", "*");
  url.searchParams.append("populate[block][on][layout.logo][populate]", "*");
  url.searchParams.append("populate[block][on][layout.category][populate][category_item][populate]", "*");
  url.searchParams.append("populate[block][on][layout.featured][populate][featured_item][populate]", "*");

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// ============ COMPONENT REGISTRY ============

function LogoComponent({ data }: { data: any }) {
  return (
    <Link href={data.path || "/"} className="flex items-center space-x-3 group">
      {data.image && (
        <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-2 ring-pink-200 group-hover:ring-pink-400 transition-all">
          <Image
            unoptimized
            src={`${API_URL}${data.image.url}`}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        {data.title}
      </span>
    </Link>
  );
}

function CarouselComponent({ data }: { data: any }) {
  const items =
    data.carousel_list?.carousel_item?.filter((item: any) => item.img) || [];

  if (items.length === 0) return null;

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item: any, index: number) => (
            <Link
              key={item.id}
              href={item.path}
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-pink-200 transition-all duration-500 transform hover:scale-[1.02]"
            >
              <div className={`relative ${index === 0 ? 'h-[500px]' : 'h-[500px]'} w-full`}>
                <Image
                  unoptimized
                  src={`${API_URL}${item.img.url}`}
                  alt={item.label || "Carousel item"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                {item.label && (
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
                      <h3 className="text-4xl font-bold text-white mb-3 transform group-hover:translate-x-2 transition-transform">
                        {item.label}
                      </h3>
                      <div className="flex items-center text-white">
                        <span className="text-sm font-semibold bg-pink-500 px-4 py-2 rounded-full group-hover:bg-pink-600 transition-colors">
                          Shop Now
                        </span>
                        <svg
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryComponent({ data }: { data: any }) {
  const items = data.category_item || [];

  if (items.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {data.heading && (
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {data.heading}
            </h2>
            <p className="text-gray-600 text-lg">Discover our curated collections</p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item: any) => (
            <Link
              key={item.id}
              href={item.path}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-96 w-full">
                {item.img ? (
                  <>
                    <Image
                      unoptimized
                      src={`${API_URL}${item.img.url}`}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-purple-900/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500"></div>
                )}
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="w-full">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {item.label}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-pink-600 font-semibold text-sm">
                          Explore Collection
                        </span>
                        <svg
                          className="w-5 h-5 text-pink-600 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedComponent({ data }: { data: any }) {
  const items = data.featured_item || [];

  if (items.length === 0) return null;

  const colors = [
    'from-pink-500 to-rose-500',
    'from-purple-500 to-indigo-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-red-500 to-pink-500'
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {data.heading && (
          <div className="text-center mb-12">
            <div className="inline-block">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {data.heading}
                </h2>
                <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 text-lg">Handpicked favorites just for you</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item: any, index: number) => (
            <Link
              key={item.id}
              href={item.path}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <div className={`relative h-64 w-full ${!item.img ? `bg-gradient-to-br ${colors[index % colors.length]}` : ''}`}>
                {item.img ? (
                  <>
                    <Image
                      unoptimized
                      src={`${API_URL}${item.img.url}`}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </>
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]}`}></div>
                )}
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                  <div className="text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {!item.img && (
                      <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                    )}
                    <div className={`${item.img ? 'bg-white/95 backdrop-blur-sm' : 'bg-white/20 backdrop-blur-sm'} rounded-xl px-4 py-3 mb-2`}>
                      <h3 className={`text-lg font-bold ${item.img ? 'text-gray-900' : 'text-white'} mb-1`}>
                        {item.label}
                      </h3>
                      <p className={`text-xs font-medium ${item.img ? 'text-pink-600' : 'text-white/80'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        Shop Now →
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Fallback component for unknown block types
function UnknownComponent({ type, data }: { type: string; data: any }) {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-yellow-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-400">
          <p className="text-sm text-gray-600 mb-2">Unknown component type:</p>
          <code className="text-sm font-mono text-yellow-800">{type}</code>
        </div>
      </div>
    </section>
  );
}

// ============ COMPONENT MAPPER ============
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  "layout.logo": LogoComponent,
  "layout.carousel": CarouselComponent,
  "layout.category": CategoryComponent,
  "layout.featured": FeaturedComponent,
};

function DynamicBlock({ block }: { block: any }) {
  const Component = COMPONENT_MAP[block.__component];

  if (!Component) {
    return <UnknownComponent type={block.__component} data={block} />;
  }

  return <Component data={block} />;
}

// ============ MAIN PAGE ============
export default async function HomePage() {
  const homeData = await getHomePageData();
  const { navbar, block } = homeData.data;

  const logoBlock = block.find((b: any) => b.__component === "layout.logo");
  const contentBlocks = block.filter(
    (b: any) => b.__component !== "layout.logo"
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {logoBlock && <LogoComponent data={logoBlock} />}

            {navbar?.navLinks?.navLink &&
              navbar.navLinks.navLink.length > 0 && (
                <div className="flex items-center space-x-1">
                  {navbar.navLinks.navLink.map((link: any) => (
                    <Link
                      key={link.id}
                      href={link.path}
                      className="px-4 py-2 text-gray-700 hover:text-pink-600 font-medium transition-all relative group rounded-lg hover:bg-pink-50"
                    >
                      {link.label}
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                    </Link>
                  ))}
                  <button className="ml-4 p-2 hover:bg-pink-50 rounded-lg transition-colors">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors relative">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs flex items-center justify-center rounded-full font-bold">0</span>
                  </button>
                </div>
              )}
          </div>
        </div>
      </nav>

      {/* Dynamic Content Blocks */}
      {contentBlocks.map((block: any, index: number) => (
        <DynamicBlock
          key={`${block.__component}-${block.id || index}`}
          block={block}
        />
      ))}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {logoBlock?.title || "Your Brand"}
              </h3>
              <p className="text-gray-300 text-sm">
                Your one-stop destination for fashion and style.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/about" className="hover:text-pink-400 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-pink-400 transition-colors">Contact</Link></li>
                <li><Link href="/shipping" className="hover:text-pink-400 transition-colors">Shipping</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/returns" className="hover:text-pink-400 transition-colors">Returns</Link></li>
                <li><Link href="/faq" className="hover:text-pink-400 transition-colors">FAQ</Link></li>
                <li><Link href="/track" className="hover:text-pink-400 transition-colors">Track Order</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-300 text-sm mb-3">Subscribe for exclusive offers</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all">
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 {logoBlock?.title || "Your Brand"}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}