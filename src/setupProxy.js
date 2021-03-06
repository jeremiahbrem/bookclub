const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://openlibrary.org',
      changeOrigin: true,
    })
  );
  app.use(
    '/b',
    createProxyMiddleware({
      target: 'http://covers.openlibrary.org',
      changeOrigin: true,
    })
  );
  app.use(
    '/db/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};