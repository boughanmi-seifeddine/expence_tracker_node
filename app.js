const express = require('express');
let morgan = require('morgan')
const app = express();
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))
app.use(express.json());

const transactionRouter = require('./routes/transactionRoutes');
app.use('/api/v1/transactions', transactionRouter);
const port = process.env.PORT || 3001;
app.listen(3001, () => {
    console.log(`App running on port ${port}......`);
});
module.exports = app

