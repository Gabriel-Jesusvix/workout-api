import tsconfigpaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    environmentMatchGlobs: [
      [
        "src/http/controllers/**",
        "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
      ],
    ],
  }
})