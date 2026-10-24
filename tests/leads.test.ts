import { describe, it, expect } from "vitest";

describe("Lead Capture Validation Rules", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("should validate valid email formats", () => {
    expect(emailRegex.test("builder@example.com")).toBe(true);
    expect(emailRegex.test("ada.lovelace@tech.org")).toBe(true);
    expect(emailRegex.test("founder+alpha@startup.co.uk")).toBe(true);
  });

  it("should reject invalid email formats", () => {
    expect(emailRegex.test("notanemail")).toBe(false);
    expect(emailRegex.test("missingatsign.com")).toBe(false);
    expect(emailRegex.test("@missingusername.com")).toBe(false);
    expect(emailRegex.test("spaces in@email.com")).toBe(false);
  });

  it("should enforce minimum name length constraints", () => {
    const validateName = (name: string) => Boolean(name && name.trim().length >= 2);
    expect(validateName("A")).toBe(false);
    expect(validateName("")).toBe(false);
    expect(validateName("  ")).toBe(false);
    expect(validateName("Bo")).toBe(true);
    expect(validateName("Ada Lovelace")).toBe(true);
  });
});
