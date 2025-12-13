import { Command } from "commander";
import fs from "fs";
import { generateOpenApiDoc } from "./generateOpenApi";

const program = new Command();

program
  .name("transit-kit")
  .description("CLI of the transitKit backend framework")

  .version("1.0.0");

program
  .command("generate-openapi")
  .option(
    "-o, --output <path>",

    "Output path for the generated OpenAPI document",
    "openapi.json",
  )
  .option(
    "-t, --target <path>",
    "Target path to search for endpoint definitions",
    ".",
  )
  .action(async (options) => {
    const { output, target } = options;

    const generatedDoc = await generateOpenApiDoc(target);

    fs.writeFileSync(output, JSON.stringify(generatedDoc, null, 2), {
      encoding: "utf-8",
    });
    console.log(`OpenAPI document generated at: ${output}`);
  });

program.parse();
