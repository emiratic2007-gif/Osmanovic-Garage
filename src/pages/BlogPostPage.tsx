import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../data/blog";
import { ArrowLeft, ArrowRight, Calendar, User, Tag, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "../assets/logo.png";
import ReactMarkdown from "react-markdown";

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h1 className="text-4xl font-black mb-4">ČLANAK NIJE PRONAĐEN</h1>
        <Button onClick={() => navigate("/blog")} className="bg-[#E60000] rounded-full px-8 shadow-lg shadow-[#E60000]/20">
          Nazad na savjete
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#111111]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoImg} alt="Logo" className="h-10 w-auto" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} />
            <div className="hidden w-10 h-10 bg-[#E60000] items-center justify-center font-black text-xl italic tracking-tighter text-white rounded-full">
              OG
            </div>
            <span className="text-white font-black text-xl tracking-tighter group-hover:text-[#E60000] transition-colors">
              OSMANOVIĆ <span className="text-[#E60000] group-hover:text-white">GARAGE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white/70 hover:text-[#E60000] font-bold text-sm uppercase tracking-widest transition-colors">Početna</Link>
            <Link to="/blog" className="text-[#E60000] font-bold text-sm uppercase tracking-widest transition-colors">Savjeti</Link>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* BREADCRUMBS */}
        <div className="bg-gray-50 py-4 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-4xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Link to="/" className="hover:text-[#E60000]">Početna</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-[#E60000]">Savjeti</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#111111] truncate">{post.title}</span>
          </div>
        </div>

        {/* POST HEADER */}
        <article className="pb-20">
          <div className="container mx-auto px-4 max-w-4xl pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#E60000]">
                <span className="bg-[#E60000]/10 px-3 py-1 rounded-full">{post.category}</span>
                <span className="text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.1] mb-8">
                {post.title}
              </h1>

              <div className="flex items-center justify-between py-8 border-y border-gray-100 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#111111] rounded-full flex items-center justify-center text-white font-black text-xl shadow-md">
                    OG
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Autor</div>
                    <div className="font-bold text-[#111111]">{post.author}</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 hover:text-[#E60000] transition-colors">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="container mx-auto px-4 max-w-5xl mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-video overflow-hidden rounded-3xl shadow-2xl"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>

          {/* CONTENT */}
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-[#111111] prose-a:text-[#E60000] prose-li:text-gray-600">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="mt-20 pt-10 border-t border-gray-100">
              <Link to="/blog">
                <Button variant="outline" className="rounded-full border-2 border-[#111111] font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all px-8 h-12">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Nazad na sve savjete
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* RELATED POSTS */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center">Možda vas zanima</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.filter(p => p.id !== id).slice(0, 3).map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#E60000] mb-3 bg-[#E60000]/10 inline-block px-3 py-1 rounded-full">{relatedPost.category}</div>
                <h3 className="text-xl font-black uppercase tracking-tighter leading-tight mb-4 group-hover:text-[#E60000] transition-colors line-clamp-2">
                  {relatedPost.title}
                </h3>
                <div className="flex items-center font-bold text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-[#E60000] transition-colors">
                  Pročitaj više <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <img src={logoImg} alt="Logo" className="h-12 w-auto" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} />
            <div className="hidden w-12 h-12 bg-[#E60000] items-center justify-center font-black text-2xl italic tracking-tighter text-white rounded-full">
              OG
            </div>
            <span className="text-white font-black text-2xl tracking-tighter">
              OSMANOVIĆ <span className="text-[#E60000]">GARAGE</span>
            </span>
          </Link>
          <div className="text-xs font-bold text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Osmanović Garage. Sva prava zadržana.
          </div>
        </div>
      </footer>
    </div>
  );
}
