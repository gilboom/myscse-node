const login = require('./login.js')
const getUserInfo = require('./getUserInfo.js')
const getClasses = require('./getClasses')
const getAttendance = require('./getAttendance')
const getExaminationTime = require('./getExaminationTime')
const getRewardsPunishment = require('./getRewardsPunishment')
const getOfferedCourses = require('./getOfferedCourses')
const getIllegalInfo = require('./getIllegalInfo')
const log = console.log.bind(console)

const myscse = {}

Object.assign(myscse,{
        login,getUserInfo,getClasses,getAttendance,
        getExaminationTime,getRewardsPunishment,getOfferedCourses,
        getIllegalInfo
})



// async function main(username,password) {
//         const context = await login(username,password)
//         // const studentInfo = await getUserInfo(context)
//         // log(studentInfo)
//         // const classes = await getClasses(context)
//         // log(classes)
//         // const attendance = await getAttendance(context)
//         // const examinationTime = await getExaminationTime(context)
//         // log(examinationTime)
//         // const rewardsPunishment = await getRewardsPunishment(context)
//         // log(rewardsPunishment)
//         // const offeredCourses = await getOfferedCourses(context)
//         // log(offeredCourses)
//         // const illegalInfo = await getIllegalInfo(context)
//         // log(illegalInfo)
// }

// main('1540129359','15441502102130')

exports = module.exports = myscse