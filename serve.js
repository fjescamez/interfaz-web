// serve.js
const serve = require('serve');

const server = serve('dist', {
  port: 5174,
  ignore: ['node_modules'],
  single: true,  // para SPA
});

console.log('Frontend corriendo en http://localhost:5174');
