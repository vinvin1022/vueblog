import { post } from '../../service/request'
import { Message } from 'element-ui'

const errorHandler = function (code, text) {
  if (code !== 200) {
    Message(
      {
        showClose: true,
        duration: 1500,
        message: text,
        type: 'error'
      }
    )

    throw new Error(text)
  }
}

// const requireParams = function () {
//   throw new Error('required params')
// }

export default {
  /**
   * 账号登陆
   * @param  {string} loginPwd 密码
   * @param  {string} memberCellphone 手机号码
   */
  async login (memberCellphone, loginPwd, maxAge) {
    const {code, data, text} = await post('/api/login', {memberCellphone, loginPwd, maxAge})
    errorHandler(code, text)
    return data
  },
  /**
   * 账号注册
   * @param  {string} loginPwd 密码
   * @param  {string} memberCellphone 手机号码
   * @param  {string} userName 用户名
   * @param  {string} email 邮箱
   */
  async register (userName, email, memberCellphone, loginPwd, tooLoginPwd) {
    const {code, data, text} = await post('/api/register', {userName, email, memberCellphone, loginPwd, tooLoginPwd})
    errorHandler(code, text)
    return data
  },
  /**
   * 登出
   */
  async logout () {
    const {code, data, text} = await post('/api/logout')
    errorHandler(code, text)
    return data
  },
  /**
   * 上传头像
   */
  async uploadavatar () {
    const {code, data, text} = await post('/api/uploadavatar')
    errorHandler(code, text)
    return data
  }
}
