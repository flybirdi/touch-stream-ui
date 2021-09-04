/* eslint-disable import/no-extraneous-dependencies */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer({ env: 'last 2 versions' }),
    cssnano({ preset: 'default', zindex: false }),
  ],
};
