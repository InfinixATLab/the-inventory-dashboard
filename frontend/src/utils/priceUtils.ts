// Convert brazilian string to number
export const parsePriceBR = (value: string) => {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(normalized) || 0;
};
