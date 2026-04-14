import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Menu,
  X,
  Car,
  Wrench,
  Key,
  Zap,
  Award
} from "lucide-react";
import { SERVICES } from "../data/services";

// ============================================================================
const GARAGE_NAME = "OSMANOVIĆ GARAGE";
const HERO_HEADLINE = "NEKA VAŠ AUTOMOBIL BUDE U SAVRŠENOM STANJU.";
const HERO_SUBHEAD = "Iskustvo i vrhunske usluge za dijagnostiku i popravak svih problema na vašem automobilu. Zapošljavamo certificirane mehaničare koji su spremni raditi na raznim markama i modelima.";

const STATS = [
  { value: "25+", label: "Godina iskustva" },
  { value: "100%", label: "Stopa uspješnosti" },
  { value: "160+", label: "Stručnih tehničara" }
];

const PARTNERS = ["CLOUD", "RISE", "TRACE", "NEXUS", "VERTEX"];
// ============================================================================

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    email: "",
    vehicle_make_model: "",
    service_requested: "",
    preferred_date: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const bookingRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 0]);

  useEffect(() => {
    if (location.hash === "#book" && bookingRef.current) {
      setTimeout(() => {
        bookingRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service_requested: value }));
    if (errors.service_requested) {
      setErrors((prev) => ({ ...prev, service_requested: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customer_name.trim()) newErrors.customer_name = "Ime je obavezno";
    if (!formData.phone.trim()) newErrors.phone = "Telefon je obavezan";
    if (!formData.vehicle_make_model.trim()) newErrors.vehicle_make_model = "Podaci o vozilu su obavezni";
    if (!formData.service_requested) newErrors.service_requested = "Molimo odaberite uslugu";
    if (!formData.preferred_date) newErrors.preferred_date = "Datum je obavezan";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Molimo ispunite sva obavezna polja.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === "https://placeholder.supabase.co") {
        console.warn("Supabase URL is missing. Simulating successful booking.");
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        const { error } = await supabase.from("appointments").insert([
          {
            customer_name: formData.customer_name,
            phone: formData.phone,
            email: formData.email || null,
            vehicle_make_model: formData.vehicle_make_model,
            service_requested: formData.service_requested,
            preferred_date: formData.preferred_date,
            notes: formData.notes || null,
            status: "pending",
          },
        ]);

        if (error) throw error;
      }

      toast.success("Termin je uspješno zatražen! Kontaktirat ćemo vas radi potvrde.", {
        className: "bg-green-50 text-green-900 border-green-200",
      });
      
      setFormData({
        customer_name: "",
        phone: "",
        email: "",
        vehicle_make_model: "",
        service_requested: "",
        preferred_date: "",
        notes: "",
      });
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(`Neuspješno zakazivanje: ${error.message || error.details || "Molimo pokušajte ponovo kasnije."}`, {
        className: "bg-red-50 text-red-900 border-red-200",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#E60000] selection:text-white">
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
            <Link to="/#services" className="hover:text-[#E60000] transition-colors">Usluge</Link>
            <Link to="/blog" className="hover:text-[#E60000] transition-colors">Savjeti</Link>
            <Link to="/#about" className="hover:text-[#E60000] transition-colors">O nama</Link>
            <Link to="/#contact" className="hover:text-[#E60000] transition-colors">Kontakt</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              onClick={scrollToBooking}
              className="hidden md:flex bg-[#E60000] hover:bg-[#E60000]/90 text-white font-bold rounded-full px-8 h-10 md:h-12 uppercase tracking-wider shadow-lg shadow-[#E60000]/20 hover:shadow-[#E60000]/40 transition-all"
            >
              Zakaži termin
            </Button>
            <button 
              className="md:hidden p-1 text-white hover:text-[#E60000] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#111111] border-b border-white/10 shadow-2xl flex flex-col rounded-b-3xl overflow-hidden">
            <Link to="/#services" onClick={() => setIsMobileMenuOpen(false)} className="p-4 border-b border-white/10 font-bold uppercase tracking-widest hover:text-[#E60000]">Usluge</Link>
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="p-4 border-b border-white/10 font-bold uppercase tracking-widest hover:text-[#E60000]">Savjeti</Link>
            <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="p-4 border-b border-white/10 font-bold uppercase tracking-widest hover:text-[#E60000]">O nama</Link>
            <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="p-4 border-b border-white/10 font-bold uppercase tracking-widest hover:text-[#E60000]">Kontakt</Link>
            <div className="p-6">
              <Button
                onClick={() => { scrollToBooking(); setIsMobileMenuOpen(false); }}
                className="w-full bg-[#E60000] hover:bg-[#E60000]/90 text-white font-bold rounded-full h-14 uppercase tracking-wider shadow-lg shadow-[#E60000]/30"
              >
                Zakaži termin
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative bg-[#111111] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 grid md:grid-cols-2">
              <div className="hidden md:block bg-[#111111]"></div>
              <div className="relative col-span-1 md:col-span-1 h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#111111]/70 md:bg-gradient-to-r md:from-[#111111] md:to-transparent z-10"></div>
                <motion.img 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.6 }}
                  style={{ y, opacity }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2070&auto=format&fit=crop" 
                  alt="Mehaničar radi na automobilu" 
                  className="w-full h-[120%] object-cover grayscale absolute inset-0 -top-[10%]"
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="hidden md:inline-block bg-[#E60000] text-white px-6 py-2 font-bold text-sm tracking-widest uppercase mb-6 rounded-full shadow-lg shadow-[#E60000]/20"
                >
                  Profesionalna briga o vozilu
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8 md:mb-6"
                >
                  {HERO_HEADLINE}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="hidden md:block text-gray-400 text-lg md:text-xl mb-10 leading-relaxed font-medium"
                >
                  {HERO_SUBHEAD}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col md:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    onClick={scrollToBooking}
                    className="w-full md:w-auto bg-[#E60000] hover:bg-white hover:text-[#111111] text-white font-bold rounded-full px-10 h-16 text-lg uppercase tracking-wider transition-all shadow-xl shadow-[#E60000]/30 hover:scale-105"
                  >
                    Zakaži servis
                    <ArrowRight className="hidden md:block ml-3 h-6 w-6" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Kasindolska+cesta+br.+225,+Sarajevo+71000", "_blank")}
                    className="w-full md:w-auto border-white/30 text-white hover:bg-white hover:text-[#111111] font-bold rounded-full px-10 h-16 text-lg uppercase tracking-wider transition-all bg-white/5 backdrop-blur-sm hover:scale-105"
                  >
                    Lokacija
                    <MapPin className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* FLOATING STATS */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative z-20 container mx-auto px-4 max-w-7xl -mt-12 md:-mt-16 mb-12"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/95 backdrop-blur-xl p-8 md:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8 border-b-4 border-[#E60000] rounded-3xl"
            >
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left flex flex-col md:flex-row items-center md:items-baseline gap-4">
                  <div className="text-4xl md:text-5xl font-black text-[#111111] tracking-tighter">{stat.value}</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 bg-white overflow-hidden relative border-b border-gray-200">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#E60000]/5 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-black text-[#111111] uppercase tracking-tighter mb-2"
              >
                Osmanović Garage
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-[#E60000] uppercase tracking-tighter leading-none mb-8"
              >
                Zašto odabrati nas?
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="flex gap-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-4 h-1.5 bg-[#E60000] transform -skew-x-12 rounded-full" />
                  ))}
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium"
              >
                Naši zaposlenici se odlikuju ljubaznošću, stručnošću i marljivošću. 
                Vaše vozilo je kod nas u najboljim rukama i dobit će maksimalnu njegu.
                <br/><br/>
                <strong className="text-[#111111] font-black uppercase tracking-widest">Vaše zadovoljstvo je naš cilj.</strong>
              </motion.p>

              {/* Mobile Scroll Indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="md:hidden flex items-center justify-center gap-2 text-[#E60000] font-bold uppercase tracking-widest text-xs mt-10 animate-pulse"
              >
                <span>Pomiči za više</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>

            {/* The Features Row */}
            <div className="relative">
              {/* Mobile scroll hint */}
              <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 w-12 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
              
              <div className="flex overflow-x-auto md:justify-center items-center gap-6 md:gap-0 pb-12 pt-8 px-4 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 md:mx-0">
                {[
                  { icon: Wrench, title: "25+ godina", subtitle: "iskustva" },
                  { icon: Car, title: "Zaštićeno", subtitle: "vozilo" },
                  { icon: Key, title: "Vrhunska", subtitle: "kvaliteta", highlighted: true },
                  { icon: Zap, title: "Najbolji", subtitle: "alati" },
                  { icon: Award, title: "Prijateljska", subtitle: "usluga" },
                ].map((reason, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`snap-center shrink-0 flex flex-col items-center justify-center w-[280px] md:w-[220px] lg:w-[240px] transition-all duration-500 relative group ${
                      reason.highlighted 
                        ? 'bg-[#E60000] py-16 md:py-20 shadow-[0_20px_50px_rgba(230,0,0,0.4)] z-10 md:scale-110 border-2 border-[#E60000] rounded-[2.5rem]' 
                        : 'py-12 bg-white border-2 border-gray-100 hover:border-[#E60000] hover:shadow-2xl rounded-3xl'
                    }`}
                  >
                    <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 ${
                      reason.highlighted 
                        ? 'bg-white text-[#E60000] shadow-xl scale-110' 
                        : 'bg-[#E60000] text-white group-hover:scale-110 group-hover:shadow-lg'
                    }`}>
                      <reason.icon className={`w-10 h-10 md:w-12 md:h-12 ${reason.highlighted ? 'animate-pulse' : ''}`} />
                    </div>
                    <h4 className={`text-2xl md:text-xl lg:text-2xl font-black uppercase tracking-tight text-center px-4 ${
                      reason.highlighted ? 'text-white' : 'text-[#111111]'
                    }`}>
                      {reason.title}
                    </h4>
                    <p className={`text-sm md:text-xs lg:text-sm font-bold uppercase tracking-widest text-center mt-2 ${
                      reason.highlighted ? 'text-white/90' : 'text-gray-500'
                    }`}>
                      {reason.subtitle}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="services" className="py-24 bg-[#111111] text-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-16 md:flex justify-between items-end"
            >
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                  NUDIMO ŠIROK SPEKTAR <br className="hidden md:block" /><span className="text-[#E60000]">USLUGA.</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Od redovnog održavanja do složene dijagnostike motora, naši certificirani tehničari su tu za vas.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div 
                    key={service.id} 
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                    whileHover={{ y: -10 }}
                    className="bg-white/5 border border-white/10 text-white p-8 group hover:bg-white hover:text-[#111111] transition-all duration-500 flex flex-col h-full rounded-3xl hover:shadow-[0_20px_40px_rgba(230,0,0,0.2)]"
                  >
                    <div className="w-16 h-16 bg-[#E60000]/10 rounded-2xl flex items-center justify-center mb-8 text-[#E60000] group-hover:bg-[#E60000] group-hover:text-white transition-colors duration-500">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4">{service.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-600 mb-8 leading-relaxed flex-grow transition-colors duration-500">
                      {service.shortDescription}
                    </p>
                    <Link to={`/usluge/${service.id}`} className="inline-flex items-center font-bold text-sm uppercase tracking-widest text-[#E60000] group-hover:text-[#E60000] transition-colors mt-auto">
                      Saznaj više <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* BLOG PREVIEW SECTION */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <div className="bg-[#E60000] text-white px-6 py-2 font-bold text-sm tracking-widest uppercase inline-block mb-4 rounded-full shadow-lg shadow-[#E60000]/20">Edukacija</div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                  Savjeti za <span className="text-[#E60000]">vaše vozilo</span>
                </h2>
              </div>
              <Link to="/blog">
                <Button variant="outline" className="rounded-full border-2 border-[#111111] font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all h-14 px-8 hover:scale-105">
                  Vidi sve savjete
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  id: "priprema-auta-za-zimu",
                  title: "Kako pripremiti auto za zimu?",
                  category: "Održavanje",
                  image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2070&auto=format&fit=crop"
                },
                {
                  id: "znacenje-lampica-na-tabli",
                  title: "Šta znače lampice na instrument tabli?",
                  category: "Savjeti",
                  image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
                },
                {
                  id: "zamjena-velikog-remena",
                  title: "Kada je zapravo vrijeme za zamjenu velikog remena?",
                  category: "Servis",
                  image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop"
                }
              ].map((post, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                >
                  <Link to={`/blog/${post.id}`} className="block overflow-hidden aspect-video">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                  </Link>
                  <div className="p-8">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#E60000] mb-3 bg-[#E60000]/10 inline-block px-3 py-1 rounded-full">{post.category}</div>
                    <h3 className="text-xl font-black uppercase tracking-tighter leading-tight mb-4 group-hover:text-[#E60000] transition-colors">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center font-bold text-[10px] uppercase tracking-widest text-[#111111] group-hover:text-[#E60000] transition-colors">
                      Pročitaj više <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* APPOINTMENT BOOKING FORM */}
        <section ref={bookingRef} id="book" className="py-24 bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E60000]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                  ZAKAŽI SVOJ <br/><span className="text-[#E60000]">TERMIN</span>
                </h2>
                <p className="text-gray-600 text-lg mb-12">
                  Zakažite svoj servis danas. Ispunite formu i naš tim će vas uskoro kontaktirati kako bismo potvrdili vrijeme vašeg termina.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl text-[#E60000] flex items-center justify-center shrink-0 group-hover:bg-[#E60000] group-hover:text-white transition-colors duration-500 shadow-sm">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest mb-1">Pozovite nas 24/7</h4>
                      <p className="text-gray-600 text-lg">+387 644071821</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl text-[#E60000] flex items-center justify-center shrink-0 group-hover:bg-[#E60000] group-hover:text-white transition-colors duration-500 shadow-sm">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest mb-1">Lokacija</h4>
                      <p className="text-gray-600 text-lg">Kasindolska cesta br.205, Sarajevo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl text-[#E60000] flex items-center justify-center shrink-0 group-hover:bg-[#E60000] group-hover:text-white transition-colors duration-500 shadow-sm">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest mb-1">Radno vrijeme</h4>
                      <p className="text-gray-600 text-lg">Pon - Sub: 08:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-[2.5rem] border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E60000] to-[#ff4d4d]" />
                <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Zahtjev za servis</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="customer_name" className="font-bold uppercase tracking-wider text-xs text-gray-500 ml-1">Ime i prezime *</Label>
                      <Input
                        id="customer_name"
                        name="customer_name"
                        placeholder="John Doe"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        className={`rounded-2xl h-14 bg-gray-50 border-transparent focus:bg-white focus:border-[#E60000] focus-visible:ring-[#E60000] transition-all ${errors.customer_name ? "border-red-500 bg-red-50" : ""}`}
                      />
                      {errors.customer_name && <p className="text-red-500 text-xs font-bold ml-1">{errors.customer_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-bold uppercase tracking-wider text-xs text-gray-500 ml-1">Broj telefona *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+387 60 000 000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`rounded-2xl h-14 bg-gray-50 border-transparent focus:bg-white focus:border-[#E60000] focus-visible:ring-[#E60000] transition-all ${errors.phone ? "border-red-500 bg-red-50" : ""}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs font-bold ml-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold uppercase tracking-wider text-xs text-gray-500 ml-1">Email adresa</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="rounded-2xl h-14 bg-gray-50 border-transparent focus:bg-white focus:border-[#E60000] focus-visible:ring-[#E60000] transition-all"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_make_model" className="font-bold uppercase tracking-wider text-xs text-gray-500 ml-1">Marka i model vozila *</Label>
                      <Input
                        id="vehicle_make_model"
                        name="vehicle_make_model"
                        placeholder="npr. 2018 Ford F-150"
                        value={formData.vehicle_make_model}
                        onChange={handleInputChange}
                        className={`rounded-2xl h-14 bg-gray-50 border-transparent focus:bg-white focus:border-[#E60000] focus-visible:ring-[#E60000] transition-all ${errors.vehicle_make_model ? "border-red-500 bg-red-50" : ""}`}
                      />
                      {errors.vehicle_make_model && <p className="text-red-500 text-xs font-bold ml-1">{errors.vehicle_make_model}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred_date" className="font-bold uppercase tracking-wider text-xs text-gray-500 ml-1">Željeni datum *</Label>
                      <Input
                        id="preferred_date"
                        name="preferred_date"
                        type="date"
                        value={formData.preferred_date}
                        onChange={handleInputChange}
                        className={`rounded-2xl h-14 bg-gray-50 border-transparent focus:bg-white focus:border-[#E60000] focus-visible:ring-[#E60000] transition-all ${errors.preferred_date ? "border-red-500 bg-red-50" : ""}`}
                      />
                      {errors.preferred_date && <p className="text-red-500 text-xs font-bold ml-1">{errors.preferred_date}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold uppercase tracking-wider text-xs text-gray-500 ml-1">Tražena usluga *</Label>
                    <Select value={formData.service_requested} onValueChange={handleServiceChange}>
                      <SelectTrigger className={`rounded-2xl h-14 bg-gray-50 border-transparent focus:bg-white focus:border-[#E60000] focus:ring-[#E60000] transition-all ${errors.service_requested ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder="Odaberite uslugu" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {SERVICES.map(s => (
                          <SelectItem key={s.id} value={s.title} className="rounded-xl">{s.title}</SelectItem>
                        ))}
                        <SelectItem value="Ostalo / Nisam siguran" className="rounded-xl">Ostalo / Nisam siguran</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service_requested && <p className="text-red-500 text-xs font-bold ml-1">{errors.service_requested}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="font-bold uppercase tracking-wider text-xs text-gray-500 ml-1">Dodatne napomene</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      placeholder="Opišite specifične probleme ili zvukove..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-[#E60000] focus:outline-none focus:ring-2 focus:ring-[#E60000] transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-[#E60000] hover:bg-[#cc0000] text-white font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-[#E60000]/30 hover:shadow-[#E60000]/50 hover:-translate-y-1"
                  >
                    {isSubmitting ? "Slanje..." : "Potvrdi termin"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#111111] text-white pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center inline-block">
                  <img src={logoImg} alt="Osmanović Garage Logo" className="h-16 md:h-24 w-auto object-contain" onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }} />
                  <div className="hidden w-12 h-12 bg-[#E60000] items-center justify-center font-black text-2xl italic tracking-tighter text-white rounded-full">
                    OG
                  </div>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-8">
                Profesionalne usluge popravka i održavanja automobila. Osiguravamo da vaše vozilo radi u najboljem izdanju s našim certificiranim stručnim tehničarima.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E60000] transition-all hover:scale-110 cursor-pointer">
                  <span className="font-bold">FB</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E60000] transition-all hover:scale-110 cursor-pointer">
                  <span className="font-bold">IG</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E60000] transition-all hover:scale-110 cursor-pointer">
                  <span className="font-bold">X</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 text-lg">Brzi linkovi</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><Link to="/" className="hover:text-[#E60000] transition-colors">Početna</Link></li>
                <li><Link to="/#about" className="hover:text-[#E60000] transition-colors">O nama</Link></li>
                <li><Link to="/#services" className="hover:text-[#E60000] transition-colors">Naše usluge</Link></li>
                <li><Link to="/#book" className="hover:text-[#E60000] transition-colors">Zakaži termin</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 text-lg">Kontakt informacije</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E60000] shrink-0" />
                  <span>Kasindolska cesta br.205, Sarajevo</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#E60000] shrink-0" />
                  <span>+387 644071821</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-medium">
            <p>&copy; {new Date().getFullYear()} {GARAGE_NAME}. Sva prava zadržana.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Politika privatnosti</a>
              <a href="#" className="hover:text-white transition-colors">Uslovi korištenja</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
