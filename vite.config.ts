import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "createElement",
    jsxInject: ["import { createElement } from 'inferno-create-element'"],
  },
  plugins: [
    babel({
      babelConfig: {
        plugins: [["babel-plugin-inferno"]],
      },
    }),
    tailwindcss(),
  ],
});
