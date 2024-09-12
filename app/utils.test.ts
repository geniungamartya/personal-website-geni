// formatDateString.test.ts

import { describe, it, expect } from "vitest";
import { formatDateString } from "./utils";

describe("formatDateString", () => {
  it("should format the date correctly", () => {
    const date = "2024-06-30";
    const formattedDate = formatDateString(date);
    expect(formattedDate).toBe("June 30, 2024");
  });

  it("should format another date correctly", () => {
    const date = "2023-01-17";
    const formattedDate = formatDateString(date);
    expect(formattedDate).toBe("January 17, 2023");
  });

  it("should handle invalid date strings", () => {
    const date = "invalid-date";
    const formattedDate = formatDateString(date);
    expect(formattedDate).toBe("Invalid Date");
  });

  it("should handle empty date strings", () => {
    const date = "";
    const formattedDate = formatDateString(date);
    expect(formattedDate).toBe("Invalid Date");
  });
});
