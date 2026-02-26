export default {
  'src/**/*.{ts,tsx}': (files) => [
    `eslint --fix ${files.map((f) => `"${f}"`).join(' ')}`,
    `prettier --write ${files.map((f) => `"${f}"`).join(' ')}`,
  ]
}