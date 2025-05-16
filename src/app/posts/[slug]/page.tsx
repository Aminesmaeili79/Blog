import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from "next/link";
import { Metadata } from 'next';

// Define the type for your frontMatter
type PostFrontMatter = {
    title: string;
    date?: string;
    excerpt?: string;
    tags?: string[];
    [key: string]: any; // For any other properties
};

// Update this to match the correct Next.js 15 params type
type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

    return files.map(filename => ({
        slug: filename.replace('.md', '')
    }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
        title: data.title,
        description: data.excerpt || 'Blog post'
    };
}

export default async function Post({ params }: Props) {
    // Force cast params to work around the type issue
    const slug = params.slug as string;
    const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Type assertion for the matter result
    const { data: frontMatter, content } = matter(fileContent) as {
        data: PostFrontMatter;
        content: string;
    };

    const processedContent = await remark()
        .use(html)
        .process(content);

    const contentHtml = processedContent.toString();

    return (
        <article className="prose flex flex-col gap-8 px-8 py-16 mb-16 rounded-2xl border">
            <div className="flex flex-wrap gap-8">
                <h1 className="text-4xl font-bold poppins">{frontMatter.title}</h1>
                {Array.isArray(frontMatter.tags) && frontMatter.tags.map((tag, index) => (
                    <Link
                        key={index}
                        href={`/tags/${tag}`}
                        className="flex items-center bg-gray-300 hover:bg-gray-200 text-gray-950 px-4 rounded-full text-sm"
                    >
                        {tag}
                    </Link>
                ))}
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
            <div className="text-xl font-light" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
    );
}