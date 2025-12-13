import { Command } from "commander";
import { generateOpenApiDoc } from "./generateOpenApi";

const program = new Command();

program
  .name("transit-kit")
  .description("CLI of the transitKit backend framework")
  .version("1.0.0");

program.command("generate-openapi").action(async () => {
  console.log("ola");
  const generatedDoc = await generateOpenApiDoc();
  console.log(JSON.stringify(generatedDoc, null, 2));
});

program.parse();
