export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "priprema-auta-za-zimu",
    title: "Kako pripremiti auto za zimu?",
    excerpt: "Zimski uslovi vožnje zahtijevaju posebnu pažnju. Saznajte kako osigurati da vaš automobil bude spreman za niske temperature i snijeg.",
    content: `
      Zima donosi niske temperature, led i snijeg, što može biti izazovno za svaki automobil. Pravilna priprema nije samo pitanje udobnosti, već prvenstveno sigurnosti.

      ### 1. Provjera akumulatora
      Niske temperature značajno smanjuju kapacitet akumulatora. Ako je vaš akumulator stariji od 3-4 godine, preporučujemo testiranje prije prvih mrazeva.

      ### 2. Zimske gume
      Zakonska obaveza u BiH počinje 1. novembra, ali sigurnost bi trebala biti primarni motiv. Zimske gume imaju poseban sastav koji ostaje mekan na niskim temperaturama, pružajući bolji grip.

      ### 3. Antifriz i tečnost za stakla
      Provjerite tačku smrzavanja rashladne tečnosti. Također, obavezno sipajte zimsku tečnost za pranje vjetrobranskog stakla koja se neće zalediti na mlaznicama.

      ### 4. Provjera kočnica i ovjesa
      Na klizavim cestama, ispravnost kočnica je presudna. Svaka neravnomjernost u kočenju može dovesti do zanošenja vozila.
    `,
    date: "15. Oktobar 2023.",
    author: "Osmanović Garage Tim",
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2070&auto=format&fit=crop",
    category: "Održavanje"
  },
  {
    id: "znacenje-lampica-na-tabli",
    title: "Šta znače lampice na instrument tabli?",
    excerpt: "Crvena, žuta ili zelena? Naučite prepoznati signale koje vam vaš automobil šalje i reagujte na vrijeme kako biste izbjegli skupe kvarove.",
    content: `
      Moderna vozila opremljena su brojnim senzorima koji prate rad svih sistema. Kada se upali lampica, automobil vam pokušava nešto reći.

      ### Boje su bitne:
      - **Crvena:** Označava ozbiljan problem ili sigurnosni rizik. Odmah se zaustavite i ugasite motor (npr. pritisak ulja, temperatura motora).
      - **Žuta/Narandžasta:** Signalizira da nešto nije u redu i da je potreban pregled u skorije vrijeme (npr. Check Engine, pritisak u gumama).
      - **Zelena/Plava:** Informacijske lampice (npr. upaljena svjetla, tempomat).

      ### Najčešće lampice:
      1. **Check Engine:** Može značiti bilo šta od labavog čepa rezervoara do kvara senzora protoka zraka. Potrebna je kompjuterska dijagnostika.
      2. **Lampica ulja:** Kritično! Motor nema dovoljno podmazivanja.
      3. **ABS lampica:** Sistem protiv blokiranja točkova je isključen, ali klasične kočnice i dalje rade.
    `,
    date: "02. Novembar 2023.",
    author: "Osmanović Garage Tim",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop",
    category: "Savjeti"
  },
  {
    id: "zamjena-velikog-remena",
    title: "Kada je zapravo vrijeme za zamjenu velikog remena?",
    excerpt: "Veliki servis je jedna od najvažnijih stavki održavanja. Saznajte zašto ne smijete ignorisati intervale zamjene zupčastog remena.",
    content: `
      Zupčasti remen (veliki remen) je kritična komponenta koja sinhronizuje rad radilice i bregaste osovine. Njegovo pucanje često znači katastrofalan kvar motora.

      ### Intervali zamjene
      Većina proizvođača propisuje zamjenu između 120.000 i 180.000 kilometara, ili svakih 5 do 7 godina, zavisno šta prije nastupi. U našim uslovima (gradska vožnja, prašina), preporučujemo skraćivanje ovih intervala.

      ### Simptomi kvara
      Nažalost, zupčasti remen rijetko daje upozorenja prije nego što pukne. Zato je preventivna zamjena ključna. Ipak, neki od znakova mogu biti:
      - Čudan zvuk (cviljenje) iz prednjeg dijela motora.
      - Motor se teško pali ili trza.
      - Vidljiva napuknuća na remenu (ako je dostupan pregledu).

      ### Šta uključuje veliki servis?
      Pored samog remena, obavezno se mijenjaju španeri, roleri i vodena pumpa.
    `,
    date: "20. Decembar 2023.",
    author: "Osmanović Garage Tim",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop",
    category: "Servis"
  }
];
