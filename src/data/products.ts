import { Product } from '../types';

export const productsData: Product[] = [
  // 1. مواسير EMT معدنية مجلفنة
  {
    id: 'prod-emt-pipes',
    nameAr: 'مواسير EMT معدنية مجلفنة خفيفة (Electrical Metallic Tubing)',
    nameEn: 'Galvanized Steel EMT Conduits (UL 797 / ANSI C80.3)',
    category: 'emt_conduits',
    categoryAr: 'مواسير EMT ومستلزماتها',
    categoryEn: 'EMT Conduits & Fittings',
    brand: 'AMG Certified Steel',
    specAr: 'مقاسات من 1/2" حتى 4" - مجلفنة على الساخن - طول الماسورة 3.05 متر (10 قدم)',
    specEn: 'Sizes 1/2" to 4" - Hot-dip galvanized smooth interior - Standard 3.05m length',
    descriptionAr: 'مواسير فولاذية خفيفة الوزن سهلة الثني والتشكيل، مخصصة للتمديدات الكهربائية الظاهرة والمدفونة بالمباني والمستودعات.',
    descriptionEn: 'High quality electrical metallic tubing designed for commercial raceways, offering superior wire-pulling performance.',
    image: '/src/assets/images/category_emt_conduits_1794335432250.jpg',
    inStock: true,
    standards: ['UL 797', 'ANSI C80.3', 'EOS 208'],
    unit: 'ماسورة / Pipe (3.05m)'
  },

  // 2. مواسير IMC و RIGID الصلب الثقيلة
  {
    id: 'prod-imc-rigid',
    nameAr: 'مواسير حديد صلب ثقيلة مقلوظة IMC & RIGID (RSC)',
    nameEn: 'Heavy Duty Rigid (RSC) & IMC Steel Conduits',
    category: 'emt_conduits',
    categoryAr: 'مواسير EMT ومستلزماتها',
    categoryEn: 'EMT Conduits & Fittings',
    brand: 'AMG Heavy Duty Conduits',
    specAr: 'جلفنة عميقة بالغمس الساخن HDG - أطراف مقلوظة مع جلبه ربط - مقاسات 1/2" حتى 4"',
    specEn: 'Hot-Dip Galvanized (HDG) with threaded ends & coupling - Sizes 1/2" to 4"',
    descriptionAr: 'مواسير حماية صلبة مخصصة للمنشآت البترولية ومصافي الغاز والمناطق المعرضة للصدمات الميكانيكية.',
    descriptionEn: 'Heavy wall threaded steel conduit engineered for maximum mechanical and explosion containment.',
    image: '/src/assets/images/img_imc_rigid_pipes_1794335844097.jpg',
    inStock: true,
    standards: ['UL 6 (RIGID)', 'UL 1242 (IMC)', 'ANSI C80.1'],
    unit: 'ماسورة / Pipe (3.05m)'
  },

  // 3. مواسير فلكسبل مرنة مكسوة PVC
  {
    id: 'prod-flex-liquidtight',
    nameAr: 'مواسير فلكسبل معدنية مكسوة PVC مقاومة للسوائل (Liquid-Tight)',
    nameEn: 'Liquid-Tight PVC Coated Flexible Metallic Conduit',
    category: 'flexible_conduits',
    categoryAr: 'مواسير فلكسبل مرنة',
    categoryEn: 'Flexible Conduits & Connectors',
    brand: 'AMG Flex Pro',
    specAr: 'قلب فولاذي مجلفن مكسو بطبقة PVC سميكة مقاومة للزيوت والمياه والأشعة فوق البنفسجية IP67',
    specEn: 'Galvanized spiral steel core with oil & UV resistant PVC jacket, IP67 waterproof rated',
    descriptionAr: 'تغذية المحركات الكهربائية والمضخات والمعدات المعرضة للاهتزازات الدائمة في بيئات رطبة أو صناعية.',
    descriptionEn: 'Flexible liquid-tight conduit providing superior vibration dampening and moisture/oil barrier.',
    image: '/src/assets/images/category_flexible_conduits_1794335433370.jpg',
    inStock: true,
    standards: ['UL 360', 'IEC 61386-23', 'CE'],
    unit: 'لفة / Roll (30m / 50m)'
  },

  // 4. علب وبواطات توصيل حديد مجلفن 4x4
  {
    id: 'prod-boxes-steel',
    nameAr: 'علب وبواطات توصيل حديد مجلفن 4×4 وبواطات Handy Boxes',
    nameEn: 'Galvanized Steel Junction & Outlet Boxes (4x4 & Handy Box)',
    category: 'boxes_fittings',
    categoryAr: 'بواطات وإكسسوارات تركيبات',
    categoryEn: 'Boxes, Fittings & Hardware',
    brand: 'AMG Fittings',
    specAr: 'عمق 1-1/2" و 2-1/8" - فتحات سحب دائرية Knockouts (1/2" & 3/4") - أغطية صلبة ومفرغة',
    specEn: 'Depth 1-1/2" & 2-1/8", knockouts 1/2" & 3/4", flat blank & raised covers',
    descriptionAr: 'علب سحب وتوزيع متينة مجلفنة لمفاتيح وبرايز القوى ووحدات التغذية الحائطية.',
    descriptionEn: 'Durable pressed steel junction and pull boxes engineered for wall receptacles and circuit branching.',
    image: '/src/assets/images/img_steel_junction_boxes_1794335844709.jpg',
    inStock: true,
    standards: ['UL 514A', 'NEMA OS 1'],
    unit: 'قطعة / Box'
  },

  // 5. قضبان سي شانيل Unistrut وتياش التعليق
  {
    id: 'prod-unistrut-strut',
    nameAr: 'قضبان سي شانيل مجلفنة Unistrut ومستلزمات تعليق (41×41 & 41×21)',
    nameEn: 'Galvanized Strut Channels & Trapeze Hangers (41x41 & 41x21)',
    category: 'boxes_fittings',
    categoryAr: 'بواطات وإكسسوارات تركيبات',
    categoryEn: 'Boxes, Fittings & Hardware',
    brand: 'AMG Structural Strut',
    specAr: 'سماكة 1.5 مم - 2.5 مم - طول 3 متر - مخرومة أو مصمتة مع صواميل زنبركية وتياش تعليق',
    specEn: '1.5mm - 2.5mm thickness, 3m length, slotted / solid with spring nuts and threaded rods',
    descriptionAr: 'الهيكل الإنشائي الحامل لمسارات المواسير والكابل تري ولوحات التوزيع المعلقة.',
    descriptionEn: 'Heavy duty steel support channels for trapeze ceiling drops, multi-conduit runs, and racks.',
    image: '/src/assets/images/img_unistrut_strut_channel_1794335845042.jpg',
    inStock: true,
    standards: ['ASTM A123', 'BS 6946'],
    unit: 'عود / Bar (3m)'
  },

  // 6. إلكترودات وقضبان تأريض نحاس وبارات
  {
    id: 'prod-earth-grounding',
    nameAr: 'إلكترودات وقضبان تأريض صلب ملبس نحاس نقي (Copper Bonded Earth Rods)',
    nameEn: 'Copper Bonded Earth Rods 5/8" & 3/4" (UL 467 Listed)',
    category: 'earthing',
    categoryAr: 'أنظمة التأريض والصواعق',
    categoryEn: 'Earthing & Lightning Systems',
    brand: 'AMG Grounding Systems',
    specAr: 'قطر 5/8" و 3/4" - طول 3 متر و 1.5 متر - سماكة طبقة النحاس 254 ميكرون نقاء 99.9%',
    specEn: 'Diameter 5/8" & 3/4", length 3.0m, minimum 254 micron copper coating, UL 467',
    descriptionAr: 'قضبان صلب عالي المقاومة ملبسة كهربائياً بطبقة سميكة من النحاس لتشتيت تيارات الأعطال والصواعق إلى عمق التربة بدون تآكل.',
    descriptionEn: 'Premium molecularly bonded high tensile steel earth electrodes engineered for minimum soil contact resistance.',
    image: '/src/assets/images/category_earthing_lightning_1794335433495.jpg',
    inStock: true,
    standards: ['UL 467', 'BS 7430', 'IEC 62561-2'],
    unit: 'قضيب / Rod'
  },


  // 8. كابلات نحاس جهد منخفض مسلحة
  {
    id: 'prod-cables-armored',
    nameAr: 'كابل نحاس معزول XLPE مسلح شريط صلب (0.6/1kV)',
    nameEn: 'Copper XLPE Insulated Armored Power Cable (0.6/1kV)',
    category: 'cables',
    categoryAr: 'كابلات القوى والأسلاك',
    categoryEn: 'Power Cables & Wires',
    brand: 'Elsewedy Electric',
    specAr: 'Cu / XLPE / STA / PVC - مقاطع من 16 مم² حتى 400 مم² - أصلية بضمان المصنع',
    specEn: 'Cu / XLPE / STA / PVC - Sizes 16 mm² to 400 mm²',
    descriptionAr: 'كابلات جهد منخفض مسلحة مخصصة للتمديد المباشر تحت الأرض وفي البيئات الصناعية القاسية.',
    descriptionEn: 'Heavy-duty steel tape armored low voltage power cable designed for direct underground burial and harsh industrial installations.',
    image: '/src/assets/images/category_switchgear_cables_1794334722785.jpg',
    inStock: true,
    standards: ['IEC 60502-1', 'BS 5467', 'EOS 208'],
    unit: 'متر / Meter'
  },

  // 9. أسلاك تمديدات مفردة THHN / NYA
  {
    id: 'prod-wires-thhn',
    nameAr: 'أسلاك نحاس مفردة معزولة لتمديد المواسير (Building Wires THHN / NYA)',
    nameEn: 'Single Core Copper Building Wires THHN / NYA (1.5mm² - 35mm²)',
    category: 'cables',
    categoryAr: 'كابلات القوى والأسلاك',
    categoryEn: 'Power Cables & Wires',
    brand: 'Elsewedy Electric',
    specAr: 'نحاس مجدول ومصمت - عزل PVC مقاوم للحرارة 90°C - بكر 100 متر بجميع الألوان المعتمدة للكود',
    specEn: 'Stranded copper, 90°C PVC insulation, 100m spools in all code phase colors',
    descriptionAr: 'الأسلاك المعتمدة لتغذية دوائر الإنارة والبرايز ومسارات مواسير الـ EMT داخل المشروعات التجارية والصناعية.',
    descriptionEn: 'Standard single conductor building wires for pulling into EMT, IMC, and flexible conduits.',
    image: '/src/assets/images/img_building_wires_thhn_1794335865583.jpg',
    inStock: true,
    standards: ['IEC 60227-3', 'BS 6004', 'EOS 29'],
    unit: 'لفة / Coil (100m)'
  },

  // 10. قواطع هوائية ذكية ACB
  {
    id: 'prod-switchgear-acb',
    nameAr: 'قواطع هوائية ذكية ACB Masterpact / Emax (800A - 6300A)',
    nameEn: 'Air Circuit Breakers (ACB) 800A - 6300A',
    category: 'switchgear',
    categoryAr: 'القواطع ولوحات التوزيع',
    categoryEn: 'Switchgears & Breakers',
    brand: 'Schneider Electric / ABB',
    specAr: 'تيار مقنن حتى 6300A - سعة قطع 50kA حتى 150kA - مع وحدات حماية رقمية MicroLogic / Ekip',
    specEn: 'Rated current up to 6300A, Icu 50kA-150kA with digital electronic trip protection',
    descriptionAr: 'قواطع هواء متطورة للمحطات ولوحات التوزيع الرئيسية MDB مع إمكانية الربط بأنظمة إدارة الطاقة BMS و SCADA.',
    descriptionEn: 'Advanced main power distribution air circuit breaker with integrated digital metering and communication.',
    image: '/src/assets/images/img_air_circuit_breaker_1794335846405.jpg',
    inStock: true,
    standards: ['IEC 60947-2', 'CE', 'UL'],
    unit: 'قطعة / Unit'
  },

  // 11. لوحات توزيع كهربائية Form 4b
  {
    id: 'prod-switchgear-panels',
    nameAr: 'لوحات توزيع كهربائية رئيسية معتمدة (Type-Tested Panels Form 4b)',
    nameEn: 'Type-Tested Low Voltage Distribution Switchboards Form 4b',
    category: 'switchgear',
    categoryAr: 'القواطع ولوحات التوزيع',
    categoryEn: 'Switchgears & Breakers',
    brand: 'Siemens / Schneider Electric',
    specAr: 'Form 2b / Form 4b - درجة حماية IP54 / IP55 حتى 5000A مع بارات نحاس معزولة',
    specEn: 'Form 2b / 4b segregation, IP54/IP55 enclosure rating up to 5000A',
    descriptionAr: 'تصنيع وتجميع وتوريد لوحات التوزيع الرئيسية والفرعية ووحدات تحسين معامل القدرة (PFC).',
    descriptionEn: 'Custom built and certified MDB, SMDB, and automatic power factor correction capacitor banks.',
    image: '/src/assets/images/hero_electrical_substation_1794334721158.jpg',
    inStock: true,
    standards: ['IEC 61439-1/2', 'KEMA Certified'],
    unit: 'لوحة / Panel'
  },

  // 12. أتمتة صناعية، PLC، وإنفرترات VFD
  {
    id: 'prod-automation-vfd',
    nameAr: 'منظومات أتمتة ومغيرات سرعة VFD وتحكم PLC S7-1200',
    nameEn: 'Variable Frequency Drives (VFD) & Modular PLC Systems',
    category: 'automation',
    categoryAr: 'أتمتة وتحكم صناعي',
    categoryEn: 'Automation & Control',
    brand: 'Siemens / ABB / Schneider',
    specAr: 'قدرات من 0.75kW حتى 500kW - جهد 380V / 400V - بروتوكولات Profinet و Modbus وشاشات HMI',
    specEn: 'Power range 0.75kW to 500kW, 3-Phase, modular CPU, digital/analog I/O expansion',
    descriptionAr: 'إنفرترات صناعية للتحكم في سرعة وعزم المحركات الكهربائية للمضخات والسيور مع وحدات تحكم مبرمجة.',
    descriptionEn: 'Heavy duty variable speed drives and programmable logic controllers for process automation.',
    image: '/src/assets/images/category_automation_control_1794334722700.jpg',
    inStock: true,
    standards: ['IEC 61800-3', 'IEC 61131-2', 'CE'],
    unit: 'طقم / System'
  },

  // 13. حوامل ومسارات كابلات Cable Trays
  {
    id: 'prod-cable-trays',
    nameAr: 'حوامل ومسارات كابلات مجلفنة بالغمس الساخن (Cable Trays & Ladders)',
    nameEn: 'Hot-Dip Galvanized Cable Trays, Ladders & Trunking',
    category: 'cable_tray',
    categoryAr: 'كابل تري ومسارات الكابلات',
    categoryEn: 'Cable Management Systems',
    brand: 'AMG Certified Supplies',
    specAr: 'سماكات 1.5 مم - 2.5 مم مجلفنة HDG أو Pre-Galvanized مع كافة الإكسسوارات والوصلات',
    specEn: 'Thickness 1.5mm - 2.5mm, Hot Dip Galvanized / Pre-galv, complete bends and risers',
    descriptionAr: 'أنظمة إدارة وتمديد الكابلات الثقيلة المقاومة للتآكل في البيئات الساحلية والصناعية الكيماوية.',
    descriptionEn: 'Heavy duty perforated trays and cable ladder systems engineered for superior structural span.',
    image: '/src/assets/images/img_cable_tray_perforated_ladder_1794336148227.jpg',
    inStock: true,
    standards: ['BS EN 61537', 'ASTM A123'],
    unit: 'متر / Meter'
  },

  // 15. كشافات إنارة صناعية High-Bay و ATEX
  {
    id: 'prod-lighting-highbay',
    nameAr: 'كشافات إنارة صناعية مانعة للانفجار ومقاومة للعوامل الجوية (ATEX / High-Bay UFO)',
    nameEn: 'Explosion-Proof & Industrial High-Bay UFO LED Luminaires',
    category: 'lighting',
    categoryAr: 'إنارة صناعية ومشاريع',
    categoryEn: 'Industrial & Project Lighting',
    brand: 'Philips / Thorn / Cooper',
    specAr: 'قدرات 100W / 150W / 200W - كفاءة 160 lm/W - درجة حماية IP66 / IK09 - شهادة ATEX Zone 1/2',
    specEn: '100W/150W/200W, 160 lm/W high efficacy, IP66 / IK09 rating, ATEX Zone 1/2 available',
    descriptionAr: 'كشافات ليد عالية التحمل للمستودعات، الورش، حظائر الطائرات، والمصانع البتروكيماوية.',
    descriptionEn: 'Durable industrial LED floodlights and bay luminaires for warehouses, ports, and hazardous locations.',
    image: '/src/assets/images/img_highbay_lighting_1794335865843.jpg',
    inStock: true,
    standards: ['IEC 60598', 'ATEX Directive 2014/34/EU'],
    unit: 'قطعة / Fixture'
  }
];

export const industriesData = [
  {
    id: 'ind-1',
    titleAr: 'المقاولات والمشروعات الإنشائية الكبرى',
    titleEn: 'MEP Contracting & Infrastructure',
    descAr: 'توريد كامل لشبكات مواسير الـ EMT ومواسير الفلكسبل وعلب التوزيع والكابل تري للمقاولين.',
    descEn: 'Full supply of EMT conduits, liquid-tight flex, junction boxes, and cable trays for contractors.',
    icon: 'Building2'
  },
  {
    id: 'ind-2',
    titleAr: 'المصانع والقطاع الصناعي الثقيل',
    titleEn: 'Heavy Industry & Manufacturing Plants',
    descAr: 'مواسير IMC و RIGID المقاومة للصدمات، لوحات تحكم، محركات، مغيرات سرعة، وكابلات درجات الحرارة العالية.',
    descEn: 'Turnkey supplies for production lines, motor control centers, VFDs, and heavy steel conduits.',
    icon: 'Factory'
  },
  {
    id: 'ind-3',
    titleAr: 'محطات الطاقة والبنية التحتية والمياه',
    titleEn: 'Utilities, Power Grids & Substation',
    descAr: 'منظومات التأريض العميقة (Earthing Rods)، بارات النحاس، حوامل ومسارات الكابلات ولوحات التوزيع.',
    descEn: 'Copper earth rods, earthing busbars, cable management raceways, and certified gear.',
    icon: 'Zap'
  },
  {
    id: 'ind-4',
    titleAr: 'المستشفيات والمباني الذكية والأبراج',
    titleEn: 'Healthcare & Critical Commercial Facilities',
    descAr: 'كابلات مقاومة للحريق LSZH، مواسير ومسارات معتمدة من استشاريي الإشراف طبقا لكودات الحريق والسلامة.',
    descEn: 'Fire-resistant cabling, safety-certified EMT conduit raceways, and critical power paths.',
    icon: 'ShieldCheck'
  }
];

export const brandPartners = [
  { name: 'Schneider Electric', origin: 'France', roleAr: 'موزع معتمد وتوريدات معتمدة', roleEn: 'Authorized Supply Partner' },
  { name: 'Elsewedy Electric', origin: 'Egypt / Global', roleAr: 'توريدات كابلات وأسلاك ومحولات', roleEn: 'Official Cable & Transformer Supply' },
  { name: 'ABB', origin: 'Switzerland', roleAr: 'أنظمة تحكم وقواطع ومغيرات سرعة', roleEn: 'Switchgear & Motion Solutions' },
  { name: 'Siemens', origin: 'Germany', roleAr: 'أتمتة صناعية ولوحات توزيع', roleEn: 'Industry Automation & Drives' },
  { name: 'AMG Certified Steel', origin: 'Egypt / Heavy Galv', roleAr: 'مواسير EMT و IMC وفلكسبل معتمدة UL', roleEn: 'UL-Listed Conduits & Fittings' },
  { name: 'Legrand', origin: 'France', roleAr: 'أنظمة توزيع وملحقات كابلات ومواسير', roleEn: 'Cable Trays & Wiring Devices' }
];
