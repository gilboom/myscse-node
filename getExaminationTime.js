const cheerio = require('cheerio')
const request = require('request-promise-native')
const iconv = require('iconv-lite')
const log = console.log.bind(console)

async function getExaminationTime(context) {
        const options = {
                method: 'GET',
                uri: context.uriList.get('考试时间表'),
                headers:{
                        cookie:context.cookie
                },
                encoding: null,
                transform(body) {
                        return cheerio.load(iconv.decode(body,'GBK'))
                }
        }
        const $ = await request(options)
        const length = Array.from($('.table>tbody>tr')).length
        // log(length)
        // log($('.table>tbody>tr:nth-child(1)').text().trim().split('\n'))
        const examinationTime = []
        for(let i = 1; i<=length ; i++) {
                const element = $(`.table>tbody>tr:nth-child(${i})`).text().trim().split('\n')
                examinationTime.push({
                        code:element[0],
                        name:element[1],
                        date:element[2],
                        time:element[3],
                        placeCode:element[4],
                        placeName:element[5],
                        position:element[6],
                        status:element[7]
                })
        }
        // log(examinationTime)
        return examinationTime
}

module.exports = getExaminationTime