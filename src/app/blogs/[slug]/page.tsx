import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { blogPosts, BlogTextRun } from "../data";

function renderRuns(runs: BlogTextRun[]) {
  return runs.map((run, index) =>
    run.bold ? <strong key={index}>{run.text}</strong> : <span key={index}>{run.text}</span>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const renderedBlocks: React.ReactNode[] = [];
  for (let index = 0; index < post.content.length; index += 1) {
    const block = post.content[index];

    if (block.type === "heading") {
      renderedBlocks.push(
        <h2
          key={index}
          className="pt-5 sm:pt-6 text-2xl sm:text-3xl font-semibold text-[#222E00]"
        >
          {renderRuns(block.runs)}
        </h2>
      );
      continue;
    }

    if (block.type === "paragraph") {
      renderedBlocks.push(
        <p
          key={index}
          className="text-base sm:text-lg text-[#030303] leading-[1.9]"
        >
          {renderRuns(block.runs)}
        </p>
      );
      continue;
    }

    if (block.type === "list") {
      renderedBlocks.push(
        <ul
          key={index}
          className="list-disc pl-6 sm:pl-7 space-y-2 text-base sm:text-lg text-[#030303] leading-[1.9]"
        >
          {block.items.map((itemRuns, itemIndex) => (
            <li key={itemIndex}>{renderRuns(itemRuns)}</li>
          ))}
        </ul>
      );
      continue;
    }

    const imageBlocks = [block];
    while (index + 1 < post.content.length && post.content[index + 1].type === "image") {
      imageBlocks.push(post.content[index + 1] as { type: "image"; src: string });
      index += 1;
    }

    renderedBlocks.push(
      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {imageBlocks.map((imageBlock, imageIndex) => (
          <div
            key={`${index}-${imageIndex}`}
            className="relative w-full h-60 sm:h-72 border border-gray-200 overflow-hidden"
          >
            <Image
              src={imageBlock.src}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
        <section className="w-full bg-[#1D9770] mb-8 sm:mb-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <article className="bg-white border border-gray-200 p-6 sm:p-8 md:p-10 space-y-5 sm:space-y-6">
            {renderedBlocks}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
