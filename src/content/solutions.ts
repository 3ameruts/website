import type { L } from "@/i18n/config";

/**
 * The eight solution areas. They drive the home "Solutions index", the
 * catalog categories and the quote-form "interest" options.
 * Order matters: medical sits in the first rows so hospital buyers see
 * themselves immediately.
 */
export type SolutionId =
  | "medical"
  | "lab-equipment"
  | "instruments"
  | "consumables"
  | "furniture"
  | "setup"
  | "design"
  | "research";

export type Solution = {
  id: SolutionId;
  title: L;
  summary: L;
  image: string;
  imageAlt: L;
  /** Where the row links to. */
  href: "/products" | "/laboratory-solutions";
};

export const solutions: Solution[] = [
  {
    id: "medical",
    title: { en: "Medical equipment & supplies", ar: "الأجهزة والمستلزمات الطبية" },
    summary: {
      en: "Patient monitoring, diagnostic devices, clinical instruments and medical disposables for hospitals and clinics.",
      ar: "أجهزة مراقبة المرضى، وأجهزة التشخيص، والأدوات السريرية، والمستهلكات الطبية للمستشفيات والعيادات.",
    },
    image: "/media/img/medical-monitor.jpg",
    imageAlt: { en: "Patient monitor at a hospital bedside", ar: "جهاز مراقبة مريض بجانب سرير في مستشفى" },
    href: "/products",
  },
  {
    id: "lab-equipment",
    title: { en: "Laboratory equipment", ar: "الأجهزة المخبرية" },
    summary: {
      en: "Centrifuges, balances, incubators, cold storage, safety cabinets and sterilisation — the working core of every lab.",
      ar: "أجهزة الطرد المركزي، والموازين، والحاضنات، والتبريد، وخزائن السلامة الحيوية، والتعقيم — أساس العمل في كل مختبر.",
    },
    image: "/media/img/lab-equipment-operator.jpg",
    imageAlt: { en: "Technician operating laboratory equipment in a clean room", ar: "فنية تشغّل جهازًا مخبريًا في غرفة نظيفة" },
    href: "/products",
  },
  {
    id: "instruments",
    title: { en: "Scientific instruments", ar: "الأجهزة العلمية" },
    summary: {
      en: "Microscopy, spectrophotometry, analytical meters and diagnostic analysers, matched to the methods you run.",
      ar: "المجاهر، وأجهزة القياس الطيفي، وأجهزة التحليل والقياس، والمحلّلات التشخيصية، بما يتوافق مع طرق العمل لديك.",
    },
    image: "/media/img/instrument-microscope.jpg",
    imageAlt: { en: "Laboratory microscope with a sample being prepared", ar: "مجهر مخبري أثناء تحضير عيّنة" },
    href: "/products",
  },
  {
    id: "consumables",
    title: { en: "Laboratory consumables", ar: "المستهلكات المخبرية" },
    summary: {
      en: "Pipettes and tips, tubes, culture media, glassware, reagents and protective equipment — supplied on a schedule you can plan around.",
      ar: "الماصّات ورؤوسها، والأنابيب، والأوساط الزرعية، والزجاجيات، والكواشف، ومعدات الوقاية — بتوريد منتظم يمكنك التخطيط له.",
    },
    image: "/media/img/consumables-tubes.jpg",
    imageAlt: { en: "Rows of sample tubes being filled with a pipette", ar: "صفوف من أنابيب العيّنات تُملأ بالماصّة" },
    href: "/products",
  },
  {
    id: "furniture",
    title: { en: "Laboratory furniture", ar: "الأثاث المخبري" },
    summary: {
      en: "Benches, workstations, storage, fume extraction and wash stations, sized to your rooms and your workflow.",
      ar: "طاولات العمل، ومحطات العمل، والخزائن، وأنظمة شفط الأبخرة، ومحطات الغسيل، بمقاسات تناسب مساحتك وسير عملك.",
    },
    image: "/media/img/lab-room-bright.jpg",
    imageAlt: { en: "Bright laboratory with benches and a microscope workstation", ar: "مختبر مضيء بطاولات عمل ومحطة مجهر" },
    href: "/products",
  },
  {
    id: "setup",
    title: { en: "Complete laboratory setup", ar: "تجهيز المختبرات المتكاملة" },
    summary: {
      en: "Clinical, research, teaching, quality-control and microbiology laboratories delivered as one coordinated package.",
      ar: "مختبرات سريرية وبحثية وتعليمية ومختبرات ضبط الجودة والأحياء الدقيقة، تُسلَّم كحزمة واحدة متكاملة.",
    },
    image: "/media/img/facility-review.jpg",
    imageAlt: { en: "Two engineers reviewing a laboratory facility", ar: "مهندسان يراجعان منشأة مخبرية" },
    href: "/laboratory-solutions",
  },
  {
    id: "design",
    title: { en: "Laboratory design & installation", ar: "تصميم المختبرات وتركيبها" },
    summary: {
      en: "Layout planning, utilities coordination, installation, commissioning and user training — from drawing to first sample.",
      ar: "تخطيط المساحات، وتنسيق الخدمات، والتركيب، والتشغيل التجريبي، وتدريب المستخدمين — من المخطط حتى أول عيّنة.",
    },
    image: "/media/img/infrastructure-pipes.jpg",
    imageAlt: { en: "Engineers inspecting laboratory service pipework", ar: "مهندسون يتفقدون تمديدات الخدمات في مختبر" },
    href: "/laboratory-solutions",
  },
  {
    id: "research",
    title: { en: "Research & scientific solutions", ar: "حلول البحث العلمي" },
    summary: {
      en: "Equipment and workflow advice for molecular biology, cell culture and applied research groups.",
      ar: "أجهزة واستشارات لسير العمل في مجالات البيولوجيا الجزيئية، وزراعة الخلايا، والبحث التطبيقي.",
    },
    image: "/media/img/research-team-samples.jpg",
    imageAlt: { en: "Researchers handling samples at a microscope", ar: "باحثتان تتعاملان مع العيّنات بجانب مجهر" },
    href: "/products",
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
    title: { en: "Product quality", ar: "جودة المنتجات" },
    practice: {
      en: "Every item is quoted with its manufacturer, model, documentation and warranty terms stated in writing — nothing generic, nothing unnamed.",
      ar: "يُسعَّر كل منتج مع ذكر الشركة المصنّعة والطراز والوثائق وشروط الضمان كتابيًا — لا منتجات مجهولة أو غير محددة.",
    },
  },
  {
    title: { en: "Technical expertise", ar: "الخبرة الفنية" },
    practice: {
      en: "A specialist reviews each request against your methods, sample volumes and standards before anything is quoted.",
      ar: "يراجع أحد المختصين كل طلب وفق طرق العمل لديك وحجم العيّنات والمعايير المعتمدة قبل تقديم أي عرض سعر.",
    },
  },
  {
    title: { en: "Professional support", ar: "الدعم المهني" },
    practice: {
      en: "Installation, user training and after-sales service are planned with the purchase, not arranged after delivery.",
      ar: "يُخطَّط للتركيب وتدريب المستخدمين وخدمة ما بعد البيع مع عملية الشراء، لا بعد التسليم.",
    },
  },
  {
    title: { en: "Complete laboratory solutions", ar: "حلول مخبرية متكاملة" },
    practice: {
      en: "One team carries a project from layout drawings to commissioning: one point of contact, one schedule, one accountable partner.",
      ar: "فريق واحد يتولى المشروع من المخططات حتى التشغيل: جهة تواصل واحدة، وجدول زمني واحد، وشريك واحد مسؤول.",
    },
  },
  {
    title: { en: "Reliable supply", ar: "توريد موثوق" },
    practice: {
      en: "Lead times are confirmed in the quotation, and recurring consumables can be scheduled so your lab never runs short.",
      ar: "تُؤكَّد مدد التوريد في عرض السعر، ويمكن جدولة المستهلكات الدورية حتى لا ينفد مخزون مختبرك.",
    },
  },
  {
    title: { en: "Customer-centred service", ar: "خدمة محورها العميل" },
    practice: {
      en: "Recommendations start from your workflow, budget and procurement rules — and we explain the trade-offs between options.",
      ar: "تنطلق توصياتنا من سير عملك وميزانيتك وأنظمة الشراء لديك — ونوضّح لك الفروق بين الخيارات المتاحة.",
    },
  },
];
