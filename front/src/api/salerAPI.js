//salerAPI定义总经理部分的接口
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://47.103.9.254:8000'
  : 'http://localhost:8000'

//添加排片
export const addSchedule =(params) => {
  return axios.post('/schedule/add', params).then(res => res.data)
};

//修改排片
export const updateSchedule =(parms) => {
  return axios.post('/schedule/update', parms).then(res => res.data)
};

//根据时间和影厅获取排片
export const getScheduleByHallId =(hallId, startDate) => {
  return axios.get('/schedule/search?hallId=' + hallId + '&startDate=' + startDate).then(res => res.data)
};

//根据电影获取排片
export const getScheduleByMovieId =(movieId) => {
  return axios.get('/schedule/search/audience?movieId=' + movieId).then(res => res.data)
};

//根据排片id获取排片
export const getScheduleById =(id) => {
  return axios.get('/schedule/' + id).then(res => res.data)
};

//批量删除排片
export const deleteSchedule =(params) => {
  return axios.post('/schedule/delete/batch', params).then(res => res.data)
};

//获取排片可见时间
export const getScheduleView =() => {
  return axios.get('/schedule/view').then(res => res.data)
};

//设置排片可见时间
export const setScheduleView =(params) => {
  return axios.post('/schedule/view/set', params).then(res => res.data)
};

//获取某日各电影排片率
export const getScheduleRate =(date) => {
  return axios.get('statistics/scheduleRate?date=' + date).then(res => res.data)
};

//获取所有电影的累计票房
export const getTotalBoxOffice =() => {
  return axios.get('statistics/boxOffice/total').then(res => res.data)
};

//获取客单价
export const getAudiencePrice =() => {
  return axios.get('statistics/audience/price').then(res => res.data)
};

//获取某日各电影的上座率
export const getPlacingRate =(date) => {
  return axios.get('statistics/PlacingRate?date=' + date).then(res => res.data)
};

//获取最受欢迎电影
export const getPopularMovies =(days, movieNum) => {
  return axios.get('statistics/popular/movie?days=' + days + '&movieNum=' + movieNum).then(res => res.data)
};

//发布优惠活动
export const addActivity =(params) => {
  return axios.post('/activity/publish', params).then(res => res.data)
};

//获取优惠活动
export const getActivity =() => {
  return axios.get('/activity/get').then(res => res.data)
};

//获取优惠券
export const getCoupon =(couponId) => {
  return axios.get('/coupon/getById?couponId=' + couponId).then(res => res.data)
};

//获取所有优惠券
export const getAllCoupon =() => {
  return axios.get('/coupon/getAll').then(res => res.data)
};

//赠送优惠券
export const issueCoupon =(couponId, amount) => {
  return axios.post('/coupon/issueCouponsByAmount?amount=' + amount + '&couponId=' + couponId).then(res => res.data)
};

//获取正在上映的电影
export const getMovie =() => {
  return axios.get('/movie/all/exclude/off').then(res => res.data)
};

//上架电影
export const addMovie =(params) => {
  return axios.post('/movie/add', params).then(res => res.data)
}

//获取电影详情
export const getMovieDetails =(id, userId) => {
  return axios.get('/movie/' + id + '/' + userId).then(res => res.data)
};

//更新电影详情
export const updateMovieDetail =(params) => {
  return axios.post('/movie/update', params).then(res => res.data)
};

//获取全部影厅
export const getHall =() => {
  return axios.get('/hall/all').then(res => res.data)
};

//下架电影
export const deleteMovie =(params) => {
  return axios.post('/movie/off/batch', params).then(res => res.data)
};

