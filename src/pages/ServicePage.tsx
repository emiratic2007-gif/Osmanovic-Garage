import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SERVICES } from "../data/services";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import logoImg from "../assets/logo.png";

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id === id);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-black mb-4 uppercase tracking-widest">Usluga nije pronađena</h1>
        <Link to="/">
          <Button className="bg-[#E60000] hover:bg-white hover:text-[#111111] rounded-full px-8 font-bold uppercase tracking-widest shadow-lg shadow-[#E60000]/20">
            <ArrowLeft className="mr-2 w-4 h-4" /> Nazad na početnu
          </Button>
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#E60000] selection:text-white flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#111111] text-white border-b border-white/10">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between max-w-7xl">
          <div className="flex items-center">
            <Link to="/" className="flex items-center justify-center">
              <img src={logoImg} alt="Osmanović Garage Logo" className="h-10 md:h-14 w-auto object-contain" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} />
              <div className="hidden w-10 h-10 bg-[#E60000] items-center justify-center font-black text-xl italic tracking-tighter text-white rounded-full">
                OG
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest uppercase">
            <Link to="/" className="hover:text-[#E60000] transition-colors">Početna</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/#book">
              <Button
                className="hidden md:flex bg-[#E60000] hover:bg-[#E60000]/90 text-white font-bold rounded-full px-8 h-10 md:h-12 uppercase tracking-wider shadow-lg shadow-[#E60000]/20 hover:shadow-[#E60000]/40 transition-all"
              >
                Zakaži termin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* HERO SECTION FOR SERVICE */}
        <section ref={heroRef} className="relative bg-[#111111] text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#111111]/80 z-10"></div>
            <motion.img 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              style={{ y, opacity }}
              transition={{ duration: 1 }}
              src={service.image} 
              alt={service.title} 
              className="w-full h-[120%] object-cover grayscale absolute inset-0 -top-[10%]"
            />
          </div>
          <div className="container mx-auto px-4 relative z-20 max-w-7xl">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-[#E60000] transition-colors font-bold uppercase tracking-widest text-sm mb-8">
              <ArrowLeft className="mr-2 w-4 h-4" /> Nazad na sve usluge
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6 mb-6"
            >
              <div className="w-16 h-16 bg-[#E60000] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#E60000]/30">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                {service.title}
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl leading-relaxed"
            >
              {service.shortDescription}
            </motion.p>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">Detalji Usluge</h2>
                <div className="prose prose-lg text-gray-600 leading-relaxed">
                  <p>{service.fullDescription}</p>
                </div>
                
                <div className="mt-12 space-y-4">
                  <h3 className="text-xl font-bold uppercase tracking-widest mb-6">Zašto odabrati nas?</h3>
                  {[
                    "Certificirani i iskusni mehaničari",
                    "Korištenje najmodernije opreme",
                    "Garancija na ugrađene dijelove i rad",
                    "Brza i efikasna usluga"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#E60000] shrink-0" />
                      <span className="font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-16">
                  <Link to="/#book">
                    <Button className="w-full md:w-auto bg-[#111111] hover:bg-[#E60000] text-white font-black uppercase tracking-widest rounded-full h-14 px-10 transition-all shadow-lg hover:shadow-[#E60000]/30 hover:-translate-y-1">
                      Zakaži ovu uslugu
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#E60000] rounded-[2.5rem] translate-x-4 translate-y-4 z-0"></div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="relative z-10 w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-[2.5rem] shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-white pt-12 pb-8 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
            &copy; {new Date().getFullYear()} OSMANOVIĆ GARAGE. Sva prava zadržana.
          </p>
        </div>
      </footer>
    </div>
  );
}
