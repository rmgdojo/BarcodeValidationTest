import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'dist/**',
    'build/**',
    '*.min.js',
    '*.min.css',
    '.cache/**',
    '.config/**',
    '.local/**',
    'public/**',
    'babel.config.js'
  ],),
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]);
