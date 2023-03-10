# JSON To Interface

The **`jsonToInterface`** function generates TypeScript interface from a given JSON object.

To install dependencies:

```bash
bun install
```

To test:

```bash
bun test
```

## Parameters

- `jsonObj` : a JSON object
- `interfaceName` (optional) : a string representing the name of the interface. If not provided, the interface will be anonymous.

## Return

- A string containing the TypeScript interface.

## Example

```ts
const exampleJson = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipcode: 10001,
  },
  hobbies: ["reading", "running"],
};

const interfaceString = jsonToInterface(exampleJson, "Person");
console.log(interfaceString);
```

## Output

```ts
export interface Person {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: number;
  };
  hobbies: string[];
}
```

## Description

The function `jsonToInterface` takes in a JSON object and an optional interface name. The function then recursively traverses the JSON object and generates a TypeScript interface based on the keys and values of the JSON object.

The function handles different types of values in the JSON object as follows:

- If the value is `null`, the generated interface property will have the type `null`.
- If the value is an `object` and not an `array`, the function recursively generates an interface for the object and sets the property type to the generated interface.
- If the value is an `array`, the function determines the type of the array elements.
- If the array elements are objects, the function recursively generates an interface for the array elements and sets the property type to `Array<generatedInterface>`.

For all other types of values, the generated interface property will have the type typeof value.
The function returns a string containing the generated TypeScript interface. If an interface name is provided, the interface will be named using the provided name. Otherwise, an anonymous interface will be generated. The generated interface string includes the export keyword to make it available for use in other modules.
