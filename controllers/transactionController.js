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
exports.getTransaction = (req, res, next) => {
    transaction.getOneTransaction(req.params.id).then((data) => {
        req.oneTransaction = JSON.stringify(data)
        next();
    })
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
exports.getOne = (req, res) => {
    transaction.getOneTransaction(req.params.id).then((data) => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: "success",
                data: data
            }))
    })
       .catch((e) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 'error',
            message: "error with sql query...",
            detail: e
        }))
    })
}
exports.create = (req, res) => {
    transaction.createTransaction(req.body.text, req.body.amount).then((data) => {
        transaction.getOneTransaction(data.insertId).then((data) => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: "success",
                data: data
            }))
        })
    }).catch((e) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            status: 'error',
            message: "error with sql query...",
            detail: "sql syntax error"
        }))
    })
}
exports.remove = (req, res) => {
    const id = req.params.id
    if (req.oneTransaction) {
        const oneTransaction = JSON.parse(req.oneTransaction)
        transaction.deleteTransaction(id).then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: " deleted successfully ...",
                data: oneTransaction
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

}
