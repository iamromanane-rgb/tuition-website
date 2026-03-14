const path = require('path');

module.exports = {
  mode: 'jit',
  content: [
    path.resolve(__dirname, 'src/**/*.{js,jsx,ts,tsx}'),
  ],
};
