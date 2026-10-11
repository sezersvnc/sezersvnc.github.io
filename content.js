// ─────────────────────────────────────────────────────────────
//  Sitenin TÜM içeriği burada. Sadece bu dosyayı düzenlemen yeterli.
//  "key" alanları sağdaki JSON panelinde alan adı olarak görünür.
// ─────────────────────────────────────────────────────────────
window.PORTFOLIO = {
  name: "Sezer",
  surname: "Sevinç",
  role: "Backend & Veri Geliştirici",
  location: "Düzce, Türkiye",
  timezone: "Europe/Istanbul",
  email: "sezer.svnc67@gmail.com",

  available: true,
  availability: "Staj ve iş fırsatlarına açığım",

  intro:
    "Düzce Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. " +
    "Sağlam, ölçeklenebilir backend sistemleri ve veri odaklı çözümler geliştirmeye odaklanıyorum.",

  about: [
    "Kendimi backend ve veri tarafında geliştiriyor, işin görünmeyen ama her şeyi ayakta tutan kısmıyla uğraşmayı seviyorum. Şu sıralar .NET ve Docker üzerine yoğunlaşıyorum.",
    "Eğitimimi %100 İngilizce alıyorum; bu sayede İngilizcem ve teknik temelim sağlam. Dokümantasyon okumak, uluslararası kaynaklardan öğrenmek ve İngilizce çalışılan ekiplerde yer almak benim için doğal.",
  ],

  facts: [
    { key: "location", label: "Konum", value: "Düzce" },
    { key: "school", label: "Okul", value: "Düzce Üniversitesi" },
    { key: "department", label: "Bölüm", value: "Bilgisayar Mühendisliği" },
    { key: "teachingLanguage", label: "Eğitim dili", value: "%100 İngilizce" },
    { key: "languages", label: "Diller", value: ["Türkçe", "İngilizce"] },
  ],

  skills: [
    { key: "backend", group: "Backend", items: [".NET", "Django", "REST API"] },
    { key: "data", group: "Veri", items: ["Python"] },
    { key: "frontend", group: "Frontend", items: ["Next.js", "React", "TypeScript", "JavaScript", "Vite", "HTML", "CSS"] },
    { key: "tools", group: "Araçlar", items: ["Docker"] },
  ],

  projects: [
    {
      id: "pikwise",
      title: "Pikwise",
      year: "",
      status: "geliştiriliyor",
      tags: [".NET 10", "React", "Vite", "TypeScript"],
      image: "",                        // Görsel hazır olunca: "assets/pikwise.png"
      description:
        "Şu anda aktif olarak geliştirdiğim proje. Backend tarafı .NET 10 ile, " +
        "arayüzü React, Vite ve TypeScript ile yazıyorum.",
      links: [],
    },
    {
      id: "sezeritma",
      title: "Sezeritma",
      year: "",
      status: "tamamlandı",
      tags: ["TypeScript", "JavaScript"],
      image: "assets/sezeritma.png",
      description:
        "Programlama mantığını oyunlaştırarak öğreten bir bulmaca oyunu. Oyuncu, C++ benzeri komutlar " +
        "(ilerle, sagaDon, kap) ve while / if / for gibi yapılarla fabrikadaki robotu yönetip çikolataları toplar. " +
        "Her bölümde yeni bir kavram açılıyor; kod adım adım ya da hızlı çalıştırılıp sonuç ızgarada izlenebiliyor.",
      links: [],
    },
    {
      id: "eticaret-api",
      title: "E-Ticaret API",
      year: "",
      status: "tamamlandı",
      tags: ["Python", "Django", "REST"],
      image: "",
      description: "Python ve Django ile geliştirdiğim RESTful bir e-ticaret API'si.",
      links: [],
    },
    {
      id: "qline-studio",
      title: "Q-Line Studio",
      year: "",
      status: "tamamlandı",
      tags: ["HTML", "CSS"],
      image: "assets/qline-games.webp",
      description:
        "Yazılıma ilk başladığım dönemde yaptığım hayali bir oyun stüdyosu sitesi. " +
        "Oyun vitrini, ekip sayfası, açık/koyu tema ve oyun türüne göre tahmini maliyet hesaplayan bir sayfa içeriyor.",
      links: [],
    },
  ],

  experience: [
    {
      start: "27 Tem",
      end: "28 Ağu",
      role: "Stajyer Bilgisayar Mühendisi",
      company: "Nestlé",
      type: "staj",
      description: "Nestlé'de bir aylık bilgisayar mühendisliği stajı.",
    },
    {
      start: "",
      end: "devam ediyor",
      role: "Computer Engineering (Lisans)",
      company: "Düzce Üniversitesi",
      type: "eğitim",
      description: "%100 İngilizce eğitim. Backend geliştirme ve veri alanlarında kendimi geliştiriyorum.",
    },
  ],

  socials: [
    { key: "github", label: "GitHub", url: "https://github.com/sezersvnc" },
    { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/sezer-sevinç-147a9328a" },
  ],

  // Formun mesajı doğrudan sana e-posta olarak göndermesi için (opsiyonel):
  // Formspree (https://formspree.io) → "https://formspree.io/f/XXXXXXX"
  // Boş bırakırsan "Gönder", ziyaretçinin e-posta uygulamasını dolu şekilde açar.
  formEndpoint: "https://formspree.io/f/xrpelzzq",
  formExtra: {},                        // Web3Forms kullanırsan: { access_key: "..." }
};
