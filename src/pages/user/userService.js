import { post } from '../../service/request'
import { Message } from 'element-ui'
// import { sources } from '@/service/request'
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
    // let cancleApi = sources.get('/api/getUserList')
    // cancleApi && cancleApi(true)
    const result = await post('/api/getUserList', {pageSize, pageNum})
    console.log(result)
    errorHandler(result.code, result.text)
    return result.data
  }
}
