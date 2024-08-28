module.exports = {
  plugins: {
    'postcss-import': {}, // Adiciona suporte para @import no CSS
    'tailwindcss/nesting': {}, // Para habilitar nesting no TailwindCSS
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true, // Ativa as regras de nesting
      },
    },
  },
};
