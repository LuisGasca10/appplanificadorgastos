export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateStr: string):string => {
const date = new Date(dateStr);
const options :Intl.DateTimeFormatOptions={
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
}
  return new Intl.DateTimeFormat("es-ES", options).format(date);
};