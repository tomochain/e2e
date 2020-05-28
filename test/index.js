const request = require('request')
const urljoin = require('url-join')

afterEach(async function() {
    if (this.currentTest.state === 'failed') {
        let slackUri = process.env.SLACK_URI
        let p = new Promise(async (resolve, reject) => {
            let url = urljoin(slackUri)
            console.log(this.currentTest)
            let data = {
                text: process.env.NODE_ENV + ' ' + this.currentTest
            }
            let options = {
                method: 'POST',
                url: url,
                json: true,
                headers: {
                    'content-type': 'application/json'
                },
                body: data
            }
            request(options, (error, response, body) => {
                if (error) {
                    return reject(error)
                }
                if (response.statusCode !== 200 && response.statusCode !== 201) {
                    return reject(body)
                }
          
                return resolve(body)
            })

        })
        await p
    }
})
