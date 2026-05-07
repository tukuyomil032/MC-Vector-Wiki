export default {
  'src/**/*.{ts,tsx}': (files) => [
    `oxlint  ${files.map((f) => `"${f}"`).join(' ')}`,
    `oxfmt --check ${files.map((f) => `"${f}"`).join(' ')}`,
  ]
}
