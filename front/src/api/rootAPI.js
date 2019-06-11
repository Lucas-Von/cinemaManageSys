//rootAPI定义管理员部分的接口
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://47.103.9.254:8000'
  : 'http://localhost:8000';

//获取电影列表
export const  getMovie =() => {
  return axios.get('/movie/all/exclude/off').then(res => res.data)
};

//获取电影想看人数
export const getMovieLikeCount =(movieId) => {
  return axios.get('/movie/' + movieId + '/like/count').then(res => res.data)
};

//按日获取电影想看人数
export const getMovieLikeByDate =(movieId) => {
  return axios.get('/movie/' + movieId + '/like/date').then(res => res.data)
};

// 获取会员卡充值优惠
export const getRechargeActivity =() => {
  return axios.get('/vip/rechargeActivity/getAll').then(res => res.data)
};

//添加会员卡充值优惠
export const addRechargeActivity =(params) => {
  return axios.post('/vip/rechargeActivity/add', params).then(res => res.data)
};

//修改会员卡充值优惠
export const updateRechargeActivity =(params) => {
  return axios.post('/vip/rechargeActivity/update', params).then(res => res.data)
};

//删除会员卡充值优惠
export const deleteRechargeActivity =(rechargeActivityId) => {
  return axios.post('/vip/rechargeActivity/delete?rechargeActivityId=' + rechargeActivityId).then(res => res.data)
};

//获取会员卡购票优惠
export const getTicketActivity =() => {
  return axios.get('/vip/ticketActivity/getAll').then(res => res.data)
};

//添加会员卡购票优惠
export const addTicketActivity =(params) => {
  return axios.post('/vip/ticketActivity/add', params).then(res => res.data)
};

//修改会员卡购票优惠
export const updateTicketActivity =(params) => {
  return axios.post('/vip/ticketActivity/update', params).then(res => res.data)
};

//删除会员卡购票优惠
export const deleteTicketActivity =(ticketActivityId) => {
  return axios.post('/vip/ticketActivity/delete?ticketActivityId=' + ticketActivityId).then(res => res.data)
};

//获取退票策略
export const getRefundStrategy =() => {
  return axios.get('/refundStrategy/getAll').then(res => res.data)
};

//添加退票策略
export const addRefundStrategy =(params) => {
  return axios.post('/refundStrategy/add', params).then(res => res.data)
};

//修改退票策略
export const updateRefundStrategy =(params) => {
  return axios.post('/refundStrategy/update', params).then(res => res.data)
};

//删除退票策略
export const deleteRefundStrategy =(refundStrategyId) => {
  return axios.post('/refundStrategy/delete?refundStrategyId=' + refundStrategyId).then(res => res.data)
};

//获取影厅信息
export const getHall =() => {
  return axios.get('/hall/all').then(res => res.data)
};

//添加影厅信息
export const addHall =(params) => {
  return axios.post('/hall/add', params).then(res => res.data)
};

//修改影厅信息
export const updateHall =(params) => {
  return axios.post('/hall/update', params).then(res => res.data)
};

//删除影厅信息
export const deleteHall =(hallId) => {
  return axios.post('/hall/delete?hallId=' + hallId).then(res => res.data)
};
