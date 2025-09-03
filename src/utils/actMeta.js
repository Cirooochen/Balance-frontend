// Simple keyword → category mapper + stock images
const CATALOG = [
  {
    key: "movement",
    label: "WORKOUT",
    emoji: "🏃",
    match: /(workout|run|walk|jog|movement|exercise|cardio|strength|gym)/i,
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "hydration",
    label: "HYDRATION",
    emoji: "💧",
    match: /(hydrate|hydration|water|drink)/i,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "mindfulness",
    label: "MINDFUL",
    emoji: "🧘",
    match: /(mindful|calm|breath|breathing|meditat|pause)/i,
    img: "https://images.unsplash.com/photo-1526401485004-2fda9f4b1d69?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "connection",
    label: "SOCIAL",
    emoji: "🤝",
    match: /(connect|call.*(friend|mom|dad|loved)|text.*(friend|family))/i,
    img: "https://images.unsplash.com/photo-1529336953121-ad062f56b6eb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "nutrition",
    label: "DIET",
    emoji: "🥗",
    match: /(salad|lunch|meal|nutrition|veggie|fruit|cook)/i,
    img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "sleep",
    label: "SLEEP",
    emoji: "😴",
    match: /(sleep|bed|wind.*down|lights out|night routine)/i,
    img: "https://images.unsplash.com/photo-1511295742362-92c96b5d2c2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "mobility",
    label: "MOBILITY",
    emoji: "🤸",
    match: /(stretch|mobility|flexibility)/i,
    img: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "screen",
    label: "SCREEN",
    emoji: "📵",
    match: /(screen|scroll|phone|gaming|doom)/i,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
  },
];

export function getActMeta(name) {
  const n = String(name || "");
  const hit = CATALOG.find((c) => c.match.test(n));
  return (
    hit || {
      key: "habit",
      label: "HABIT",
      emoji: "✨",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    }
  );
}
