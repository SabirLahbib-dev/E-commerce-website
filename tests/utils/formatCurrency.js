import { formatCurrency } from "../../scripts/utils/formatCurrency.js";

describe("test suite: formatCurrency", () => {
  it("Converts cents into dollars", () => {
    expect(formatCurrency(2099)).toEqual("20.99");
  });

  it("Works correctly with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("Rounds up when the decimal part is 5 or greater", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
  it("rounds down when the decimal part is less than 5", () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });

  it("handles negative numbers correctly", () => {
    expect(formatCurrency(-1090)).toEqual("-10.90");
  });
  it("Rounds 1 cent correctly", () => {
    expect(formatCurrency(1)).toEqual("0.01");
  });
});
