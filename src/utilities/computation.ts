const numofMonthsInYear = 12;
const biweeklyPeriodInYear = 24;
const acceleratedBiweeklyPeriodInYear = 26;

export const computePerPaymentScheduleInterest = (
  paymentFrequency: string,
  annualRateOfInterest: number
) => {
  switch (paymentFrequency) {
    case "acceleratedBiWeekly":
      return annualRateOfInterest / (acceleratedBiweeklyPeriodInYear * 100);
    case "biweekly":
      return annualRateOfInterest / (biweeklyPeriodInYear * 100);
    default:
      return annualRateOfInterest / (numofMonthsInYear * 100);
  }
};

export const computeNumberOfPaymentsPerAnnum = (
  paymentFrequency: string,
  loanTerm: number
) => {
  switch (paymentFrequency) {
    case "acceleratedBiWeekly":
      return loanTerm * acceleratedBiweeklyPeriodInYear;
    case "biweekly":
      return loanTerm * biweeklyPeriodInYear;
    default:
      return loanTerm * numofMonthsInYear;
  }
};

export const computePaymentSchedule = (
  loanAmount: number,
  totalPayments: number,
  interestPerPaymentSchedule: number,
  perInstallmentAmount: number
) => {
  const paymentSchedule = [];
  let remainingBalance = loanAmount;

  let installmentNumber = 1;
  while (installmentNumber <= totalPayments) {
    const interestPayment = remainingBalance * interestPerPaymentSchedule;
    const principalPayment = perInstallmentAmount - interestPayment;
    remainingBalance -= principalPayment;

    paymentSchedule.push({
      installmentNumber: installmentNumber,
      installmentAmount: perInstallmentAmount.toFixed(2),
      principle: principalPayment.toFixed(2),
      interest: interestPayment.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2),
    });

    installmentNumber++;
  }

  return paymentSchedule;
};
