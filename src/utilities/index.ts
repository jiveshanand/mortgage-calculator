export const currencyFormatter = (value: any) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const currencyParser = (value: any) => value.replace(/\$\s?|(,*)/g, "");
