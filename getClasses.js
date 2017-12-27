const cheerio = require('cheerio')
const request = require('request-promise-native')
const iconv = require('iconv-lite')
const log = console.log.bind(console)

async function getClasses(context) {
        const options = {
                method: 'GET',
                uri: context.uriList.get('课程表'),
                headers:{
                        cookie:context.cookie
                },
                encoding: null,
                transform(body) {
                        return cheerio.load(iconv.decode(body,'GBK'))
                }
        }
        const $ = await request(options)
        const classesTd = $('tr[bgcolor="#FFFFFF"]>td[align="left"]')
        const subjectTimetable = new Map()
        for(let i = 1; i <= 7; i++) {
                subjectTimetable.set(i,new Map())
                const someday = subjectTimetable.get(i)
                for(let j = 1;j<=8;j++) {
                        someday.set(`第${1+(j-1)*2}-${1+1+(j-1)*2}节`,classesTd[(i-1)+7*(j-1)].children[0].data)
                }
        }
        // log($('tr[bgcolor="#FFFFFF"]>td')[0].children[0].data)
        return subjectTimetable
}

module.exports = getClasses