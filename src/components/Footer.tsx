import React from 'react'
import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

    const tags = posts.map(post => {
        return post.frontMatter.tags
    })

    return (
        <footer>
            <h2 className="mb-8">Browse blog posts by tags: </h2>
            <div className="flex gap-8">{tags.map(tag => (
                <button className="bg-gray-400 text-gray-950 p-2 rounded-2xl">{tag}</button>
            ))}</div>
        </footer>
    )
}
export default Footer;
