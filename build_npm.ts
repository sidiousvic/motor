// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: { deno: true },
  package: {
    name: "motor",
    version: Deno.args[0],
    description: "⚙️ A no-frills FSM module.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/sidiousvic/motor.git",
    },
    bugs: { url: "https://github.com/sidious/motor/issues" },
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
