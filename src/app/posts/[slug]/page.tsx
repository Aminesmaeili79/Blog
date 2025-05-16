import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from "next/link";

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

    return files.map(filename => ({
        slug: filename.replace('.md', '')
    }));
}

export default async function Post({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const { data: frontMatter, content } = matter(fileContent);

    const processedContent = await remark()
        .use(html)
        .process(content);

    const contentHtml = processedContent.toString();

    return (
        <article className="prose flex flex-col gap-8 px-8 py-16 mb-16 rounded-2xl border-1">
            <div className="flex flex-wrap gap-8">
                <h1 className="text-4xl font-bold poppins">{frontMatter.title}</h1>
                {Array.isArray(frontMatter.tags) && frontMatter.tags.map((tag, index) => (
                    <Link
                        key={index}
                        href={`/tags/${tag}`}
                        className="flex items-center bg-gray-300 hover:bg-gray-200 text-gray-950 px-4 rounded-4xl text-sm"
                    >
                        {tag}
                    </Link>
                ))}
            </div>            {frontMatter.date && (
                <div className="flex gap-12 mb-8">
                    <p className="italic text-gray-500">
                        {new Date(frontMatter.date).toLocaleDateString()}
                    </p>
                    <p>
                        posted by: <span className="text-gray-500">Amin Esmaeili</span>
                    </p>
                </div>
            )}
            <div className="text-xl font-light" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
    );
}