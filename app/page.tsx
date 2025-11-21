import TabBar from "@/components/tabbar";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
        <p className="text-lg text-gray-600">
          This is a simple app built with Next.js and Tailwind CSS.
        </p>
      </div>
      <TabBar />
    </>
  );
}
