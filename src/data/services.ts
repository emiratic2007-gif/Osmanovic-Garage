import { Settings, Wrench, Disc, Car, Battery, Thermometer, ShieldCheck, PenTool } from "lucide-react";

export const SERVICES = [
  { 
    id: "dijagnostika", 
    title: "Kompjuterska Dijagnostika", 
    shortDescription: "Sveobuhvatna kompjuterska dijagnostika za prepoznavanje problema s motorom ili elektrikom.", 
    fullDescription: "Naša napredna kompjuterska dijagnostika koristi najnoviju tehnologiju za precizno očitavanje grešaka iz računara vašeg vozila. Bilo da vam svijetli 'Check Engine' lampica ili primjećujete neobično ponašanje u vožnji, naši stručnjaci će brzo i tačno locirati problem. Nudimo detaljan izvještaj o stanju motora, elektronike, ABS i airbag sistema, čime štedimo vaše vrijeme i novac sprečavajući veće kvarove.",
    icon: Settings,
    image: "https://images.unsplash.com/photo-1635437536607-b8572f443763?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: "mali-veliki-servis", 
    title: "Mali i Veliki Servis", 
    shortDescription: "Redovno održavanje, zamjena ulja, filtera, remenja i pumpi za besprijekoran rad.", 
    fullDescription: "Redovno održavanje je ključ dugovječnosti svakog vozila. Naš mali servis uključuje zamjenu motornog ulja (koristimo isključivo premium sintetička ulja), svih filtera (ulje, zrak, gorivo, kabina) i pregled osnovnih tekućina. Veliki servis obuhvata zamjenu zupčastog remena, klinastog remena, vodene pumpe, španera i rolera. Prepustite svoje vozilo našim certificiranim mehaničarima i vozite bezbrižno.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop"
  },
  { 
    id: "kocioni-sistemi", 
    title: "Servis Kočnica", 
    shortDescription: "Kompletan pregled kočionog sistema, zamjena pločica, diskova i kočione tekućine.", 
    fullDescription: "Vaša sigurnost je naš prioritet. Nudimo kompletan pregled i servis kočionog sistema. Naše usluge uključuju zamjenu kočionih pločica i pakni, obradu ili zamjenu kočionih diskova i doboša, te izmjenu kočione tekućine uz odzračivanje sistema. Koristimo samo najkvalitetnije dijelove renomiranih proizvođača kako bismo osigurali maksimalnu zaustavnu moć vašeg vozila u svim uslovima.",
    icon: Disc,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop"
  },
  { 
    id: "vulkanizer", 
    title: "Vulkanizerske Usluge", 
    shortDescription: "Montaža, balansiranje, popravak guma i laserska optika trapa (špura).", 
    fullDescription: "Pružamo kompletne vulkanizerske usluge za putnička i laka komercijalna vozila. Naša ponuda uključuje montažu i demontažu guma, precizno kompjutersko balansiranje, krpljenje guma najsavremenijim metodama, kao i prodaju novih guma svih vodećih brendova. Također, vršimo lasersko podešavanje geometrije točkova (špura) kako bismo osigurali ravnomjerno trošenje guma i stabilnost na cesti.",
    icon: Car,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop"
  },
  { 
    id: "autoelektrika", 
    title: "Autoelektrika", 
    shortDescription: "Popravak alnasera, alternatora, instalacija i zamjena akumulatora.", 
    fullDescription: "Moderni automobili uveliko zavise od kompleksnih električnih sistema. Naši iskusni autoelektričari rješavaju sve probleme vezane za elektroniku i elektriku. Vršimo reparaciju i zamjenu alnasera i alternatora, dijagnostiku i popravak elektroinstalacija, rješavanje problema sa rasvjetom, te testiranje i ugradnju novih akumulatora. Brzo i efikasno otklanjamo sve električne kvarove.",
    icon: Battery,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
  },
  { 
    id: "auto-klima", 
    title: "Servis Auto Klima", 
    shortDescription: "Punjenje, dezinfekcija i popravak sistema klimatizacije.", 
    fullDescription: "Osigurajte ugodnu vožnju tokom cijele godine uz naš profesionalni servis auto klima. Nudimo punjenje klima uređaja najkvalitetnijim freonom, provjeru propusnosti sistema UV bojom, dezinfekciju ventilacionih kanala (uklanjanje neugodnih mirisa i bakterija), te zamjenu kompresora, kondenzatora i isparivača. Redovan servis klime čuva vaše zdravlje i produžava vijek trajanja sistema.",
    icon: Thermometer,
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2031&auto=format&fit=crop"
  },
  { 
    id: "limarija-lakiranje", 
    title: "Limarija i Lakiranje", 
    shortDescription: "Izvlačenje udubljenja, popravak karoserije i profesionalno lakiranje u komori.", 
    fullDescription: "Vraćamo vašem vozilu prvobitni sjaj! Naša autolimarska i lakirerska radionica opremljena je najmodernijim alatima. Nudimo popravak oštećenja od sudara, izvlačenje sitnih udubljenja (PDR metoda bez lakiranja), sanaciju hrđe, te profesionalno lakiranje u termo-komori uz kompjutersko miješanje boja za savršeno poklapanje nijansi. Vaš automobil će izgledati kao da je tek izašao iz salona.",
    icon: PenTool,
    image: "https://images.unsplash.com/photo-1605810730434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: "tehnicki-pregled", 
    title: "Priprema za Tehnički", 
    shortDescription: "Detaljan pregled vozila i otklanjanje nedostataka prije tehničkog pregleda.", 
    fullDescription: "Izbjegnite stres i padanje na tehničkom pregledu. Naša usluga pripreme za tehnički pregled obuhvata detaljnu provjeru svih vitalnih sistema vozila: kočnica, upravljačkog mehanizma, ovjesa, svjetlosne signalizacije, ispušnog sistema i eko-testa. Ukoliko uočimo nedostatke, uz vašu saglasnost ih odmah otklanjamo, garantirajući vam prolazak na tehničkom pregledu iz prvog pokušaja.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop"
  }
];
