//userAPI定义用户部分的接口
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://47.103.9.254:8000'
  : 'http://localhost:8000'

//查看电影列表
export const getMovie =() => {
  return axios.get('/movie/all/exclude/off')
}





//获得会员卡充值政策
export const getcardActicity =() => {
  return axios.get('/vip/rechargeActivity/getAll')
}
//查看电影详情
export const getMovieDetail =(id, userId) => {
  return axios.get('/movie/' + id + '/' + userId)
}
export const outMovie =(salesId) => {
  return axios.post('/ticket/out/?salesId='+salesId)
}
export const refundMovie =(salesId) => {
  return axios.post('/ticket/refund/?salesId='+salesId)
}

export const getMovieSchedule =(movieId) => {
  return axios.get('/schedule/search/audience?movieId=' + movieId)
}
//普通购买
export const getCommonBuy =(ticketId, couponId) => {
  return axios.post('/ticket/buy?ticketId=' + ticketId+'&couponId='+couponId)
}
export const getVipBuy =(ticketId, couponId) => {
  return axios.post('/ticket/vip/buy?ticketId=' + ticketId+'&couponId='+couponId)
}

//获得优惠券
export const getCoupon =(userId) => {
  return axios.get('/coupon/' + userId+'/get')
}

//标记电影为想看
export const markMovie =(movieId, userId) => {
  return axios.post('/movie/' + movieId + '/like?userId=' + userId)
}



export const LikeMovie =(id, userId) => {
  return axios.get('/movie/' + id + '/' + userId)
}

export const easeMovie =(movieId, userId) => {
  return axios.post('/movie/' + movieId + '/unlike?userId=' + userId)
}


//搜索电影

//查看排片信息


//查看特定场次的座位信息
export const getOccupiedSeat =(scheduleId) => {
  return axios.get('/ticket/get/occupiedSeats?scheduleId=' + scheduleId)
}

//查看会员卡信息
export const getVIP =(userId) => {
  return axios.get("/vip/" + userId + "/get")
}

//购买会员卡
export const addVIP =(userId) => {
  return axios.post('/vip/add?userId=' + userId)
}

//充值会员卡
export const chargeVIP =(params) => {
  return axios.post('/vip/charge', params)
}

export const lockSeats =(params) => {
  return axios.post('/ticket/lockSeat',params)
}

//查看电影票
export const getTicketByUserId =(userId) => {
  return axios.get('/ticket/get/' + userId)
}


export const getLockTicketByUserId =(userId) => {
  return axios.get('/ticket/get/lockedTickets?userId=' + userId)
}



export const checkTicketByUserId =(userId) => {
  return axios.get('/ticket/checkLocked?userId=' + userId)
}
//退票
export const refundTicket =(salesId) => {
  return axios.post('/ticket/refund?salesId=' + salesId)
}

//查看历史充值记录
export const getRechargeRecord =(vipId) => {
  return axios.get('/record/recharge/getAll?vipId=' + vipId)
}

//查看历史消费记录
export const getConsumptionRecord =(userId) => {
  return axios.get('/record/consumption/getAll?userId=' + userId)
}

