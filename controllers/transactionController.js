const transaction = require(`${__dirname}/../models/transactionsModel`)
exports.checkBody = (req, res, next) => {
    if (!req.body.amount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing amount '
        });
    }
    next();
};

exports.getAll = (req, res) => {
    transaction.getAllTransactions().then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({
            status: "success",
            length: data.length,
            data: data
        }))
    }).catch((e) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 'error',
            message: "error with sql query...",
            detail: "error"
        }))
    })
}
exports.create = (req, res) => {
    transaction.createTransaction(req.body.text, req.body.amount).then((data) => {
        const createdId = data.insertId - 1
        transaction.getAllTransactions().then((data) => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: "success",
                data: data[createdId]
            }))
        })
    }).catch((e) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 'error',
            message: "error with sql query...",
            detail: e.sqlMessage
        }))
    })
}
exports.remove = (req, res) => {
    const id = req.params.id
    transaction.deleteTransaction(id).then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: " deleted successfully ...",
            data: data
        }))
    }).catch((e) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 'error',
            message: "error with sql query...",
            detail: e.sqlMessage
        }))
    })
}
