import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Flat config: ESLint 9 no longer reads .eslintrc.json by default, and Next 16
// removed `next lint`, so the lint script now calls eslint directly.
const config = [
  { ignores: [".next/**", "node_modules/**", "media/**", "migrations/**", "payload-types.ts", "app/(payload)/admin/importMap.js"] },
  ...nextCoreWebVitals
];

export default config;
