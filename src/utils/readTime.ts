export const readTime = (text: string): number => {
  return Math.round(text.split(" ").length / 200);
};
