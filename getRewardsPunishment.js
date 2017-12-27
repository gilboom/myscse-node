const cheerio = require('cheerio')
const request = require('request-promise-native')
const iconv = require('iconv-lite')
const log = console.log.bind(console)

async function getRewardsPunishment(context) {
        const options = {
                method: 'GET',
                uri: context.uriList.get('奖惩记录'),
                headers:{
                        cookie:context.cookie
                },
                encoding: null,
                transform(body) {
                        return cheerio.load(iconv.decode(body,'GBK'))
                }
        }
        const $ = await request(options)
        let length = Array.from($('table:nth-child(4)>tbody>tr')).length - 2
        // log(length)
        // log($('.table>tbody>tr:nth-child(1)').text().trim().split('\n'))
        let rewards = []
        if(length > 0) {
                for(let i = 1; i<=length ; i++) {
                        const element = $(`table:nth-child(4)>tbody>tr:nth-child(${2+i})`).text().trim().split('\n\t\t\t  ')
                        rewards.push({
                                year:element[0],
                                term:element[1],
                                level:element[2],
                                reason:element[3],
                                apartment:element[4],
                                date:element[5],
                        })
                }
        }
        
        
        // log(rewards)
        length = Array.from($('table:nth-child(5)>tbody>tr')).length - 2
        const punishment = []
        if(length > 0) {
                for(let i = 1; i<=length ; i++) {
                        const element = $(`table:nth-child(5)>tbody>tr:nth-child(${2+i})`).text().trim().split('\n\t\t\t  ')
                        punishment.push({
                                year:element[0],
                                term:element[1],
                                level:element[2],
                                reason:element[3],
                                apartment:element[4],
                                date:element[5],
                                suggestion:element[6],
                                person:element[7]
                        })
                }
        }
        const rewardsPunishment = {rewards,punishment}

        return rewardsPunishment
}

module.exports = getRewardsPunishment