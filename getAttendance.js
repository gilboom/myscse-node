const cheerio = require('cheerio')
const request = require('request-promise-native')
const iconv = require('iconv-lite')
const log = console.log.bind(console)

async function getAttendance(context) {
        const options = {
                method: 'GET',
                uri: context.uriList.get('考勤信息'),
                headers:{
                        cookie:context.cookie
                },
                encoding: null,
                transform(body) {
                        return cheerio.load(iconv.decode(body,'GBK'))
                }
        }
        const $ = await request(options)
        const codeArray = Array.from($('#table1>tbody>tr>td:first-child')).map(function(element) {
                return element.children[0].data
        })
        const nameArray = Array.from($('#table1>tbody>tr>td:nth-child(2)')).map(function(element) {
                return element.children[0].data
        })
        const attendanceArray = Array.from($('#table1>tbody>tr>td:nth-child(3)')).map(function(element) {
                if(element.firstChild === null) return ''
                if(/(请假)|(迟到)|(旷课)/.test(element.firstChild.data)) {
                        const times = element.children[1].firstChild.data
                        return element.children[0].data+times+']'
                }
                return element.children[0].data
        })
        // log(codeArray)
        // log(nameArray)
        // log(attendanceArray)
        const attendance = []
        for(let i = 0; i < codeArray.length ; i++) {
                attendance.push({
                        code:codeArray[i],
                        name:nameArray[i],
                        attendance:attendanceArray[i]
                })
        }
        log(attendance)
}

module.exports = getAttendance