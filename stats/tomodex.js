const request = require('request')
const urljoin = require('url-join')
const config = require('config')

const push = ({ table, domain, name, address, type, value }) => {
    return new Promise((resolve, reject) => {
        let url = urljoin(config.get('stats.uri'), 'write', '?db=tomodex')
        let username = process.env.STATS_USERNAME || config.get('stats.username')
        let password = process.env.STATS_PASSWORD || config.get('stats.password')
        let auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        let data = `
            ${table},address=${address},name=${name},domain=${domain},type=${type} value=${value}
            `
        let options = {
            method: 'POST',
            url: url,
            encoding: null,
            headers: {
                Authorization: auth
            },
            body: Buffer.from(data, 'utf-8')
        }
        request(options, (error, response, body) => {
            if (error) {
                return reject(error)
            }
            console.log(`Stats ${response.statusCode} ${table},address=${address},name=${name},domain=${domain},type=${type} value=${value}`)
            if (response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 204) {
                return reject(body)
            }

            return resolve(body)
        })

    })
}

const saveTotalTrades = ({ pair, duration, env, value }) => {
    return new Promise((resolve, reject) => {
        let url = urljoin(config.get('stats.uri'), 'write', '?db=tomodex')
        let username = process.env.STATS_USERNAME || config.get('stats.username')
        let password = process.env.STATS_PASSWORD || config.get('stats.password')
        let auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        let data = `
            total_trades,pair=${pair},duration=${duration},env=${env} value=${value}
            `
        let options = {
            method: 'POST',
            url: url,
            encoding: null,
            headers: {
                Authorization: auth
            },
            body: Buffer.from(data, 'utf-8')
        }
        request(options, (error, response, body) => {
            if (error) {
                return reject(error)
            }
            console.log(`Stats ${response.statusCode} total_trades,pair=${pair},duration=${duration},env=${env} value=${value}`)
            if (response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 204) {
                return reject(body)
            }

            return resolve(body)
        })

    })
}

const saveTotalUsers = ({ pair, duration, env, value }) => {
    return new Promise((resolve, reject) => {
        let url = urljoin(config.get('stats.uri'), 'write', '?db=tomodex')
        let username = process.env.STATS_USERNAME || config.get('stats.username')
        let password = process.env.STATS_PASSWORD || config.get('stats.password')
        let auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        let data = `
            total_users,pair=${pair},duration=${duration},env=${env} value=${value}
            `
        let options = {
            method: 'POST',
            url: url,
            encoding: null,
            headers: {
                Authorization: auth
            },
            body: Buffer.from(data, 'utf-8')
        }
        request(options, (error, response, body) => {
            if (error) {
                return reject(error)
            }
            console.log(`Stats ${response.statusCode} total_users,pair=${pair},duration=${duration},env=${env} value=${value}`)
            if (response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 204) {
                return reject(body)
            }

            return resolve(body)
        })

    })
}

const saveTotalLendingUsers = ({ pair, duration, env, value }) => {
    return new Promise((resolve, reject) => {
        let url = urljoin(config.get('stats.uri'), 'write', '?db=tomodex')
        let username = process.env.STATS_USERNAME || config.get('stats.username')
        let password = process.env.STATS_PASSWORD || config.get('stats.password')
        let auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        let data = `
            total_lending_users,pair=${pair},duration=${duration},env=${env} value=${value}
            `
        let options = {
            method: 'POST',
            url: url,
            encoding: null,
            headers: {
                Authorization: auth
            },
            body: Buffer.from(data, 'utf-8')
        }
        request(options, (error, response, body) => {
            if (error) {
                return reject(error)
            }
            console.log(`Stats ${response.statusCode} total_lending_users,pair=${pair},duration=${duration},env=${env} value=${value}`)
            if (response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 204) {
                return reject(body)
            }

            return resolve(body)
        })

    })
}

const saveBalances = (balances) => {
    return new Promise((resolve, reject) => {
        let url = urljoin(config.get('stats.uri'), 'write', '?db=tomodex')
        let username = process.env.STATS_USERNAME || config.get('stats.username')
        let password = process.env.STATS_PASSWORD || config.get('stats.password')
        let auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        let data = ''
        balances.forEach((balance) => {
            let { address, tokenAddress, tokenSymbol, type, value } = balance
            console.log(`balances,address=${address},tokenAddress=${tokenAddress},tokenSymbol=${tokenSymbol},type=${type} value=${value}`)
            data = data + `
            balances,address=${address},tokenAddress=${tokenAddress},tokenSymbol=${tokenSymbol},type=${type} value=${value}
            `
        })

        let options = {
            method: 'POST',
            url: url,
            encoding: null,
            headers: {
                Authorization: auth
            },
            body: Buffer.from(data, 'utf-8')
        }
        request(options, (error, response, body) => {
            console.log(`Stats ${response.statusCode}`)
            if (error) {
                return reject(error)
            }
            if (response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 204) {
                return reject(body)
            }

            return resolve(body)
        })

    })
}

module.exports = {
    push,
    saveBalances,
    saveTotalTrades,
    saveTotalUsers,
    saveTotalLendingUsers
}
