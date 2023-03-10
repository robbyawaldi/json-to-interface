export function jsonToInterface(jsonObj: any, interfaceName?: string) {
  let interfaceStr = interfaceName
    ? `export interface ${interfaceName} {\n`
    : `{\n`;

  for (const [key, value] of Object.entries(jsonObj)) {
    if (value === null) {
      interfaceStr += `${key.trim()}: null;\n`;
    } else if (typeof value === "object" && !Array.isArray(value)) {
      interfaceStr += `${key.trim()}: ${jsonToInterface(value)}`;
    } else if (Array.isArray(value)) {
      let arrayType: string;
      if (value.length === 0 || typeof value[0].trim() !== "object") {
        arrayType = `${typeof value[0].trim()}[]`;
      } else {
        arrayType = `Array<${jsonToInterface(value[0].trim())}>`;
      }
      interfaceStr += `${key.trim()}: ${arrayType};\n`;
    } else {
      interfaceStr += `${key.trim()}: ${typeof value.trim()};\n`;
    }
  }

  interfaceStr += `}`;
  return interfaceStr;
}
