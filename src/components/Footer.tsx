import React from 'react'
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const Footer = () => {
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

    // Extract all tags, flatten the array, and remove duplicates
    const allTags = posts
        .flatMap(post =>
            Array.isArray(post.frontMatter.tags) ? post.frontMatter.tags : []
        )
        .filter(Boolean);

    // Create a Set to remove duplicates
    const uniqueTags = [...new Set(allTags)];

    return (
        <footer className="mt-24 py-6 border-t border-gray-700">
            <h2 className="mb-8 text-2xl font-semibold">Browse blog posts by tags: </h2>
            <div className="flex flex-wrap gap-3">
                {uniqueTags.map((tag, index) => (
                    <Link
                        key={index}
                        href={`/tags/${tag}`}
                        className="bg-gray-300 hover:bg-gray-200 transition duration-200 text-gray-950 py-1 px-3 rounded-full"
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </footer>
    )
}

export default Footer;