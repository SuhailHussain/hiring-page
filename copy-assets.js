// Copies the compiled govuk-frontend CSS/JS and its fonts/images into
// public/assets. The compiled CSS references fonts and images with
// absolute paths (e.g. /assets/fonts/..., /assets/images/...), so this
// folder layout has to be preserved exactly for styling to work.
const fs = require('fs');
const path = require('path');

const srcBase = path.join(__dirname, 'node_modules', 'govuk-frontend', 'dist', 'govuk');
const destBase = path.join(__dirname, 'public', 'assets');

fs.mkdirSync(destBase, { recursive: true });

fs.copyFileSync(
  path.join(srcBase, 'govuk-frontend.min.css'),
  path.join(destBase, 'govuk-frontend.min.css')
);
fs.copyFileSync(
  path.join(srcBase, 'govuk-frontend.min.js'),
  path.join(destBase, 'govuk-frontend.min.js')
);
fs.cpSync(path.join(srcBase, 'assets', 'fonts'), path.join(destBase, 'fonts'), { recursive: true });
fs.cpSync(path.join(srcBase, 'assets', 'images'), path.join(destBase, 'images'), { recursive: true });

console.log('govuk-frontend assets copied to public/assets');
