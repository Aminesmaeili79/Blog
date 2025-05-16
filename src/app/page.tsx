import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <main className="flex flex-col gap-8">
        <h2 className="poppins font-extrabold text-5xl underline underline-offset-8">Welcome to my blog website!</h2>
        <p className="text-xl mb-36">You can find my ideas, interests, learning outcomes and opinions about Computer and Software Engineering <Link className="text-blue-400 hover:text-blue-300 transition duration-200 underline" href="/posts">here!</Link></p>
      </main>
  );
}
