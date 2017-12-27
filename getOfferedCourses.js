const cheerio = require('cheerio')
const request = require('request-promise-native')
const iconv = require('iconv-lite')
const log = console.log.bind(console)

async function getOfferedCourses(context) {
        const options = {
                method: 'GET',
                uri: context.uriList.get('查看开设课程'),
                headers:{
                        cookie:context.cookie
                },
                encoding: null,
                transform(body) {
                        return cheerio.load(iconv.decode(body,'GBK'))
                }
        }
        const $ = await request(options)
        let length = Array.from($('body > div > p:nth-child(5) > table:nth-child(1) > tbody > tr')).length - 2
        // log(length)
        // log($('.table>tbody>tr:nth-child(1)').text().trim().split('\n'))
        let offeredCourses = []
        if(length > 0) {
                const table = $(`body > div > p:nth-child(5) > table:nth-child(1) > tbody`)
                for(let i = 1; i<=length ; i++) {
                        const row = table.find(`tr:nth-child(${2+i})`)
                        offeredCourses.push({
                                code:row.find(`td:nth-child(1)`).text(),
                                name:row.find(`td:nth-child(2)`).text(),
                                credit:row.find(`td:nth-child(3)`).text(),
                                way:row.find(`td:nth-child(4)`).text(),
                                advanced:row.find(`td:nth-child(5)`).text(),
                                together:row.find(`td:nth-child(6)`).text(),
                        })
                }
        }
        // log(offeredCourses)
        // log($(`body > div > p:nth-child(5) > table:nth-child(1) > tbody > tr:nth-child(${2+1})`).find('td:nth-child(1)').text())
        return offeredCourses
}

module.exports = getOfferedCourses