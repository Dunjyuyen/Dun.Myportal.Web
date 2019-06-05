import req from './index.js'

//let base ='http://localhost:21021'
let base ='http://120.79.247.188:21021'

//登录接口
export const authenticate = (params) => req('post', base, '/api/TokenAuth/Authenticate', params, true, true).then(res => res.data);

export const getExamQuestions = (params) => req('get', base, '/api/services/app/Exam/GetExamQuestions', params, true, false).then(res => res.data);

export const createExamUserError = (params) => req('post', base, '/api/services/app/Exam/CreateExamUserError', params, true, true).then(res => res.data);

export const getExamErrorQuestions = (params) => req('get', base, '/api/services/app/Exam/GetExamErrorQuestions', params, true, false).then(res => res.data);

export const getExamUserErrorsCountByUserId = (params) => req('get', base, '/api/services/app/Exam/GetExamUserErrorsCountByUserId', params, true, false).then(res => res.data);