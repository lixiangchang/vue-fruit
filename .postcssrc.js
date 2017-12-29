// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    // to edit target browsers: use "browserslist" field in package.json
    require('postcss-import'),
    require('postcss-lazyimagecss'),
    require('postcss-pxtorem')({
      rootValue: 40,
      prop_white_list: [],
      mediaQuery: false,
      selectorBlackList: [/html/, /\.wrapper/, /\.header/, /\.baseWidth/],
      minPixelValue: 2
    }),
    require('autoprefixer')({
      browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
    }),
    require('cssnano')
  ]
}
