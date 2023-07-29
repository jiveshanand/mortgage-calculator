import type { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<Object> = [
  {
    title: "Installment#",
    dataIndex: "installmentNumber",
  },
  {
    title: "Installment Amount",
    dataIndex: "installmentAmount",
    align: "center",
  },
  {
    title: "Interest Amount",
    dataIndex: "interest",
  },
  {
    title: "Principle Amount",
    dataIndex: "principle",
  },
  {
    title: "Remaining Balance",
    dataIndex: "remainingBalance",
  },
];
