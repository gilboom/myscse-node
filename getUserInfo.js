const cheerio = require('cheerio')
const request = require('request-promise-native')
const iconv = require('iconv-lite')
const log = console.log.bind(console)

async function getUserInfo(context) {
        const options = {
                method: 'GET',
                uri: context.uriList.get('个人信息'),
                headers:{
                        cookie:context.cookie
                },
                encoding: null,
                transform(body) {
                        return cheerio.load(iconv.decode(body,'GBK'))
                }
        }
        const $ = await request(options)
        const studentInfoKey = Array.from($('.font12')).map(function(element) {
                return element.children[0].data
        })
        const studentInfoValue = Array.from($('.td_left')).map(function(element) {
                if(element.children[1]&& element.children[1].type==='tag') {
                        const data = element.children[1].children[0].data.trim()
                        return data
                }else if(element.firstChild!== null){
                        const data = element.children[0].data.trim()
                        if(data !== '') return data
                }
        })
        const studentInfo = getStudentInfoMap(studentInfoKey,studentInfoValue)
        // log(studentInfo)
        return studentInfo
}

function getStudentInfoMap(studentInfoKey,studentInfoValue) {
        const studentInfo = new Map()
        return studentInfo
                .set(studentInfoKey[0],studentInfoValue[0])
                .set(studentInfoKey[1],studentInfoValue[1])
                .set(studentInfoKey[2],studentInfoValue[2])
                .set(studentInfoKey[3],studentInfoValue[3])
                .set(studentInfoKey[4],studentInfoValue[4])
                .set(studentInfoKey[5],studentInfoValue[5])
                .set(studentInfoKey[6],studentInfoValue[8].replace('\n\t\t\t\t\t\t\t\t\t',''))
                .set(studentInfoKey[7],studentInfoValue[9])
                .set(studentInfoKey[8],studentInfoValue[10])

}

exports = module.exports = getUserInfo