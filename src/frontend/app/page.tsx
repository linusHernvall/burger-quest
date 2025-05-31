import { supabase } from "@/backend/supabase/client";
import { ExampleCard } from "@/frontend/components/ExampleCard";

export default async function Home() {
  const { data: examples, error } = await supabase
    .from("example")
    .select("*")
    .limit(5);

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Welcome to Next.js 14</h1>

        <div className="grid gap-4">
          {examples?.map((example) => (
            <ExampleCard
              key={example.id}
              title={example.title}
              content={example.content}
              createdAt={example.created_at}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
