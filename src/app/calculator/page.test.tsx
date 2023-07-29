import Calculator from "./page";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

describe("Calculator", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it("renders a mortgage Calculator", () => {
    const renderedComponent = render(<Calculator />);
    expect(screen.getByText("Mortgage Calculator")).toBeInTheDocument();
    expect(screen.getByText("Property Price")).toBeInTheDocument();
    expect(screen.getByText("Down Payment")).toBeInTheDocument();
    expect(screen.getByText("Rate of Interest")).toBeInTheDocument();
    expect(screen.getByText("Ammortization Period")).toBeInTheDocument();
    expect(screen.getByText("Payment Frequency")).toBeInTheDocument();
    expect(screen.getByText("Compute Payment Schedule")).toBeInTheDocument();
  });

  it("Property Value Text Field is getting correct Value", () => {
    const renderedComponent = render(<Calculator />);
    const propertyValueInputField =
      renderedComponent.getByPlaceholderText("Property Value");
    fireEvent.change(propertyValueInputField, { target: { value: 5000 } });

    expect(propertyValueInputField).toHaveValue("5,000");
  });

  it("Down Payment Text Field is getting correct Value", () => {
    const renderedComponent = render(<Calculator />);
    const downPaymentInputField =
      renderedComponent.getByPlaceholderText("Advance Payment");
    fireEvent.change(downPaymentInputField, { target: { value: 5000 } });

    expect(downPaymentInputField).toHaveValue("5,000");
  });

  it("Rate of Interest Text Field is getting correct Value", () => {
    const renderedComponent = render(<Calculator />);
    const downPaymentInputField = renderedComponent.getByPlaceholderText(
      "Annual Rate of Interest"
    );
    fireEvent.change(downPaymentInputField, { target: { value: 6.34 } });

    expect(downPaymentInputField).toHaveValue("6.34");
  });

  it("renders a button", () => {
    const renderedComponent = render(<Calculator />);
    expect(screen.getByText("Compute Payment Schedule")).toBeInTheDocument();
  });
});
