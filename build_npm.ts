// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: { deno: true },
  package: {
    name: "@sidiousware/motor",
    version: Deno.args[0],
    description: "A no-frills finite state machine module.",
    license: "MIT",
    scripts: { "semantic-release": "semantic-release --branches prod" },
    release: { branches: ["prod"] },
    repository: {
      type: "git",
      url: "git+https://github.com/sidiousvic/motor.git",
    },
    bugs: {
      url: "https://github.com/sidiousvic/motor/issues",
    },
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
