import Navbar  from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Welcome to Ingeri</h1>
        <p className="text-lg leading-7 text-gray-700 mb-8">
          I am a passionate web developer specializing in React, Tailwind CSS, and Supabase. 
          I build modern, performant web applications with a focus on clean code and great user experience.
        </p>
        <a 
          href="#projects" 
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          View My Projects
        </a>
      </main>
      <Footer />
    </>
  );
}
