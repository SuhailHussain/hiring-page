// Copies the compiled govuk-frontend CSS/JS and its fonts/images into
// assets. The compiled CSS references fonts and images with paths rooted
// at /assets/..., which breaks when the site is served from a subpath
// (e.g. GitHub Pages project sites at <user>.github.io/<repo>/). Since the
// CSS file itself lives in assets/ alongside fonts/ and images/, rewriting
// those to relative paths makes them resolve correctly regardless of the
// site's base path.
const fs = require('fs');
const path = require('path');

const srcBase = path.join(__dirname, 'node_modules', 'govuk-frontend', 'dist', 'govuk');
const destBase = path.join(__dirname, 'assets');

fs.mkdirSync(destBase, { recursive: true });

const css = fs.readFileSync(path.join(srcBase, 'govuk-frontend.min.css'), 'utf8')
  .replace(/\/assets\/fonts\//g, 'fonts/')
  .replace(/\/assets\/images\//g, 'images/');
fs.writeFileSync(path.join(destBase, 'govuk-frontend.min.css'), css);
fs.copyFileSync(
  path.join(srcBase, 'govuk-frontend.min.js'),
  path.join(destBase, 'govuk-frontend.min.js')
);
fs.cpSync(path.join(srcBase, 'assets', 'fonts'), path.join(destBase, 'fonts'), { recursive: true });
fs.cpSync(path.join(srcBase, 'assets', 'images'), path.join(destBase, 'images'), { recursive: true });

console.log('govuk-frontend assets copied to assets');
