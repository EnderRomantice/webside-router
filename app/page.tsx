import TabBar from "@/components/tabbar";
import WebsiteCard from "@/components/website-card";

const websites = [
  {
    id: 1,
    name: "Vercel",
    img: "../vercel.svg",
    url: "https://www.vercel.com",
  },
  {
    id: 2,
    name: "NextJS",
    img: "../next.svg",
    url: "https://www.nextjs.com",
  },
  {
    id: 3,
    name: "Rust",
    img: "../rust.png",
    url: "https://rust-lang.org/",
  },
];

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground pb-28 md:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <WebsiteCard
                img={website.img}
                key={website.id}
                url={website.url}
                title={website.name}
              />
            ))}
          </div>
        </div>
      </div>
      <TabBar />
    </>
  );
}
