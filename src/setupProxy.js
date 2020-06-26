const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api/case', {
            target: 'https://icm-services-testing.apprisen.com',
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware('/api/client', {
            target: 'https://icm-services-testing.apprisen.com',
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware('/api/payment', {
            target: 'https://icm-services-testing.apprisen.com',
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware('/api/account', {
            target: 'https://login.apprisen.com',
            changeOrigin: true
        })
    );
};