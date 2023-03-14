let db = require(`${__dirname}/../database/connect`)

class Transaction {

    static getQueryPromise(sql, params) {
        return new Promise((resolve, reject) => {
            db.query(sql, params, (error, result) => {
                if (error) reject(error)
                resolve(result)
            })
        })
    }

    static getAllTransactions() {
        return this.getQueryPromise('select * from transaction ', [])
    }

    static getOneTransaction(id) {
        return this.getQueryPromise('select * from transaction where id = ?', [id])
    }
    static createTransaction(text, amount = 0) {
        return this.getQueryPromise('insert into transaction (text, amount) value (?,?)', [text, amount])
    }

    static deleteTransaction(id) {
        return this.getQueryPromise('delete from transaction where id = ? ', [id])
    }
}

module.exports = Transaction