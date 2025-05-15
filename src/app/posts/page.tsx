import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function PostsIndex() {
    const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

    const posts = files.map(filename => {
        const slug = filename.replace('.md', '');

        const markdownWithMeta = fs.readFileSync(
            path.join(process.cwd(), 'posts', filename),
            'utf-8'
        );

        const { data: frontMatter } = matter(markdownWithMeta);

        return {
            slug,
            frontMatter,
        };
    });

    const sortedPosts = posts.sort((a, b) => {
        if (!a.frontMatter.date) return 1;
        if (!b.frontMatter.date) return -1;
        return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
    });

    return (
        <div className="w-full mb-36 ">
                <h1 className="poppins text-6xl font-bold mb-16">Blog Posts</h1>
            <ul className="space-y-4">
                {sortedPosts.map(post => (
                    <li key={post.slug} className="border p-4 rounded-md hover:shadow-md transition">
                        <Link href={`/posts/${post.slug}`} className="block">
                            <div className="flex gap-32 mb-4">
                                <h2 className="poppins text-3xl font-semibold">{post.frontMatter.title}</h2>
                                <Link className="bg-gray-400 text-gray-950 px-2 py-0.5 rounded-2xl" href="">{post.frontMatter.tags}</Link>
                            </div>
                            {post.frontMatter.date && (
                               <div className="flex gap-4">
                                   <p className="text-gray-500 mb-8">
                                       {new Date(post.frontMatter.date).toLocaleDateString()}
                                   </p>
                                   <p>posted by <span className="text-gray-500">Amin Esmaeili</span></p>
                               </div>
                            )}
                            {post.frontMatter.excerpt && (
                                <p className="text-2xl font-light poppins mt-2">{post.frontMatter.excerpt}</p>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}