import type { L } from "@/i18n/config";

/**
 * PRODUCT CATEGORIES (client-supplied list).
 * Drives the home "categories" mosaic, the Products & Solutions page and the
 * quote-form options. No individual items or specifications are listed:
 * each category is quoted on request.
 * To add / reorder / rename a category, edit this array only.
 */
export type SolutionId =
  | "glassware"
  | "equipment"
  | "consumables"
  | "school-lab"
  | "furniture"
  | "cell-culture"
  | "blood-tissue"
  | "assay-kits"
  | "reagents"
  | "clinical-lab"
  | "robotics"
  | "safety"
  | "maintenance";

export type Solution = {
  id: SolutionId;
  title: L;
  summary: L;
  image: string;
  imageAlt: L;
};

const I = (n: string) => `/media/img/${n}.jpg`;

export const solutions: Solution[] = [
  {
    id: "glassware",
    title: { en: "Laboratory glassware", ar: "الزجاجيات المخبرية" },
    summary: {
      en: "Glassware for everyday laboratory work and precise volumetric measurement.",
      ar: "زجاجيات للعمل المخبري اليومي وللقياسات الحجمية الدقيقة.",
    },
    image: I("cat-glassware"),
    imageAlt: { en: "Laboratory glassware with a dropper", ar: "زجاجيات مخبرية مع قطّارة" },
  },
  {
    id: "equipment",
    title: { en: "Laboratory equipment", ar: "الأجهزة المخبرية" },
    summary: {
      en: "Instruments and equipment for research, teaching, diagnostic and quality-control laboratories.",
      ar: "أجهزة ومعدات لمختبرات البحث والتعليم والتشخيص وضبط الجودة.",
    },
    image: I("instrument-microscope"),
    imageAlt: { en: "Laboratory microscope in use", ar: "مجهر مخبري قيد الاستخدام" },
  },
  {
    id: "consumables",
    title: { en: "Laboratory consumables", ar: "المستهلكات المخبرية" },
    summary: {
      en: "The everyday supplies a laboratory runs on, delivered on a schedule you can plan around.",
      ar: "المستلزمات اليومية التي يعتمد عليها المختبر، بتوريد منتظم يمكنك التخطيط له.",
    },
    image: I("consumables-tubes"),
    imageAlt: { en: "Sample tubes being filled with a pipette", ar: "أنابيب عيّنات تُملأ بالماصّة" },
  },
  {
    id: "school-lab",
    title: { en: "School science laboratory", ar: "مختبرات العلوم المدرسية" },
    summary: {
      en: "Equipment, supplies and furniture for safe, hands-on science teaching in schools.",
      ar: "أجهزة ومستلزمات وأثاث لتعليم العلوم عمليًا وبأمان في المدارس.",
    },
    image: I("cat-school-lab"),
    imageAlt: { en: "Students and teachers in a school chemistry laboratory", ar: "طلاب ومعلمون في مختبر كيمياء مدرسي" },
  },
  {
    id: "furniture",
    title: { en: "Laboratory furniture", ar: "الأثاث المخبري" },
    summary: {
      en: "Benches, storage and fume extraction sized to your rooms and your workflow.",
      ar: "طاولات عمل وخزائن وأنظمة شفط أبخرة بمقاسات تناسب مساحتك وسير عملك.",
    },
    image: I("lab-room-bright"),
    imageAlt: { en: "Bright laboratory with workbenches", ar: "مختبر مضيء بطاولات عمل" },
  },
  {
    id: "cell-culture",
    title: { en: "Cell culture media", ar: "أوساط زراعة الخلايا" },
    summary: {
      en: "Media and supplies for cell culture and microbiology work.",
      ar: "أوساط ومستلزمات لأعمال زراعة الخلايا والأحياء الدقيقة.",
    },
    image: I("petri-dish"),
    imageAlt: { en: "Culture plates being prepared", ar: "تحضير أطباق الزراعة" },
  },
  {
    id: "blood-tissue",
    title: { en: "Blood & tissue", ar: "الدم والأنسجة" },
    summary: {
      en: "Products for the collection, processing and analysis of blood and tissue samples.",
      ar: "منتجات لجمع عيّنات الدم والأنسجة ومعالجتها وتحليلها.",
    },
    image: I("research-team-samples"),
    imageAlt: { en: "Specialists handling sample tubes", ar: "مختصتان تتعاملان مع أنابيب العيّنات" },
  },
  {
    id: "assay-kits",
    title: { en: "Assay kits", ar: "أطقم الفحوصات (Assay Kits)" },
    summary: {
      en: "Ready-to-use kits for diagnostic and research assays.",
      ar: "أطقم جاهزة للاستخدام للفحوصات التشخيصية والبحثية.",
    },
    image: I("reagents-blue"),
    imageAlt: { en: "Test tubes in a rack on a laboratory bench", ar: "أنابيب اختبار في حامل على طاولة مخبرية" },
  },
  {
    id: "reagents",
    title: { en: "Reagents & chemicals", ar: "الكواشف والمواد الكيميائية" },
    summary: {
      en: "Analytical and laboratory-grade reagents and chemicals.",
      ar: "كواشف ومواد كيميائية بدرجات تحليلية ومخبرية.",
    },
    image: I("chemist-bench"),
    imageAlt: { en: "Chemist working with reagents at a bench", ar: "كيميائي يعمل بالكواشف على طاولة مخبرية" },
  },
  {
    id: "clinical-lab",
    title: { en: "Clinical & hospital laboratory", ar: "المختبرات السريرية ومختبرات المستشفيات" },
    summary: {
      en: "Equipment and supplies for diagnostic laboratories in hospitals and clinics.",
      ar: "أجهزة ومستلزمات لمختبرات التشخيص في المستشفيات والعيادات.",
    },
    image: I("lab-bench-microscopy"),
    imageAlt: { en: "Laboratory specialist at a microscope", ar: "مختصة مخبرية أمام المجهر" },
  },
  {
    id: "robotics",
    title: { en: "Robotics & electronics", ar: "الروبوتات والإلكترونيات" },
    summary: {
      en: "Robotics and electronics kits for STEM education and hands-on learning.",
      ar: "أطقم روبوتات وإلكترونيات لتعليم العلوم والتكنولوجيا والتعلّم العملي.",
    },
    image: I("cat-robotics"),
    imageAlt: { en: "Teacher explaining a robotic arm to students", ar: "معلم يشرح آلية ذراع روبوتية للطلاب" },
  },
  {
    id: "safety",
    title: { en: "Safety kits", ar: "أدوات ومعدات السلامة" },
    summary: {
      en: "Personal protective equipment and safety supplies for laboratory work.",
      ar: "معدات الوقاية الشخصية ومستلزمات السلامة للعمل المخبري.",
    },
    image: I("cat-safety"),
    imageAlt: { en: "Researcher in full protective clothing", ar: "باحث يرتدي لباس الوقاية الكامل" },
  },
  {
    id: "maintenance",
    title: { en: "Maintenance", ar: "الصيانة" },
    summary: {
      en: "Installation, preventive maintenance and after-sales service for laboratory equipment.",
      ar: "التركيب والصيانة الوقائية وخدمة ما بعد البيع للأجهزة المخبرية.",
    },
    image: I("lab-equipment-operator"),
    imageAlt: { en: "Technician operating laboratory equipment", ar: "فنية تشغّل جهازًا مخبريًا" },
  },
];

export const solutionById = Object.fromEntries(solutions.map((s) => [s.id, s])) as Record<SolutionId, Solution>;

/**
 * Commitments — written as operational practices, not claims.
 * CONFIRM WITH CLIENT before launch: each row should describe something the
 * company actually does on every project.
 */
export const commitments: { title: L; practice: L }[] = [
  {
    title: { en: "Named, documented products", ar: "منتجات محددة وموثّقة" },
    practice: {
      en: "Every quotation names the manufacturer and model, with documentation and warranty terms in writing. Nothing generic, nothing unnamed.",
      ar: "يذكر كل عرض سعر الشركة المصنّعة والطراز، مع الوثائق وشروط الضمان كتابيًا. لا منتجات عامة، ولا أسماء مجهولة.",
    },
  },
  {
    title: { en: "Specialist review", ar: "مراجعة متخصصة" },
    practice: {
      en: "A specialist checks every request against your methods, volumes and standards before anything is priced.",
      ar: "يراجع أحد المختصين كل طلب وفق طرق عملك وحجم العمل والمعايير المعتمدة، قبل تسعير أي شيء.",
    },
  },
  {
    title: { en: "Support built into the order", ar: "دعم جزء من الطلب" },
    practice: {
      en: "Installation, user training and after-sales service are planned with the purchase — not arranged once the boxes arrive.",
      ar: "يُخطَّط للتركيب وتدريب المستخدمين وخدمة ما بعد البيع مع الشراء — لا بعد وصول الشحنة.",
    },
  },
  {
    title: { en: "One accountable team", ar: "فريق واحد مسؤول" },
    practice: {
      en: "From layout drawings to commissioning, one team, one schedule and one point of contact carry your project.",
      ar: "من المخططات حتى التشغيل، يتولى مشروعك فريق واحد، بجدول زمني واحد، وجهة تواصل واحدة.",
    },
  },
  {
    title: { en: "Dependable supply", ar: "توريد يُعتمد عليه" },
    practice: {
      en: "Lead times are confirmed in every quotation, and recurring consumables can be scheduled so your work never pauses.",
      ar: "تُؤكَّد مدد التوريد في كل عرض سعر، ويمكن جدولة المستهلكات الدورية حتى لا يتوقف عملك.",
    },
  },
  {
    title: { en: "Advice shaped around you", ar: "استشارة على مقاسك" },
    practice: {
      en: "Recommendations start from your workflow, budget and procurement rules — with the trade-offs explained, so you decide with confidence.",
      ar: "تنطلق توصياتنا من سير عملك وميزانيتك وأنظمة الشراء لديك — مع توضيح الفروق بين الخيارات، لتتخذ قرارك بثقة.",
    },
  },
];
