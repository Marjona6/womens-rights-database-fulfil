import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import purgecss from '@fullhuman/postcss-purgecss'

export default {
  plugins: [
    postcssImport,
    tailwindcss,
    autoprefixer,
    ...(process.env.NODE_ENV === 'production'
      ? [
          purgecss({
            content: ['./index.html', './src/**/*.tsx', './pages/**/*.tsx'],
            defaultExtractor: (content) =>
              content.match(/[A-Za-z0-9-_:/]+/g) || [], // Specify the default extractor for PurgeCSS
          }),
        ]
      : []),
  ],
}
