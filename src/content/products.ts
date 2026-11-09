import type { L } from "@/i18n/config";
import type { SolutionId } from "./solutions";

/**
 * PRODUCT CATALOG
 * ────────────────
 * These are product *types* the company supplies, not specific models.
 * No technical values are invented: each product lists the specification
 * *fields* a buyer should expect, and every value is shown as
 * "Confirmed per model" until real manufacturer data is added.
 *
 * To add real data, give a product `specs: [{ key, value: { en, ar } }]`.
 */

export const specLabels = {
  capacity: { en: "Capacity", ar: "السعة" },
  speed: { en: "Speed range", ar: "نطاق السرعة" },
  rotors: { en: "Rotor options", ar: "خيارات الدوّار" },
  temperature: { en: "Temperature range", ar: "نطاق الحرارة" },
  readability: { en: "Readability", ar: "دقة القراءة" },
  volume: { en: "Volume range", ar: "نطاق الحجم" },
  dimensions: { en: "Dimensions", ar: "الأبعاد" },
  material: { en: "Material", ar: "المادة" },
  power: { en: "Power supply", ar: "مصدر الطاقة" },
  parameters: { en: "Measured parameters", ar: "المؤشرات المقاسة" },
  display: { en: "Display", ar: "الشاشة" },
  connectivity: { en: "Connectivity", ar: "الاتصال" },
  classification: { en: "Safety classification", ar: "تصنيف السلامة" },
  airflow: { en: "Airflow", ar: "تدفق الهواء" },
  optics: { en: "Optics", ar: "البصريات" },
  magnification: { en: "Magnification", ar: "التكبير" },
  wavelength: { en: "Wavelength range", ar: "نطاق الطول الموجي" },
  sterility: { en: "Sterility", ar: "التعقيم" },
  packSize: { en: "Pack size", ar: "حجم العبوة" },
  grade: { en: "Grade", ar: "الدرجة" },
  certification: { en: "Certification", ar: "الشهادات" },
  loadRating: { en: "Load rating", ar: "الحمولة القصوى" },
  finish: { en: "Worktop finish", ar: "سطح العمل" },
  throughput: { en: "Throughput", ar: "الإنتاجية" },
  chambers: { en: "Chamber size", ar: "حجم الحجرة" },
  cycles: { en: "Cycle programmes", ar: "برامج الدورات" },
  deliverables: { en: "Deliverables", ar: "المخرجات" },
  duration: { en: "Typical duration", ar: "المدة المعتادة" },
  scope: { en: "Scope", ar: "النطاق" },
} satisfies Record<string, L>;

export type SpecKey = keyof typeof specLabels;

export type Subcategory = { id: string; category: SolutionId; title: L };

export const subcategories: Subcategory[] = [
  { id: "patient-monitoring", category: "medical", title: { en: "Patient monitoring", ar: "مراقبة المرضى" } },
  { id: "diagnostic", category: "medical", title: { en: "Diagnostic devices", ar: "أجهزة التشخيص" } },
  { id: "clinical-instruments", category: "medical", title: { en: "Clinical instruments", ar: "الأدوات السريرية" } },
  { id: "medical-disposables", category: "medical", title: { en: "Medical disposables", ar: "المستهلكات الطبية" } },

  { id: "sample-prep", category: "lab-equipment", title: { en: "Sample preparation", ar: "تحضير العيّنات" } },
  { id: "temperature", category: "lab-equipment", title: { en: "Temperature control", ar: "التحكم بالحرارة" } },
  { id: "safety", category: "lab-equipment", title: { en: "Safety & sterilisation", ar: "السلامة والتعقيم" } },

  { id: "microscopy", category: "instruments", title: { en: "Microscopy", ar: "المجاهر" } },
  { id: "analytical", category: "instruments", title: { en: "Analytical instruments", ar: "أجهزة التحليل" } },

  { id: "liquid-handling", category: "consumables", title: { en: "Liquid handling", ar: "نقل السوائل" } },
  { id: "labware", category: "consumables", title: { en: "Labware & glassware", ar: "الأدوات والزجاجيات" } },
  { id: "reagents", category: "consumables", title: { en: "Reagents & media", ar: "الكواشف والأوساط" } },
  { id: "ppe", category: "consumables", title: { en: "Protective equipment", ar: "معدات الوقاية" } },

  { id: "benches", category: "furniture", title: { en: "Benches & workstations", ar: "طاولات ومحطات العمل" } },
  { id: "storage", category: "furniture", title: { en: "Storage & extraction", ar: "التخزين والشفط" } },

  { id: "lab-packages", category: "setup", title: { en: "Laboratory packages", ar: "حزم المختبرات" } },

  { id: "services", category: "design", title: { en: "Services", ar: "الخدمات" } },

  { id: "life-science", category: "research", title: { en: "Life-science research", ar: "أبحاث علوم الحياة" } },
  { id: "advisory", category: "research", title: { en: "Advisory", ar: "الاستشارات" } },
];

export type Product = {
  id: string;
  category: SolutionId;
  subcategory: string;
  name: L;
  summary: L;
  image: string;
  specFields: SpecKey[];
  /** Optional real data — leave undefined until supplied by the client. */
  specs?: { key: SpecKey; value: L }[];
  keywords?: string;
};

const I = (n: string) => `/media/img/${n}.jpg`;

export const products: Product[] = [
  // ── Medical ───────────────────────────────────────────────────────────
  {
    id: "patient-monitors",
    category: "medical",
    subcategory: "patient-monitoring",
    name: { en: "Patient monitors", ar: "أجهزة مراقبة المرضى" },
    summary: {
      en: "Bedside and transport monitors for continuous observation in wards, ICUs and emergency departments.",
      ar: "أجهزة مراقبة بجانب السرير وأثناء النقل للمتابعة المستمرة في الأقسام والعناية المركزة والطوارئ.",
    },
    image: I("vital-signs"),
    specFields: ["parameters", "display", "connectivity", "power"],
    keywords: "monitor icu ecg spo2 nibp vital",
  },
  {
    id: "vital-signs-monitors",
    category: "medical",
    subcategory: "patient-monitoring",
    name: { en: "Vital signs monitors", ar: "أجهزة قياس العلامات الحيوية" },
    summary: {
      en: "Compact spot-check monitors for outpatient clinics, triage and general wards.",
      ar: "أجهزة قياس مدمجة للفحص السريع في العيادات الخارجية والفرز والأقسام العامة.",
    },
    image: I("medical-monitor"),
    specFields: ["parameters", "display", "connectivity", "power"],
    keywords: "blood pressure temperature spo2",
  },
  {
    id: "ecg",
    category: "medical",
    subcategory: "diagnostic",
    name: { en: "Electrocardiographs (ECG)", ar: "أجهزة تخطيط القلب" },
    summary: {
      en: "Resting ECG systems for clinics and hospital departments, with reporting and data export options.",
      ar: "أجهزة تخطيط القلب أثناء الراحة للعيادات وأقسام المستشفيات، مع خيارات التقارير وتصدير البيانات.",
    },
    image: I("vital-signs"),
    specFields: ["parameters", "display", "connectivity", "power"],
    keywords: "ecg ekg cardiology heart",
  },
  {
    id: "infusion-pumps",
    category: "medical",
    subcategory: "diagnostic",
    name: { en: "Infusion & syringe pumps", ar: "مضخات التسريب والحقن" },
    summary: {
      en: "Volumetric and syringe pumps for controlled delivery of fluids and medication.",
      ar: "مضخات حجمية ومضخات حقن لإيصال السوائل والأدوية بدقة وتحكم.",
    },
    image: I("medical-monitor"),
    specFields: ["volume", "display", "power", "connectivity"],
    keywords: "infusion syringe pump iv",
  },
  {
    id: "surgical-instruments",
    category: "medical",
    subcategory: "clinical-instruments",
    name: { en: "Surgical & examination instruments", ar: "الأدوات الجراحية وأدوات الفحص" },
    summary: {
      en: "Stainless-steel instrument sets and examination tools for theatres, clinics and procedure rooms.",
      ar: "أطقم أدوات من الفولاذ المقاوم للصدأ وأدوات فحص لغرف العمليات والعيادات وغرف الإجراءات.",
    },
    image: I("surgical-instruments"),
    specFields: ["material", "sterility", "packSize"],
    keywords: "forceps scissors scalpel surgical set",
  },
  {
    id: "medical-disposables",
    category: "medical",
    subcategory: "medical-disposables",
    name: { en: "Medical disposables", ar: "المستهلكات الطبية" },
    summary: {
      en: "Syringes, needles, IV sets, dressings and other single-use items for daily clinical work.",
      ar: "المحاقن، والإبر، وأطقم التسريب الوريدي، والضمادات، وغيرها من المستلزمات أحادية الاستخدام.",
    },
    image: I("droplet"),
    specFields: ["sterility", "packSize", "certification"],
    keywords: "syringe needle iv set dressing disposable",
  },

  // ── Laboratory equipment ─────────────────────────────────────────────
  {
    id: "centrifuges",
    category: "lab-equipment",
    subcategory: "sample-prep",
    name: { en: "Centrifuges", ar: "أجهزة الطرد المركزي" },
    summary: {
      en: "Benchtop, micro and refrigerated centrifuges for clinical, research and teaching laboratories.",
      ar: "أجهزة طرد مركزي مكتبية ودقيقة ومبرّدة للمختبرات السريرية والبحثية والتعليمية.",
    },
    image: I("research-team-samples"),
    specFields: ["capacity", "speed", "rotors", "temperature"],
    keywords: "centrifuge microcentrifuge refrigerated",
  },
  {
    id: "balances",
    category: "lab-equipment",
    subcategory: "sample-prep",
    name: { en: "Laboratory balances", ar: "الموازين المخبرية" },
    summary: {
      en: "Analytical, precision and moisture balances, with calibration options.",
      ar: "موازين تحليلية ودقيقة وموازين قياس الرطوبة، مع خيارات المعايرة.",
    },
    image: I("chemist-bench"),
    specFields: ["capacity", "readability", "dimensions", "connectivity"],
    keywords: "balance scale weighing analytical",
  },
  {
    id: "incubators",
    category: "lab-equipment",
    subcategory: "temperature",
    name: { en: "Incubators", ar: "الحاضنات" },
    summary: {
      en: "General-purpose, CO₂ and refrigerated incubators for microbiology and cell work.",
      ar: "حاضنات للأغراض العامة وحاضنات ثاني أكسيد الكربون وحاضنات مبرّدة لأعمال الأحياء الدقيقة والخلايا.",
    },
    image: I("petri-dish"),
    specFields: ["chambers", "temperature", "dimensions", "power"],
    keywords: "incubator co2 culture",
  },
  {
    id: "cold-storage",
    category: "lab-equipment",
    subcategory: "temperature",
    name: { en: "Laboratory refrigerators & freezers", ar: "الثلاجات والمجمدات المخبرية" },
    summary: {
      en: "Laboratory, pharmacy and blood-bank refrigeration, including ultra-low temperature freezers.",
      ar: "ثلاجات للمختبرات والصيدليات وبنوك الدم، بما في ذلك مجمدات الحرارة المنخفضة جدًا.",
    },
    image: I("lab-corridor"),
    specFields: ["capacity", "temperature", "dimensions", "power"],
    keywords: "fridge freezer ult blood bank cold",
  },
  {
    id: "biosafety-cabinets",
    category: "lab-equipment",
    subcategory: "safety",
    name: { en: "Biological safety cabinets", ar: "خزائن السلامة الحيوية" },
    summary: {
      en: "Class II cabinets and laminar-flow hoods for safe handling of biological samples.",
      ar: "خزائن من الفئة الثانية وخزائن التدفق الصفائحي للتعامل الآمن مع العيّنات البيولوجية.",
    },
    image: I("lab-equipment-operator"),
    specFields: ["classification", "airflow", "dimensions", "certification"],
    keywords: "biosafety cabinet laminar flow hood class ii",
  },
  {
    id: "autoclaves",
    category: "lab-equipment",
    subcategory: "safety",
    name: { en: "Autoclaves & sterilisers", ar: "أجهزة التعقيم (الأوتوكلاف)" },
    summary: {
      en: "Benchtop and floor-standing steam sterilisers for laboratories and clinical settings.",
      ar: "أجهزة تعقيم بالبخار مكتبية وأرضية للمختبرات والبيئات السريرية.",
    },
    image: I("lab-analysis"),
    specFields: ["chambers", "cycles", "temperature", "power"],
    keywords: "autoclave steriliser sterilizer steam",
  },

  // ── Scientific instruments ───────────────────────────────────────────
  {
    id: "microscopes",
    category: "instruments",
    subcategory: "microscopy",
    name: { en: "Microscopes", ar: "المجاهر" },
    summary: {
      en: "Biological, stereo and digital microscopes for teaching, routine diagnostics and research.",
      ar: "مجاهر بيولوجية ومجسّمة ورقمية للتعليم والتشخيص الروتيني والبحث العلمي.",
    },
    image: I("microscopy-closeup"),
    specFields: ["optics", "magnification", "connectivity", "power"],
    keywords: "microscope stereo digital optics",
  },
  {
    id: "microscope-cameras",
    category: "instruments",
    subcategory: "microscopy",
    name: { en: "Microscope cameras & imaging", ar: "كاميرات المجاهر والتصوير" },
    summary: {
      en: "Imaging add-ons and software for documenting and sharing what you see under the microscope.",
      ar: "ملحقات تصوير وبرمجيات لتوثيق ما تراه تحت المجهر ومشاركته.",
    },
    image: I("sample-slide"),
    specFields: ["optics", "connectivity", "display"],
    keywords: "camera imaging software microscope",
  },
  {
    id: "spectrophotometers",
    category: "instruments",
    subcategory: "analytical",
    name: { en: "Spectrophotometers", ar: "أجهزة القياس الطيفي" },
    summary: {
      en: "UV-Vis and visible spectrophotometers for quantitative analysis in teaching, QC and research.",
      ar: "أجهزة قياس طيفي للأشعة فوق البنفسجية والمرئية للتحليل الكمّي في التعليم وضبط الجودة والبحث.",
    },
    image: I("reagents-blue"),
    specFields: ["wavelength", "display", "connectivity", "power"],
    keywords: "spectrophotometer uv vis absorbance",
  },
  {
    id: "meters",
    category: "instruments",
    subcategory: "analytical",
    name: { en: "pH, conductivity & multiparameter meters", ar: "أجهزة قياس الحموضة والتوصيل ومتعددة المؤشرات" },
    summary: {
      en: "Benchtop and portable meters for water, environmental and quality-control testing.",
      ar: "أجهزة قياس مكتبية ومحمولة لفحوص المياه والبيئة وضبط الجودة.",
    },
    image: I("chemist-bench"),
    specFields: ["parameters", "display", "connectivity"],
    keywords: "ph meter conductivity tds dissolved oxygen",
  },
  {
    id: "analysers",
    category: "instruments",
    subcategory: "analytical",
    name: { en: "Clinical laboratory analysers", ar: "المحلّلات المخبرية السريرية" },
    summary: {
      en: "Chemistry, haematology and immunoassay analysers sized to your daily sample volume.",
      ar: "محلّلات الكيمياء وأمراض الدم والمناعة، بسعة تناسب عدد العيّنات اليومي لديك.",
    },
    image: I("lab-bench-microscopy"),
    specFields: ["throughput", "parameters", "connectivity", "power"],
    keywords: "analyzer analyser chemistry hematology haematology immunoassay",
  },

  // ── Consumables ──────────────────────────────────────────────────────
  {
    id: "pipettes",
    category: "consumables",
    subcategory: "liquid-handling",
    name: { en: "Pipettes & tips", ar: "الماصّات ورؤوسها" },
    summary: {
      en: "Single and multichannel pipettes, filtered and standard tips, and pipette calibration.",
      ar: "ماصّات أحادية ومتعددة القنوات، ورؤوس عادية ومفلترة، وخدمة معايرة الماصّات.",
    },
    image: I("consumables-tubes"),
    specFields: ["volume", "sterility", "packSize"],
    keywords: "pipette micropipette tips multichannel",
  },
  {
    id: "tubes-vials",
    category: "consumables",
    subcategory: "labware",
    name: { en: "Tubes, vials & sample containers", ar: "الأنابيب والقوارير وحاويات العيّنات" },
    summary: {
      en: "Centrifuge tubes, cryovials, blood-collection tubes and sample containers.",
      ar: "أنابيب الطرد المركزي، وقوارير التجميد، وأنابيب جمع الدم، وحاويات العيّنات.",
    },
    image: I("reagents-blue"),
    specFields: ["volume", "material", "sterility", "packSize"],
    keywords: "tube vial cryovial falcon eppendorf blood collection",
  },
  {
    id: "glassware",
    category: "consumables",
    subcategory: "labware",
    name: { en: "Laboratory glassware", ar: "الزجاجيات المخبرية" },
    summary: {
      en: "Beakers, flasks, cylinders and volumetric glassware for everyday and analytical work.",
      ar: "الكؤوس، والدوارق، والمخابير، والزجاجيات الحجمية للعمل اليومي والتحليلي.",
    },
    image: I("droplet"),
    specFields: ["volume", "material", "grade", "packSize"],
    keywords: "beaker flask cylinder borosilicate glass",
  },
  {
    id: "culture-media",
    category: "consumables",
    subcategory: "reagents",
    name: { en: "Petri dishes & culture media", ar: "أطباق بتري والأوساط الزرعية" },
    summary: {
      en: "Ready-to-use plates, dehydrated media and microbiology supplies.",
      ar: "أطباق جاهزة للاستخدام، وأوساط مجففة، ومستلزمات الأحياء الدقيقة.",
    },
    image: I("petri-dish"),
    specFields: ["sterility", "packSize", "grade"],
    keywords: "petri dish agar media microbiology",
  },
  {
    id: "reagents",
    category: "consumables",
    subcategory: "reagents",
    name: { en: "Reagents & chemicals", ar: "الكواشف والمواد الكيميائية" },
    summary: {
      en: "Analytical and diagnostic reagents, buffers, stains and laboratory chemicals.",
      ar: "كواشف تحليلية وتشخيصية، ومحاليل منظِّمة، وصبغات، ومواد كيميائية مخبرية.",
    },
    image: I("reagents-blue"),
    specFields: ["grade", "packSize", "certification"],
    keywords: "reagent chemical buffer stain kit",
  },
  {
    id: "ppe",
    category: "consumables",
    subcategory: "ppe",
    name: { en: "Gloves & protective equipment", ar: "القفازات ومعدات الوقاية الشخصية" },
    summary: {
      en: "Gloves, lab coats, masks, eye protection and spill kits.",
      ar: "القفازات، والمعاطف المخبرية، والكمامات، وواقيات العين، وأطقم التعامل مع الانسكابات.",
    },
    image: I("microscope-detail"),
    specFields: ["material", "packSize", "certification"],
    keywords: "gloves nitrile coat mask goggles ppe",
  },

  // ── Furniture ────────────────────────────────────────────────────────
  {
    id: "benches",
    category: "furniture",
    subcategory: "benches",
    name: { en: "Laboratory benches & workstations", ar: "طاولات ومحطات العمل المخبرية" },
    summary: {
      en: "Wall, island and peninsula benches with chemical-resistant worktops and service spines.",
      ar: "طاولات جدارية ووسطية وجانبية بأسطح مقاومة للمواد الكيميائية وقنوات للخدمات.",
    },
    image: I("lab-room-bright"),
    specFields: ["dimensions", "finish", "loadRating", "material"],
    keywords: "bench workstation island worktop epoxy",
  },
  {
    id: "seating",
    category: "furniture",
    subcategory: "benches",
    name: { en: "Laboratory seating", ar: "مقاعد المختبرات" },
    summary: {
      en: "Chairs and stools designed for laboratory and clean-room use.",
      ar: "كراسٍ ومقاعد مصممة للاستخدام في المختبرات والغرف النظيفة.",
    },
    image: I("lab-bench-microscopy"),
    specFields: ["material", "dimensions", "certification"],
    keywords: "chair stool seating ergonomic",
  },
  {
    id: "storage",
    category: "furniture",
    subcategory: "storage",
    name: { en: "Storage & safety cabinets", ar: "الخزائن وخزائن السلامة" },
    summary: {
      en: "Storage for general labware, flammables, acids and bases, with ventilation where required.",
      ar: "خزائن لحفظ الأدوات العامة، والمواد القابلة للاشتعال، والأحماض والقواعد، مع تهوية عند الحاجة.",
    },
    image: I("lab-analysis"),
    specFields: ["dimensions", "material", "certification"],
    keywords: "cabinet storage flammable acid",
  },
  {
    id: "fume-hoods",
    category: "furniture",
    subcategory: "storage",
    name: { en: "Fume hoods & extraction", ar: "خزائن شفط الأبخرة وأنظمة الشفط" },
    summary: {
      en: "Ducted and ductless fume cupboards and local extraction arms.",
      ar: "خزائن شفط أبخرة موصولة بمجارٍ أو بدونها، وأذرع شفط موضعية.",
    },
    image: I("infrastructure-pipes"),
    specFields: ["dimensions", "airflow", "certification"],
    keywords: "fume hood cupboard extraction ductless",
  },
  {
    id: "wash-stations",
    category: "furniture",
    subcategory: "storage",
    name: { en: "Sinks, eyewash & safety showers", ar: "المغاسل ومحطات غسل العين ودشات الطوارئ" },
    summary: {
      en: "Laboratory sinks, emergency eyewash stations and safety showers.",
      ar: "مغاسل مخبرية، ومحطات غسل العين للطوارئ، ودشات السلامة.",
    },
    image: I("lab-room-bright"),
    specFields: ["material", "dimensions", "certification"],
    keywords: "sink eyewash shower emergency",
  },

  // ── Complete laboratory setup ────────────────────────────────────────
  {
    id: "pkg-clinical",
    category: "setup",
    subcategory: "lab-packages",
    name: { en: "Clinical & hospital laboratory", ar: "المختبر السريري ومختبر المستشفى" },
    summary: {
      en: "Analysers, sample processing, cold chain, furniture and IT connections for diagnostic labs.",
      ar: "المحلّلات، ومعالجة العيّنات، وسلسلة التبريد، والأثاث، وربط الأنظمة لمختبرات التشخيص.",
    },
    image: I("lab-bench-microscopy"),
    specFields: ["scope", "deliverables", "duration"],
    keywords: "hospital clinical diagnostic lab package",
  },
  {
    id: "pkg-research",
    category: "setup",
    subcategory: "lab-packages",
    name: { en: "Research laboratory", ar: "المختبر البحثي" },
    summary: {
      en: "Flexible benches, containment and core instruments for research groups and core facilities.",
      ar: "طاولات مرنة، وأنظمة احتواء، وأجهزة أساسية للمجموعات البحثية والمرافق المركزية.",
    },
    image: I("microscope-navy"),
    specFields: ["scope", "deliverables", "duration"],
    keywords: "research lab package university",
  },
  {
    id: "pkg-teaching",
    category: "setup",
    subcategory: "lab-packages",
    name: { en: "Teaching laboratory", ar: "المختبر التعليمي" },
    summary: {
      en: "Robust student workstations, demonstration equipment and safe storage for schools and universities.",
      ar: "محطات عمل متينة للطلاب، وأجهزة عرض توضيحي، وتخزين آمن للمدارس والجامعات.",
    },
    image: I("lab-analysis"),
    specFields: ["scope", "deliverables", "duration"],
    keywords: "teaching school university student lab",
  },
  {
    id: "pkg-qc",
    category: "setup",
    subcategory: "lab-packages",
    name: { en: "Quality-control laboratory", ar: "مختبر ضبط الجودة" },
    summary: {
      en: "Analytical instruments, balances and controlled storage for industrial and food QC labs.",
      ar: "أجهزة تحليل، وموازين، وتخزين مضبوط لمختبرات ضبط الجودة الصناعية والغذائية.",
    },
    image: I("chemist-bench"),
    specFields: ["scope", "deliverables", "duration"],
    keywords: "qc quality control food industrial",
  },
  {
    id: "pkg-micro",
    category: "setup",
    subcategory: "lab-packages",
    name: { en: "Microbiology laboratory", ar: "مختبر الأحياء الدقيقة" },
    summary: {
      en: "Containment, incubation, sterilisation and media preparation in one planned workflow.",
      ar: "الاحتواء، والحضانة، والتعقيم، وتحضير الأوساط ضمن سير عمل واحد مخطط.",
    },
    image: I("petri-dish"),
    specFields: ["scope", "deliverables", "duration"],
    keywords: "microbiology bsl containment",
  },

  // ── Design & installation ────────────────────────────────────────────
  {
    id: "svc-planning",
    category: "design",
    subcategory: "services",
    name: { en: "Space planning & layout design", ar: "تخطيط المساحات وتصميم التوزيع" },
    summary: {
      en: "Workflow analysis, zoning and layout drawings that place every bench, instrument and service point.",
      ar: "تحليل سير العمل، وتقسيم المناطق، ومخططات توزيع تحدد موقع كل طاولة وجهاز ونقطة خدمة.",
    },
    image: I("facility-review"),
    specFields: ["deliverables", "duration", "scope"],
    keywords: "layout design planning drawings",
  },
  {
    id: "svc-utilities",
    category: "design",
    subcategory: "services",
    name: { en: "Utilities coordination", ar: "تنسيق الخدمات والتمديدات" },
    summary: {
      en: "Gases, water, drainage, ventilation and power requirements coordinated with your contractors.",
      ar: "تنسيق متطلبات الغازات والمياه والصرف والتهوية والكهرباء مع المقاولين لديك.",
    },
    image: I("infrastructure-pipes"),
    specFields: ["deliverables", "scope"],
    keywords: "gas water ventilation mep utilities",
  },
  {
    id: "svc-installation",
    category: "design",
    subcategory: "services",
    name: { en: "Installation & commissioning", ar: "التركيب والتشغيل التجريبي" },
    summary: {
      en: "Delivery, installation, functional checks and documented handover of every item.",
      ar: "التوريد، والتركيب، والفحوص الوظيفية، والتسليم الموثّق لكل جهاز.",
    },
    image: I("lab-equipment-operator"),
    specFields: ["deliverables", "duration", "scope"],
    keywords: "installation commissioning handover",
  },
  {
    id: "svc-training",
    category: "design",
    subcategory: "services",
    name: { en: "Training & after-sales service", ar: "التدريب وخدمة ما بعد البيع" },
    summary: {
      en: "User training at handover, preventive maintenance plans and responsive service.",
      ar: "تدريب المستخدمين عند التسليم، وخطط الصيانة الوقائية، وخدمة سريعة الاستجابة.",
    },
    image: I("researcher-bench"),
    specFields: ["deliverables", "scope"],
    keywords: "training maintenance service support",
  },

  // ── Research ─────────────────────────────────────────────────────────
  {
    id: "molecular",
    category: "research",
    subcategory: "life-science",
    name: { en: "Molecular biology equipment", ar: "أجهزة البيولوجيا الجزيئية" },
    summary: {
      en: "PCR and real-time PCR systems, electrophoresis, gel documentation and nucleic-acid workflows.",
      ar: "أجهزة PCR والـ PCR اللحظي، والرحلان الكهربائي، وتوثيق الهلام، وسير عمل الأحماض النووية.",
    },
    image: I("research-team-samples"),
    specFields: ["throughput", "temperature", "connectivity"],
    keywords: "pcr qpcr electrophoresis gel dna rna",
  },
  {
    id: "cell-culture",
    category: "research",
    subcategory: "life-science",
    name: { en: "Cell culture equipment", ar: "أجهزة زراعة الخلايا" },
    summary: {
      en: "CO₂ incubators, biosafety cabinets, inverted microscopes and cell counters for culture labs.",
      ar: "حاضنات ثاني أكسيد الكربون، وخزائن السلامة الحيوية، والمجاهر المقلوبة، وعدّادات الخلايا.",
    },
    image: I("microscope-navy"),
    specFields: ["chambers", "temperature", "classification"],
    keywords: "cell culture co2 incubator inverted microscope",
  },
  {
    id: "workflow-advisory",
    category: "research",
    subcategory: "advisory",
    name: { en: "Method & workflow advisory", ar: "استشارات طرق العمل وسيره" },
    summary: {
      en: "Help translating a research method or grant budget into an equipment list you can procure.",
      ar: "مساعدة في تحويل طريقة بحثية أو ميزانية منحة إلى قائمة أجهزة قابلة للشراء.",
    },
    image: I("microscope-eyepiece"),
    specFields: ["deliverables", "scope"],
    keywords: "consultation grant method workflow",
  },
];
