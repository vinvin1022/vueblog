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
  }
}

const requireParams = function () {
  throw new Error('required params')
}

export default {
  /**
   * 发送验证码
   * @param  {Number} pageSize 每页多少条
   * @param  {Number} pageNum 当前页
   *
   */
  async getUserList (pageSize = requireParams(), pageNum = requireParams()) {
    const {code, data, text} = await post('/api/getUserList', {pageSize, pageNum})
    errorHandler(code, text)
    return data
  }
}
