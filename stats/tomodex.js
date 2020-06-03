const request = require('request')
const urljoin = require('url-join')
const config = require('config')

const push = ({ table, domain, name, address, type, value }) => {
    return new Promise((resolve, reject) => {
        let url = urljoin(`https://metrics.tomochain.com`, 'write', '?db=tomodex')
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
            if (response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 204) {
                return reject(body)
            }

            return resolve(body)
        })

    })
}

module.exports = {
    push
}
