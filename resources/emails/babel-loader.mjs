import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Load Babel register in transpile mode
require("@babel/register")({
  extensions: [".js", ".jsx"],
  ignore: [/node_modules/],
  presets: ["@babel/preset-env", "@babel/preset-react"]
});
