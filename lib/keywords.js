export const KEYWORDS = {
  start: "Voici ton lien 👉 https://streamtv-ip.vercel.app/",
  lien: "Voici ton lien 👉 https://streamtv-ip.vercel.app/",
  mp: "Voici ton lien 👉 https://streamtv-ip.vercel.app/",
//   mp: "Voici ton accès en privé 🔥",
  vip: "Bienvenue VIP 👑 : https://streamtv-ip.vercel.app/"
};

export function getResponse(message) {
  if (!message) return null;

  const text = message.toLowerCase().trim();

  return KEYWORDS[text] || null;
}