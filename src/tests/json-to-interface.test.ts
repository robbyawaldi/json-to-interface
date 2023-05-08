import { describe, expect, test } from "bun:test";
import { jsonToInterface } from "../json-to-interface.js";

describe("jsonToInterface", () => {
  test("should return an interface string for a simple JSON object", () => {
    const jsonObj = { name: "John", age: 30 };
    const expected = `{\nname: string;\nage: number;\n}`;
    expect(jsonToInterface(jsonObj)).toEqual(expected);
  });

  test("should return an interface string with a custom name for a simple JSON object", () => {
    const jsonObj = { name: "John", age: 30 };
    const interfaceName = "Person";
    const expected = `export interface Person {\nname: string;\nage: number;\n}`;
    expect(jsonToInterface(jsonObj, interfaceName)).toEqual(expected);
  });

  test("should return an interface string for a nested JSON object", () => {
    const jsonObj = {
      name: "John",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: 12345,
      },
    };
    const expected = `export interface Person {\nname: string;\naddress: {\nstreet: string;\ncity: string;\nstate: string;\nzip: number;\n}}`;
    expect(jsonToInterface(jsonObj, "Person")).toEqual(expected);
  });

  test("should return an interface string for an array of simple types", () => {
    const jsonObj = { ages: [30, 40, 50] };
    const expected = `{\nages: number[];\n}`;
    expect(jsonToInterface(jsonObj)).toEqual(expected);
  });

  test("should return an interface string for an array of objects", () => {
    const jsonObj = {
      people: [
        { name: "John", age: 30 },
        { name: "Jane", age: 40 },
      ],
    };
    const expected = `{\npeople: Array<{\nname: string;\nage: number;\n}>;\n}`;
    expect(jsonToInterface(jsonObj)).toEqual(expected);
  });

  test("should return an interface string for an empty object", () => {
    const jsonObj = {};
    const expected = `{\n}`;
    expect(jsonToInterface(jsonObj)).toEqual(expected);
  });

  test("should return an interface string for an object with null values", () => {
    const jsonObj = { name: null, age: null };
    const expected = `{\nname: null;\nage: null;\n}`;
    expect(jsonToInterface(jsonObj)).toEqual(expected);
  });
});
