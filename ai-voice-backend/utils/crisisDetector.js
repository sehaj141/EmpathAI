export function isCrisis(text) {
  const crisisWords = [
    "suicide",
    "kill myself",
    "end my life",
    "self harm",
    "die"
  ];

  return crisisWords.some(word =>
    text.toLowerCase().includes(word)
  );
}