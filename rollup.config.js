import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        exports: "auto",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.mjs",
        format: "esm",
        exports: "auto",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: "src/cli/index.ts",
    output: {
      file: "dist/cli/index.cjs",
      format: "cjs",
      banner: "#!/usr/bin/env node",
    },
    plugins: [commonjs(), json(), typescript({ tsconfig: "./tsconfig.json" })],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
