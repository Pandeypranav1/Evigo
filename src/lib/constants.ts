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

// All images are local AI-generated assets — zero external dependency
export const CATEGORY_IMAGE: Record<ServiceCategory, string> = {
  Catering:          "/svc-catering.png",
  Photography:       "/svc-photography.png",
  DJ:                "/svc-dj.png",
  "Mehendi & Makeup":"/evigo-mehendi.png",
  Cultural:          "/evigo-cultural.png",
};

export const EMPOWERMENT_IMAGES: { src: string; label: string; sub: string }[] = [
  {
    src:   "/evigo-mehendi.png",
    label: "Nari Shakti in Action",
    sub:   "Mehendi & makeup artists earning with every event",
  },
  {
    src:   "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
    label: "Empowering Women",
    sub:   "Professional makeup artists at every celebration",
  },
  {
    src:   "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85",
    label: "Real Work, Real Income",
    sub:   "Female event teams creating magic every day",
  },
];
