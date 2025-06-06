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
    <div className="w-full mb-36">
      <h1 className="poppins text-6xl font-bold mb-16">Blog Posts</h1>
      <ul className="space-y-8">
        {sortedPosts.map(post => (
          <li key={post.slug} className="border border-gray-700 p-6 rounded-lg hover:shadow-md hover:bg-gray-800 transition">
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 mb-4">
                <h2 className="poppins text-3xl font-semibold">{post.frontMatter.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {/* Handle tags as an array */}
                  {Array.isArray(post.frontMatter.tags) && post.frontMatter.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/tags/${tag}`}
                      className="bg-gray-300 hover:bg-gray-200 text-gray-950 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
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
    </div>
  );
}
