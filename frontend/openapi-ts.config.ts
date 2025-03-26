import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./openapi.json", // OpenAPI spec from FastAPI
  output: {
    path: "./src/client",
    format: "prettier",
    lint: "eslint",
  }, // Where the API client will be generated
  plugins: [
    "legacy/fetch",
    {
      asClass: true,
      name: "@hey-api/sdk",
    },
    {
      name: "@hey-api/schemas",
      type: "json",
    },
  ], // Use fetch for API calls
});
