import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from "next/link";

// Generate the static paths (new naming convention for App Router)
export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

    return files.map(filename => ({
        slug: filename.replace('.md', '')
    }));
}

// This is the main page component (Server Component by default)
export default async function Post({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

    // Read the file
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse the front matter and content
    const { data: frontMatter, content } = matter(fileContent);

    // Convert markdown to HTML
    const processedContent = await remark()
        .use(html)
        .process(content);

    const contentHtml = processedContent.toString();

    return (
        <article className="prose flex flex-col gap-8 px-8 py-16 mb-16 rounded-2xl border-1">
            <div className="flex justify-between items-center">
                <h1 className="poppins text-5xl font-bold">{frontMatter.title}</h1>
                {frontMatter.tags && (
                    frontMatter.tags.map(tag => (
                        <Link href="" className="bg-gray-400 text-gray-950 p-2 rounded-2xl">{tag}</Link>
                    ))
                )}
            </div>
            {frontMatter.date && (
                <div className="flex gap-12 mb-8">
                    <p className="italic text-gray-500">
                        {new Date(frontMatter.date).toLocaleDateString()}
                    </p>
                    <p>
                        posted by: <span className="text-gray-500">Amin Esmaeili</span>
                    </p>
                </div>
            )}
            <div className="text-xl font-extralight flex flex-col gap-2" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
    );
}