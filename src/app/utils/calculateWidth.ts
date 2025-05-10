export const calculateWidth = (text: string): number => {
  const length = text.length;
  return Math.min(length * 0.5, 500);
};
