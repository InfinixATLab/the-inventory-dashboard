// Convert number to string in brazilian format
export const formatPriceBR = (value: number) => {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Convert brazilian string to number
export const parsePriceBR = (value: string) => {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(normalized) || 0;
};
