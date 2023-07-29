"use client";

import React, { useState } from "react";
import { Space, Typography } from "antd";
import axios from "axios";

import { Button, Form, InputNumber, Radio, Select, Table } from "antd";
import {
  HomeOutlined,
  DownCircleOutlined,
  PercentageOutlined,
} from "@ant-design/icons";

import { currencyFormatter, currencyParser } from "@/utilities";

import { columns } from "./config";

const { Title, Text } = Typography;

export default function Calculator() {
  const [propertyValue, setPropertyValue] = useState<number>();
  const [downPayment, setDownPayment] = useState<number>();
  const [annualRateOfInterest, setAnnualRateOfInterest] = useState<number>();

  const [showCalculator, setShowCalculator] = useState(false);

  const [paymentSchedule, setPaymentSchedule] = useState<{
    schedule: [];
    perInstallmentAmount: number;
  }>();

  const handleSubmit = async (payload: any) => {
    const response = await axios.post("/api", { data: payload });

    setPaymentSchedule(response?.data);
  };

  return (
    <>
      {!showCalculator && (
        <div className="min-h-screen flex justify-center items-center">
          <Button
            type="primary"
            className="w-[30%] bg-blue-500"
            onClick={() => setShowCalculator(true)}
          >
            Show Calculator
          </Button>
        </div>
      )}
      {showCalculator && (
        <Space className="flex justify-center min-h-screen">
          <Form
            className="text-center m-10"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Title level={2}>Mortgage Calculator</Title>
            <Form.Item
              label={
                <p className="text-lg font-semibold dark:text-gray-500">
                  Property Price
                </p>
              }
              rules={[
                {
                  required: true,
                  message: "Please Enter a Valid Property Price",
                },
                { pattern: /^[0-9,]+$/, message: "Only numbers are allowed!" },
              ]}
              name="propertyValue"
              required
              tooltip="Please enter the total price of the property"
            >
              <InputNumber
                size="large"
                placeholder="Property Value"
                addonBefore={
                  <HomeOutlined className="text-lg dark:text-gray-500" />
                }
                onChange={(val: number) => {
                  setPropertyValue(val);
                }}
                prefix="$"
                style={{ width: "100%" }}
                formatter={currencyFormatter}
                parser={currencyParser}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter a valid Down Payment Amount",
                },
                { pattern: /^[0-9,]+$/, message: "Only numbers are allowed!" },
                {
                  validator(_, value) {
                    if (value && value > propertyValue! / 4) {
                      return Promise.reject(
                        "Value cannot be greater than 25% of Property Value"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              label={
                <p className="text-lg font-semibold dark:text-gray-600">
                  Down Payment
                </p>
              }
              name="downPayment"
              required
              tooltip="Please enter the amount for down payment"
            >
              <InputNumber
                type="float"
                size="large"
                placeholder="Advance Payment"
                onChange={(e) => setDownPayment(e?.target?.value)}
                value={downPayment}
                addonBefore={
                  <DownCircleOutlined className="text-lg dark:text-gray-500" />
                }
                prefix="$"
                style={{ width: "100%" }}
                formatter={currencyFormatter}
                parser={currencyParser}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter a valid Rate of Interest",
                },
                {
                  pattern: /^[0-9.]+$/,
                  message: "Only Numbers and decimals are allowed!",
                },
              ]}
              label={
                <p className="text-lg font-semibold dark:text-gray-700">
                  Rate of Interest
                </p>
              }
              name="annualInterest"
              required
              tooltip="Please enter the rate of interest"
            >
              <InputNumber
                type="float"
                min={1}
                precision={2}
                step={0.1}
                max={100}
                size="large"
                placeholder="Annual Rate of Interest"
                onChange={(val) => setAnnualRateOfInterest(val!)}
                value={annualRateOfInterest}
                addonBefore={
                  <PercentageOutlined className="text-lg dark:text-gray-500" />
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please select a valid Ammortization Period",
                },
              ]}
              label={
                <p className="text-lg font-semibold dark:text-gray-800">
                  Ammortization Period
                </p>
              }
              name="ammortizationPeriod"
              required
              tooltip="Please select the ammortization period"
            >
              <Select
                size="large"
                placeholder="Select Loan Term"
                options={[
                  { value: 5, label: "5 years" },
                  { value: 10, label: "10 years" },
                  { value: 15, label: "15 years" },
                  { value: 20, label: "20 years" },
                  { value: 25, label: "25 years" },
                  { value: 30, label: "30 years" },
                ]}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please select a valid Payment Frequency",
                },
              ]}
              label={
                <p className="text-lg font-semibold dark:text-gray-800">
                  Payment Frequency
                </p>
              }
              name="paymentFrequecy"
              required
              tooltip="Please select the Payment Frequency"
            >
              <Radio.Group size="large">
                <Radio.Button className="mx-3" value="acceleratedBiWeekly">
                  Accelerated Bi-Weekly
                </Radio.Button>
                <Radio.Button className="mx-3" value="biweekly">
                  Bi-Weekly
                </Radio.Button>
                <Radio.Button className="mx-3" value="monthly">
                  Monthly
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter a Valid Property Price",
                },
              ]}
            >
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="w-[50%] bg-blue-500"
              >
                Compute Payment Schedule
              </Button>
            </Form.Item>
          </Form>
        </Space>
      )}
      {paymentSchedule && paymentSchedule?.schedule?.length > 0 && (
        <div className="text-center">
          <Title className="dark:text-gray-700">{`Your Monthly Installment will be : $${paymentSchedule?.perInstallmentAmount.toFixed(
            2
          )} `}</Title>
          <Text className="text-gray-600 dark:text-gray-700 text-lg text-semibold">
            Please refer below for Payment schedule
          </Text>
          <Table
            className="my-5"
            pagination={{ pageSize: 50 }}
            columns={columns}
            dataSource={paymentSchedule?.schedule}
            size="middle"
          />
        </div>
      )}
    </>
  );
}
