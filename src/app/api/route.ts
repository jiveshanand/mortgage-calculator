import {
  computeNumberOfPaymentsPerAnnum,
  computePerPaymentScheduleInterest,
  computePaymentSchedule,
} from "@/utilities/computation";

export async function POST(req: any, res: any) {
  try {
    const requestBody = await req.json();

    if (
      !requestBody?.data?.paymentFrequecy ||
      !requestBody?.data?.ammortizationPeriod ||
      !requestBody?.data?.downPayment ||
      !requestBody?.data?.propertyValue ||
      !requestBody?.data?.annualInterest
    ) {
      res.send(400).json({ status: 404, message: "Bad Request" });
    }

    const {
      paymentFrequecy,
      ammortizationPeriod,
      downPayment,
      propertyValue,
      annualInterest,
    } = requestBody.data;
    const loanAmount = propertyValue - downPayment;

    const interestPerPaymentSchedule = computePerPaymentScheduleInterest(
      paymentFrequecy,
      annualInterest
    );

    const totalPayments = computeNumberOfPaymentsPerAnnum(
      paymentFrequecy,
      ammortizationPeriod
    );

    let perInstallmentAmount =
      (loanAmount *
        (interestPerPaymentSchedule *
          Math.pow(1 + interestPerPaymentSchedule, totalPayments))) /
      (Math.pow(1 + interestPerPaymentSchedule, totalPayments) - 1);

    perInstallmentAmount = perInstallmentAmount < 0 ? 0 : perInstallmentAmount;

    const paymentSchedule = computePaymentSchedule(
      loanAmount,
      totalPayments,
      interestPerPaymentSchedule,
      perInstallmentAmount
    );

    return new Response(
      JSON.stringify({
        success: true,
        perInstallmentAmount,
        schedule: paymentSchedule,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    res.send(500).json({ status: 500, message: error });
  }
}
