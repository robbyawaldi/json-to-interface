export function jsonToInterface(jsonObj: any, interfaceName?: string) {
  let interfaceStr = interfaceName
    ? `export interface ${interfaceName} {\n`
    : `{\n`;

  for (const [key, value] of Object.entries(jsonObj)) {
    if (value === null) {
      interfaceStr += `${key}: null;\n`;
    } else if (typeof value === "object" && !Array.isArray(value)) {
      interfaceStr += `${key}: ${jsonToInterface(value)}`;
    } else if (Array.isArray(value)) {
      let arrayType: string;
      if (value.length === 0 || typeof value[0] !== "object") {
        arrayType = `${typeof value[0]}[]`;
      } else {
        arrayType = `Array<${jsonToInterface(value[0])}>`;
      }
      interfaceStr += `${key}: ${arrayType};\n`;
    } else {
      interfaceStr += `${key}: ${typeof value};\n`;
    }
  }

  interfaceStr += `}`;
  return interfaceStr;
}
