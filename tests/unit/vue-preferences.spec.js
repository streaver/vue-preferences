import { preference } from "@/vue-preferences.js";

describe("VuePreferences#preference", () => {
  let subject;

  beforeEach(() => {
    subject = preference("surname");
  });

  it("returns an object with get/set functions", () => {
    expect(subject.get).toBeInstanceOf(Function);
    expect(subject.set).toBeInstanceOf(Function);
  });

  it("set function saves the value to window.localStorage", () => {
    expect(localStorage.getItem("surname")).toBe(null);
  });
});
