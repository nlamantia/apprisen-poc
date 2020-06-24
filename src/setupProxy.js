const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://icm-services-testing.apprisen.com',
            changeOrigin: true
        })
    );
};