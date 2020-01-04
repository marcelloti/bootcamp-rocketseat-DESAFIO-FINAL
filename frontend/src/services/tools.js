export const { format: formatPriceToBR } = new Intl.NumberFormat('ptBR', {
  style: 'currency',
  currency: 'BRL',
});
