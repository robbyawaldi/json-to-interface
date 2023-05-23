import { program } from "commander";
import fs from "fs";
import path from "path";
import { jsonToInterface } from "../json-to-interface.js";
import prettier from "prettier";
import config from "./prettier.config.js";

program
  .command("convert")
  .option("-f --file <value>", "JSON file")
  .option("-n --name <value>", "Interface name")
  .description("Convert json to interface typescript")
  .action((options) => {
    try {
      const file = fs.readFileSync(path.join("./", options.file), "utf-8");
      const object = JSON.parse(file);
      const interfaces = jsonToInterface(object, options.name);
      const formattedCode = prettier.format(interfaces, config);
      console.log(formattedCode);
    } catch (err) {
      console.log(err);
    }
  });

program.parse(process.argv);
