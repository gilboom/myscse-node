const cheerio = require('cheerio')
const request = require('request-promise-native')
const iconv = require('iconv-lite')
const log = console.log.bind(console)

async function getIllegalInfo(context) {
        const options = {
                method: 'GET',
                uri: context.uriList.get('晚归、违规用电记录'),
                headers:{
                        cookie:context.cookie
                },
                encoding: null,
                transform(body) {
                        return cheerio.load(iconv.decode(body,'GBK'))
                }
        }
        const $ = await request(options)
        let length = Array.from($('#form1 > table.table > tbody>tr')).length
        // log(length)
        let electricityViolation = []
        if(length > 0) {
                const table = $(`#form1 > table.table > tbody`)
                for(let i = 1; i<=length ; i++) {
                        const row = table.find(`tr:nth-child(${i})`)
                        electricityViolation.push({
                                year:row.find(`td:nth-child(1)`).text(),
                                term:row.find(`td:nth-child(2)`).text(),
                                dorm:row.find(`td:nth-child(3)`).text(),
                                date:row.find(`td:nth-child(4)`).text(),
                                times:row.find(`td:nth-child(5)`).text(),
                                days:row.find(`td:nth-child(6)`).text(),
                                reason:row.find(`td:nth-child(7)`).text(),
                                isResponsible:row.find(`td:nth-child(8)`).text(),
                        })
                }
        }

        // log(electricityViolation)

        return electricityViolation
}

module.exports = getIllegalInfo