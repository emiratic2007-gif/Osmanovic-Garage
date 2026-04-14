import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/blog";
import { ArrowRight, Calendar, User, Tag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImg from "../assets/logo.png";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#111111]">
      {/* HEADER (Simplified for Blog) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoImg} alt="Logo" className="h-10 w-auto" />
            <span className="text-white font-black text-xl tracking-tighter group-hover:text-[#FF4500] transition-colors">
              OSMANOVIĆ <span className="text-[#FF4500] group-hover:text-white">GARAGE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white/70 hover:text-[#FF4500] font-bold text-sm uppercase tracking-widest transition-colors">Početna</Link>
            <Link to="/#usluge" className="text-white/70 hover:text-[#FF4500] font-bold text-sm uppercase tracking-widest transition-colors">Usluge</Link>
            <Link to="/blog" className="text-[#FF4500] font-bold text-sm uppercase tracking-widest transition-colors">Savjeti</Link>
            <Link to="/#book">
              <Button className="bg-[#FF4500] hover:bg-white hover:text-[#111111] text-white font-bold rounded-none px-6 uppercase tracking-widest text-xs transition-all">
                Zakaži termin
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20">
        {/* HERO SECTION */}
        <section className="bg-[#111111] text-white py-20 mb-16">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                Savjeti i <span className="text-[#FF4500]">Edukacija</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                Saznajte kako pravilno održavati vaše vozilo, prepoznati kvarove na vrijeme i uštedjeti novac kroz preventivno održavanje.
              </p>
              
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <Input 
                  type="text" 
                  placeholder="Pretraži članke..." 
                  className="bg-white/5 border-white/10 text-white pl-12 h-14 rounded-none focus-visible:ring-[#FF4500]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* BLOG LIST */}
        <section className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-10">
            {filteredPosts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col h-full border-b-4 border-transparent hover:border-[#FF4500] transition-all bg-gray-50 overflow-hidden"
              >
                <Link to={`/blog/${post.id}`} className="block overflow-hidden aspect-video">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                </Link>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#FF4500]" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3 text-[#FF4500]" /> {post.category}</span>
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-4 group-hover:text-[#FF4500] transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-500 mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="mt-auto inline-flex items-center font-bold text-xs uppercase tracking-widest text-[#FF4500] hover:text-[#111111] transition-colors"
                  >
                    Pročitaj više <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl font-medium">Nismo pronašli članke koji odgovaraju vašoj pretrazi.</p>
              <Button 
                variant="link" 
                onClick={() => setSearchTerm("")}
                className="text-[#FF4500] font-bold uppercase tracking-widest mt-4"
              >
                Prikaži sve članke
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER (Simplified) */}
      <footer className="bg-[#111111] text-white py-20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <img src={logoImg} alt="Logo" className="h-12 w-auto" />
            <span className="text-white font-black text-2xl tracking-tighter">
              OSMANOVIĆ <span className="text-[#FF4500]">GARAGE</span>
            </span>
          </Link>
          <p className="text-gray-500 max-w-md mx-auto mb-10">
            Vaš pouzdan partner za održavanje i servisiranje vozila u Sarajevu.
          </p>
          <div className="text-xs font-bold text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Osmanović Garage. Sva prava zadržana.
          </div>
        </div>
      </footer>
    </div>
  );
}
