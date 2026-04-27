export const SERVICE_CATEGORIES = [
  "Catering",
  "Photography",
  "DJ",
  "Mehendi & Makeup",
  "Cultural",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export const CATEGORY_TAGLINE: Record<ServiceCategory, string> = {
  Catering:          "Buffet, snacks, and full-service menus",
  Photography:       "Wedding shoots, candid moments, and reels",
  DJ:                "Party-ready sound, lights, and vibes",
  "Mehendi & Makeup":"Bridal mehendi and makeover artists",
  Cultural:          "Madhubani-inspired decor and cultural art",
};

export const CATEGORY_IMAGE: Record<ServiceCategory, string> = {
  Catering:          "/catering_service_1777314249262.png",
  Photography:       "/photography_service_1777314265964.png",
  DJ:                "/dj_service_1777314281684.png",
  "Mehendi & Makeup":"/mehendi_service_1777314296728.png",
  Cultural:          "/mithila_cultural_1777314631804.png",
};

export const EMPOWERMENT_IMAGES: { src: string; label: string; sub: string; accent: string }[] = [
  {
    src: "/emp_mehendi_1777315417623.png",
    label: "Mehendi Artistry",
    sub: "Traditional artists sharing their craft",
    accent: "#f59e0b",
  },
  {
    src: "/emp_makeup_1777315436915.png",
    label: "Professional Makeover",
    sub: "Independent makeup experts",
    accent: "#06b6d4",
  },
  {
    src: "/emp_catering_1777315455487.png",
    label: "Catering Excellence",
    sub: "Women-led cooking teams",
    accent: "#8b5cf6",
  },
  {
    src: "/emp_photographer_1777315475083.png",
    label: "Event Photography",
    sub: "Capturing moments professionally",
    accent: "#ec4899",
  },
  {
    src: "/emp_cultural_1777315492625.png",
    label: "Madhubani Artists",
    sub: "Preserving cultural heritage",
    accent: "#10b981",
  },
];
