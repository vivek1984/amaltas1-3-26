

import path from "path";
import { fileURLToPath } from "url";
import { render } from "@react-email/render";
import React from "react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateName = process.argv[2];
const props = JSON.parse(process.argv[3] || "{}");

const templatePath = path.join(__dirname, "build", `${templateName}.js`);


try {
  const templateModule = await import(templatePath);
  const Template = templateModule.default;

  const element = React.createElement(Template, props);

  // ⭐ The critical fix — await the render operation
  const html = await render(element);

  console.log(html);
} catch (error) {
  console.error("EMAIL RENDER ERROR:", error);
}
