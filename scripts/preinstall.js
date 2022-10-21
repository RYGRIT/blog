if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository requires using pnpm as the package manager for scripts to work properly.\u001b[39m\n\u001b[32mPlease install it globally with \u001b[32m` +
      '\u001b[35m`npm i -g pnpm`\u001b[0m\n'
  )
  process.exit(1)
}
