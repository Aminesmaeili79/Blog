import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// Define the type for your frontMatter
type PostFrontMatter = {
    title: string;
    date?: string;
    excerpt?: string;
    tags?: string[];
    [key: string]: any;
};

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

    // Get all tags from all posts
    const allTags = files.flatMap(filename => {
        const markdownWithMeta = fs.readFileSync(
            path.join(process.cwd(), 'posts', filename),
            'utf-8'
        );

        const matterResult = matter(markdownWithMeta);
        const data = matterResult.data;
        return data.tags || [];
    });

    // Remove duplicates
    const uniqueTags = [...new Set(allTags)];

    // Return params object for each tag
    return uniqueTags.map(tag => ({
        tag: tag,
    }));
}

export default async function TagPage({ params }: any) {
    const tag = params.tag;

    // Get files from the posts directory
    const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

    // Get posts that contain the tag
    const filteredPosts = files
        .map(filename => {
            const slug = filename.replace('.md', '');
            const markdownWithMeta = fs.readFileSync(
                path.join(process.cwd(), 'posts', filename),
                'utf-8'
            );

            const matterResult = matter(markdownWithMeta);
            const frontMatter = matterResult.data as PostFrontMatter;

            return {
                slug,
                frontMatter,
            };
        })
        .filter(post =>
            post.frontMatter.tags &&
            Array.isArray(post.frontMatter.tags) &&
            post.frontMatter.tags.includes(tag)
        );

    // Sort posts by date
    const sortedPosts = filteredPosts.sort((a, b) => {
        if (!a.frontMatter.date) return 1;
        if (!b.frontMatter.date) return -1;
        return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
    });

    return (
        <div className="w-full mb-36">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/" className="text-blue-500 hover:underline">
                    &larr; Back to all posts
                </Link>
                <h1 className="poppins text-4xl font-bold">Posts tagged: <span className="bg-gray-300 text-gray-950 px-3 py-1 rounded-full">{tag}</span></h1>
            </div>

            {sortedPosts.length === 0 ? (
                <p className="text-xl">No posts found with this tag.</p>
            ) : (
                <ul className="space-y-8">
                    {sortedPosts.map(post => (
                        <li key={post.slug} className="border p-6 rounded-lg hover:shadow-md transition">
                            <Link href={`/posts/${post.slug}`} className="block">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 mb-4">
                                    <h2 className="poppins text-3xl font-semibold">{post.frontMatter.title}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.isArray(post.frontMatter.tags) && post.frontMatter.tags.map((postTag, index) => (
                                            <Link
                                                key={index}
                                                href={`/tags/${postTag}`}
                                                className={`px-3 py-1 rounded-full text-sm ${
                                                    postTag === tag
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-300 hover:bg-gray-200 text-gray-950'
                                                }`}
                                            >
                                                {postTag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                {post.frontMatter.date && (
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm mb-6">
                                        <p className="text-gray-500">
                                            {new Date(post.frontMatter.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                        <p className="sm:before:content-['•'] sm:before:mx-2 sm:before:text-gray-300">
                                            Posted by <span className="text-gray-500 font-medium">Amin Esmaeili</span>
                                        </p>
                                    </div>
                                )}
                                {post.frontMatter.excerpt && (
                                    <p className="text-xl font-light poppins">{post.frontMatter.excerpt}</p>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}