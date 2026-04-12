import { useState, useRef } from "react";
import { motion } from "motion/react";
import { supabase } from "./lib/supabase";
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
import { Toaster } from "@/components/ui/sonner";
import {
  Wrench,
  Settings,
  Disc,
  Car,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Menu,
  X
} from "lucide-react";

// ============================================================================
// 🛠️ BEGINNER EDIT SECTION: GARAGE DETAILS
// Edit these variables to customize your garage template.
// ============================================================================
const GARAGE_NAME = "OSMANOVIĆ GARAGE";
const HERO_HEADLINE = "NEKA VAŠ AUTOMOBIL BUDE U SAVRŠENOM STANJU.";
const HERO_SUBHEAD = "Iskustvo i vrhunske usluge za dijagnostiku i popravak svih problema na vašem automobilu. Zapošljavamo certificirane mehaničare koji su spremni raditi na raznim markama i modelima.";

const SERVICES = [
  { id: "diagnostics", title: "Dijagnostika", description: "Sveobuhvatna kompjuterska dijagnostika za prepoznavanje problema s motorom ili elektrikom.", icon: <Settings className="w-8 h-8" /> },
  { id: "oil-change", title: "Zamjena ulja", description: "Zamjena premium sintetičkog i konvencionalnog ulja kako bi vaš motor radio besprijekorno.", icon: <Wrench className="w-8 h-8" /> },
  { id: "brake-repair", title: "Popravak kočnica", description: "Kompletan pregled kočionog sistema, zamjena pločica i obrada diskova.", icon: <Disc className="w-8 h-8" /> },
  { id: "tire-services", title: "Vulkanizerske usluge", description: "Rotacija, balansiranje, špura i ugradnja novih guma.", icon: <Car className="w-8 h-8" /> }
];

const STATS = [
  { value: "25+", label: "Godina iskustva" },
  { value: "100%", label: "Stopa uspješnosti" },
  { value: "160+", label: "Stručnih tehničara" }
];

const PARTNERS = ["CLOUD", "RISE", "TRACE", "NEXUS", "VERTEX"];
// ============================================================================

export default function App() {
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
      // Check if SUPABASE_URL is provided, otherwise simulate success for preview
      if (!supabase.supabaseUrl || supabase.supabaseUrl === "https://placeholder.supabase.co") {
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
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#FF4500] selection:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#111111] text-white border-b border-white/10">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between max-w-7xl">
          <div className="flex items-center">
            <div className="flex items-center justify-center">
              {/* 
                To use your uploaded logo:
                1. Open the file explorer on the left.
                2. Upload your logo image into the "public" folder and name it "logo.png".
              */}
              <img src="/logo.png" alt="Osmanović Garage Logo" className="h-10 md:h-14 w-auto object-contain" onError={(e) => {
                // Fallback if logo.png is not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} />
              <div className="hidden w-10 h-10 bg-[#FF4500] items-center justify-center font-black text-xl italic tracking-tighter text-white">
                OG
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest uppercase">
            <a href="#services" className="hover:text-[#FF4500] transition-colors">Usluge</a>
            <a href="#about" className="hover:text-[#FF4500] transition-colors">O nama</a>
            <a href="#contact" className="hover:text-[#FF4500] transition-colors">Kontakt</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              onClick={scrollToBooking}
              className="hidden md:flex bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-bold rounded-none px-6 h-10 md:h-12 uppercase tracking-wider"
            >
              Zakaži termin
            </Button>
            <button 
              className="md:hidden p-1 text-white hover:text-[#FF4500] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#111111] border-b border-white/10 shadow-2xl flex flex-col">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="p-4 border-b border-white/10 font-bold uppercase tracking-widest hover:text-[#FF4500]">Usluge</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="p-4 border-b border-white/10 font-bold uppercase tracking-widest hover:text-[#FF4500]">O nama</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="p-4 border-b border-white/10 font-bold uppercase tracking-widest hover:text-[#FF4500]">Kontakt</a>
            <div className="p-4">
              <Button
                onClick={() => { scrollToBooking(); setIsMobileMenuOpen(false); }}
                className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-bold rounded-none h-12 uppercase tracking-wider"
              >
                Zakaži termin
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative bg-[#111111] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Split background: dark left, image right on desktop. Full image on mobile. */}
            <div className="absolute inset-0 grid md:grid-cols-2">
              <div className="hidden md:block bg-[#111111]"></div>
              <div className="relative col-span-1 md:col-span-1 h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#111111]/70 md:bg-gradient-to-r md:from-[#111111] md:to-transparent z-10"></div>
                <motion.img 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.6 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2070&auto=format&fit=crop" 
                  alt="Mehaničar radi na automobilu" 
                  className="w-full h-full object-cover grayscale absolute inset-0"
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
                  className="hidden md:inline-block bg-[#FF4500] text-white px-4 py-1 font-bold text-sm tracking-widest uppercase mb-6"
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
                >
                  <Button
                    size="lg"
                    onClick={scrollToBooking}
                    className="w-full md:w-auto bg-[#FF4500] hover:bg-white hover:text-[#111111] text-white font-bold rounded-none px-10 h-16 text-lg uppercase tracking-wider transition-all"
                  >
                    Zakaži servis
                    <ArrowRight className="hidden md:block ml-3 h-6 w-6" />
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
            <div className="bg-white p-8 md:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8 border-b-4 border-[#FF4500]">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left flex flex-col md:flex-row items-center md:items-baseline gap-4">
                  <div className="text-4xl md:text-5xl font-black text-[#111111] tracking-tighter">{stat.value}</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* TRUSTED PARTNERS */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8"
            >
              Vjeruju nam lideri u industriji
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale"
            >
              {PARTNERS.map((partner) => (
                <div key={partner} className="text-2xl font-black tracking-tighter text-[#111111]">
                  {partner}
                </div>
              ))}
            </motion.div>
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
                  NUDIMO ŠIROK SPEKTAR <br className="hidden md:block" /><span className="text-[#FF4500]">USLUGA.</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Od redovnog održavanja do složene dijagnostike motora, naši certificirani tehničari su tu za vas.
                </p>
              </div>
              <Button variant="outline" className="hidden md:flex border-white text-white hover:bg-white hover:text-[#111111] rounded-none uppercase font-bold tracking-widest h-12 px-8 mt-8 md:mt-0 transition-colors">
                Pogledaj sve usluge
              </Button>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {SERVICES.map((service) => (
                <motion.div 
                  key={service.id} 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  whileHover={{ y: -10 }}
                  className="bg-white text-[#111111] p-8 group transition-colors duration-300"
                >
                  <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mb-8 text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <a href="#book" onClick={(e) => { e.preventDefault(); scrollToBooking(); handleServiceChange(service.title); }} className="inline-flex items-center font-bold text-sm uppercase tracking-widest text-[#FF4500] hover:text-[#111111] transition-colors">
                    Zakaži odmah <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* APPOINTMENT BOOKING FORM */}
        <section ref={bookingRef} id="book" className="py-24 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                  ZAKAŽI SVOJ <br/><span className="text-[#FF4500]">TERMIN</span>
                </h2>
                <p className="text-gray-600 text-lg mb-12">
                  Zakažite svoj servis danas. Ispunite formu i naš tim će vas uskoro kontaktirati kako bismo potvrdili vrijeme vašeg termina.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-[#111111] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest mb-1">Pozovite nas 24/7</h4>
                      <p className="text-gray-600 text-lg">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-[#111111] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest mb-1">Lokacija</h4>
                      <p className="text-gray-600 text-lg">123 Mechanic Ave, Auto District, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-[#111111] text-white flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
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
                className="bg-white p-8 md:p-12 shadow-xl border-t-4 border-[#FF4500]"
              >
                <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Zahtjev za servis</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="customer_name" className="font-bold uppercase tracking-wider text-xs text-gray-500">Ime i prezime *</Label>
                      <Input
                        id="customer_name"
                        name="customer_name"
                        placeholder="John Doe"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        className={`rounded-none h-12 border-gray-300 focus-visible:ring-[#FF4500] ${errors.customer_name ? "border-red-500" : ""}`}
                      />
                      {errors.customer_name && <p className="text-red-500 text-xs font-bold">{errors.customer_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-bold uppercase tracking-wider text-xs text-gray-500">Broj telefona *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`rounded-none h-12 border-gray-300 focus-visible:ring-[#FF4500] ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold uppercase tracking-wider text-xs text-gray-500">Email adresa</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="rounded-none h-12 border-gray-300 focus-visible:ring-[#FF4500]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_make_model" className="font-bold uppercase tracking-wider text-xs text-gray-500">Marka i model vozila *</Label>
                      <Input
                        id="vehicle_make_model"
                        name="vehicle_make_model"
                        placeholder="npr. 2018 Ford F-150"
                        value={formData.vehicle_make_model}
                        onChange={handleInputChange}
                        className={`rounded-none h-12 border-gray-300 focus-visible:ring-[#FF4500] ${errors.vehicle_make_model ? "border-red-500" : ""}`}
                      />
                      {errors.vehicle_make_model && <p className="text-red-500 text-xs font-bold">{errors.vehicle_make_model}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred_date" className="font-bold uppercase tracking-wider text-xs text-gray-500">Željeni datum *</Label>
                      <Input
                        id="preferred_date"
                        name="preferred_date"
                        type="date"
                        value={formData.preferred_date}
                        onChange={handleInputChange}
                        className={`rounded-none h-12 border-gray-300 focus-visible:ring-[#FF4500] ${errors.preferred_date ? "border-red-500" : ""}`}
                      />
                      {errors.preferred_date && <p className="text-red-500 text-xs font-bold">{errors.preferred_date}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold uppercase tracking-wider text-xs text-gray-500">Tražena usluga *</Label>
                    <Select value={formData.service_requested} onValueChange={handleServiceChange}>
                      <SelectTrigger className={`rounded-none h-12 border-gray-300 focus:ring-[#FF4500] ${errors.service_requested ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Odaberite uslugu" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        {SERVICES.map(s => (
                          <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                        ))}
                        <SelectItem value="Ostalo / Nisam siguran">Ostalo / Nisam siguran</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service_requested && <p className="text-red-500 text-xs font-bold">{errors.service_requested}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="font-bold uppercase tracking-wider text-xs text-gray-500">Dodatne napomene</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      placeholder="Opišite specifične probleme ili zvukove..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-[#111111] hover:bg-[#FF4500] text-white font-black uppercase tracking-widest rounded-none transition-colors"
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
                  <img src="/logo.png" alt="Osmanović Garage Logo" className="h-16 md:h-24 w-auto object-contain" onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }} />
                  <div className="hidden w-12 h-12 bg-[#FF4500] items-center justify-center font-black text-2xl italic tracking-tighter text-white">
                    OG
                  </div>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-8">
                Profesionalne usluge popravka i održavanja automobila. Osiguravamo da vaše vozilo radi u najboljem izdanju s našim certificiranim stručnim tehničarima.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#FF4500] transition-colors cursor-pointer">
                  <span className="font-bold">FB</span>
                </div>
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#FF4500] transition-colors cursor-pointer">
                  <span className="font-bold">IG</span>
                </div>
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#FF4500] transition-colors cursor-pointer">
                  <span className="font-bold">X</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 text-lg">Brzi linkovi</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><a href="#" className="hover:text-[#FF4500] transition-colors">Početna</a></li>
                <li><a href="#about" className="hover:text-[#FF4500] transition-colors">O nama</a></li>
                <li><a href="#services" className="hover:text-[#FF4500] transition-colors">Naše usluge</a></li>
                <li><a href="#book" className="hover:text-[#FF4500] transition-colors">Zakaži termin</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 text-lg">Kontakt informacije</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF4500] shrink-0" />
                  <span>123 Mechanic Ave, Auto District, NY 10001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#FF4500] shrink-0" />
                  <span>+1 (555) 123-4567</span>
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

      <Toaster position="top-center" />
    </div>
  );
}
