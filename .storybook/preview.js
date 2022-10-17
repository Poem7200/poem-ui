import '../src/styles/index.scss'

export const parameters = {
  // 配置全局的parameters
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}