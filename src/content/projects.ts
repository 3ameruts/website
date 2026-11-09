import type { L } from "@/i18n/config";

/**
 * PROJECTS — ALL ENTRIES BELOW ARE DEMO CONTENT.
 * ───────────────────────────────────────────────
 * They illustrate the kind of work the company delivers and how a case study
 * is presented. They are NOT real projects, clients or locations.
 * Replace each entry with a real, client-approved case study (or delete it)
 * and set `demo: false`. Images are licensed stock footage stills.
 */
export type ProjectSector = "healthcare" | "education" | "research" | "industry";

export const projectSectors: Record<ProjectSector, L> = {
  healthcare: { en: "Healthcare", ar: "الرعاية الصحية" },
  education: { en: "Education", ar: "التعليم" },
  research: { en: "Research", ar: "البحث العلمي" },
  industry: { en: "Industry", ar: "الصناعة" },
};

export type Project = {
  slug: string;
  demo: boolean;
  sector: ProjectSector;
  title: L;
  summary: L;
  client: L;
  location: L;
  year: string;
  scope: L[];
  body: L[];
  cover: string;
  gallery: { src: string; alt: L }[];
};

const I = (n: string) => `/media/img/${n}.jpg`;
const placeholderClient: L = { en: "Client name — to be provided", ar: "اسم الجهة — يُضاف لاحقًا" };
const placeholderLocation: L = { en: "Location — to be provided", ar: "الموقع — يُضاف لاحقًا" };

export const projects: Project[] = [
  {
    slug: "hospital-clinical-laboratory",
    demo: true,
    sector: "healthcare",
    title: { en: "Hospital clinical laboratory fit-out", ar: "تجهيز مختبر سريري في مستشفى" },
    summary: {
      en: "An example of a complete diagnostic laboratory: layout, furniture, analysers, cold chain and staff training.",
      ar: "مثال على مختبر تشخيصي متكامل: التوزيع، والأثاث، والمحلّلات، وسلسلة التبريد، وتدريب الكوادر.",
    },
    client: placeholderClient,
    location: placeholderLocation,
    year: "—",
    scope: [
      { en: "Layout design", ar: "تصميم التوزيع" },
      { en: "Laboratory furniture", ar: "الأثاث المخبري" },
      { en: "Analysers & equipment", ar: "المحلّلات والأجهزة" },
      { en: "Installation & training", ar: "التركيب والتدريب" },
    ],
    body: [
      {
        en: "This sample case study shows how a hospital laboratory project is documented on this site. Replace it with a real project: describe the starting point, the constraints (space, schedule, standards), the solution delivered and what the laboratory can now do.",
        ar: "توضّح دراسة الحالة التجريبية هذه طريقة عرض مشاريع مختبرات المستشفيات في هذا الموقع. استبدلها بمشروع حقيقي: صف نقطة البداية، والقيود (المساحة، والجدول الزمني، والمعايير)، والحل المنفّذ، وما أصبح المختبر قادرًا على إنجازه.",
      },
      {
        en: "Typical scope for this type of project: zoning of pre-analytical, analytical and post-analytical areas; benches with service spines; analyser installation and interfacing; refrigeration for reagents and samples; handover with user training.",
        ar: "النطاق المعتاد لهذا النوع من المشاريع: تقسيم مناطق ما قبل التحليل والتحليل وما بعده، وطاولات بقنوات خدمات، وتركيب المحلّلات وربطها، والتبريد للكواشف والعيّنات، والتسليم مع تدريب المستخدمين.",
      },
    ],
    cover: I("lab-bench-microscopy"),
    gallery: [
      { src: I("lab-bench-microscopy"), alt: { en: "Laboratory workstation with microscope", ar: "محطة عمل مخبرية مع مجهر" } },
      { src: I("vital-signs"), alt: { en: "Clinical monitoring equipment", ar: "أجهزة مراقبة سريرية" } },
      { src: I("reagents-blue"), alt: { en: "Reagent tubes on a bench", ar: "أنابيب كواشف على طاولة عمل" } },
      { src: I("lab-corridor"), alt: { en: "Laboratory corridor with equipment cabinets", ar: "ممر مخبري مع خزائن الأجهزة" } },
    ],
  },
  {
    slug: "university-teaching-laboratory",
    demo: true,
    sector: "education",
    title: { en: "University teaching laboratory", ar: "مختبر تعليمي جامعي" },
    summary: {
      en: "An example of a student laboratory planned for safety, supervision and durable everyday use.",
      ar: "مثال على مختبر للطلاب مخطط للسلامة وسهولة الإشراف والاستخدام اليومي المتين.",
    },
    client: placeholderClient,
    location: placeholderLocation,
    year: "—",
    scope: [
      { en: "Student workstations", ar: "محطات عمل الطلاب" },
      { en: "Microscopes", ar: "المجاهر" },
      { en: "Fume extraction", ar: "شفط الأبخرة" },
      { en: "Safety equipment", ar: "معدات السلامة" },
    ],
    body: [
      {
        en: "Sample case study. Replace with a real teaching-lab project: number of student places, subjects taught, how supervision sightlines and safety were handled, and the equipment supplied.",
        ar: "دراسة حالة تجريبية. استبدلها بمشروع مختبر تعليمي حقيقي: عدد مقاعد الطلاب، والمواد التي تُدرَّس، وكيفية مراعاة خطوط الرؤية للإشراف والسلامة، والأجهزة الموردة.",
      },
    ],
    cover: I("lab-analysis"),
    gallery: [
      { src: I("lab-analysis"), alt: { en: "Student workstation with microscope", ar: "محطة عمل طالب مع مجهر" } },
      { src: I("microscopy-closeup"), alt: { en: "Microscope in use", ar: "مجهر قيد الاستخدام" } },
      { src: I("lab-room-bright"), alt: { en: "Bright teaching laboratory", ar: "مختبر تعليمي مضيء" } },
    ],
  },
  {
    slug: "research-core-facility",
    demo: true,
    sector: "research",
    title: { en: "Research core facility", ar: "مرفق بحثي مركزي" },
    summary: {
      en: "An example of a shared research space combining containment, cell culture and imaging.",
      ar: "مثال على مساحة بحثية مشتركة تجمع بين الاحتواء وزراعة الخلايا والتصوير المجهري.",
    },
    client: placeholderClient,
    location: placeholderLocation,
    year: "—",
    scope: [
      { en: "Biosafety cabinets", ar: "خزائن السلامة الحيوية" },
      { en: "Cell culture", ar: "زراعة الخلايا" },
      { en: "Imaging", ar: "التصوير المجهري" },
      { en: "Commissioning", ar: "التشغيل التجريبي" },
    ],
    body: [
      {
        en: "Sample case study. Replace with a real research facility: the research groups served, the workflows the space supports, and how equipment was selected and commissioned.",
        ar: "دراسة حالة تجريبية. استبدلها بمرفق بحثي حقيقي: المجموعات البحثية المستفيدة، وسير العمل الذي تدعمه المساحة، وكيفية اختيار الأجهزة وتشغيلها.",
      },
    ],
    cover: I("microscope-navy"),
    gallery: [
      { src: I("microscope-navy"), alt: { en: "Researcher at a microscope", ar: "باحثة أمام مجهر" } },
      { src: I("research-team-samples"), alt: { en: "Researchers preparing samples", ar: "باحثتان تحضّران العيّنات" } },
      { src: I("sample-slide"), alt: { en: "Microscope slide being handled", ar: "شريحة مجهرية أثناء التعامل معها" } },
      { src: I("microscope-detail"), alt: { en: "Microscope objective detail", ar: "تفاصيل عدسات المجهر" } },
    ],
  },
  {
    slug: "quality-control-laboratory",
    demo: true,
    sector: "industry",
    title: { en: "Industrial quality-control laboratory", ar: "مختبر ضبط جودة صناعي" },
    summary: {
      en: "An example of a QC laboratory built around analytical instruments, controlled storage and clean workflows.",
      ar: "مثال على مختبر ضبط جودة قائم على أجهزة التحليل والتخزين المضبوط وسير عمل نظيف.",
    },
    client: placeholderClient,
    location: placeholderLocation,
    year: "—",
    scope: [
      { en: "Analytical instruments", ar: "أجهزة التحليل" },
      { en: "Balances", ar: "الموازين" },
      { en: "Utilities coordination", ar: "تنسيق الخدمات" },
      { en: "Furniture", ar: "الأثاث" },
    ],
    body: [
      {
        en: "Sample case study. Replace with a real QC laboratory: products tested, methods supported, and the infrastructure delivered.",
        ar: "دراسة حالة تجريبية. استبدلها بمختبر ضبط جودة حقيقي: المنتجات التي تُفحص، والطرق المدعومة، والبنية التحتية المنفّذة.",
      },
    ],
    cover: I("infrastructure-pipes"),
    gallery: [
      { src: I("infrastructure-pipes"), alt: { en: "Engineers reviewing service pipework", ar: "مهندسون يراجعون تمديدات الخدمات" } },
      { src: I("facility-review"), alt: { en: "Facility walkthrough", ar: "جولة في المنشأة" } },
      { src: I("chemist-bench"), alt: { en: "Analyst at a laboratory bench", ar: "محلل على طاولة مخبرية" } },
    ],
  },
  {
    slug: "clinic-medical-equipment",
    demo: true,
    sector: "healthcare",
    title: { en: "Outpatient clinic equipment supply", ar: "توريد أجهزة لعيادات خارجية" },
    summary: {
      en: "An example of equipping consultation and procedure rooms with monitoring devices and clinical instruments.",
      ar: "مثال على تجهيز غرف الفحص والإجراءات بأجهزة المراقبة والأدوات السريرية.",
    },
    client: placeholderClient,
    location: placeholderLocation,
    year: "—",
    scope: [
      { en: "Patient monitoring", ar: "مراقبة المرضى" },
      { en: "Clinical instruments", ar: "الأدوات السريرية" },
      { en: "Medical disposables", ar: "المستهلكات الطبية" },
    ],
    body: [
      {
        en: "Sample case study. Replace with a real medical-equipment supply project: rooms equipped, devices supplied, training and service arrangements.",
        ar: "دراسة حالة تجريبية. استبدلها بمشروع توريد أجهزة طبية حقيقي: الغرف المجهزة، والأجهزة الموردة، وترتيبات التدريب والصيانة.",
      },
    ],
    cover: I("medical-monitor"),
    gallery: [
      { src: I("medical-monitor"), alt: { en: "Patient monitor", ar: "جهاز مراقبة مريض" } },
      { src: I("surgical-instruments"), alt: { en: "Surgical instruments on a tray", ar: "أدوات جراحية على صينية" } },
      { src: I("vital-signs"), alt: { en: "Vital signs on a monitor", ar: "العلامات الحيوية على شاشة" } },
    ],
  },
  {
    slug: "microbiology-suite",
    demo: true,
    sector: "research",
    title: { en: "Microbiology suite", ar: "جناح الأحياء الدقيقة" },
    summary: {
      en: "An example of a microbiology workflow: media preparation, incubation, containment and sterilisation.",
      ar: "مثال على سير عمل الأحياء الدقيقة: تحضير الأوساط، والحضانة، والاحتواء، والتعقيم.",
    },
    client: placeholderClient,
    location: placeholderLocation,
    year: "—",
    scope: [
      { en: "Containment", ar: "الاحتواء" },
      { en: "Incubation", ar: "الحضانة" },
      { en: "Sterilisation", ar: "التعقيم" },
      { en: "Consumables supply", ar: "توريد المستهلكات" },
    ],
    body: [
      {
        en: "Sample case study. Replace with a real microbiology project and describe how the workflow was separated from clean to dirty areas.",
        ar: "دراسة حالة تجريبية. استبدلها بمشروع حقيقي للأحياء الدقيقة، ووضّح كيف فُصل سير العمل بين المناطق النظيفة والملوثة.",
      },
    ],
    cover: I("petri-dish"),
    gallery: [
      { src: I("petri-dish"), alt: { en: "Culture plates being prepared", ar: "تحضير أطباق الزراعة" } },
      { src: I("consumables-tubes"), alt: { en: "Sample tubes in a rack", ar: "أنابيب عيّنات في حامل" } },
      { src: I("lab-equipment-operator"), alt: { en: "Operator at containment equipment", ar: "فنية تعمل على جهاز احتواء" } },
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
