/**
   * base64解码
   * @param  {base64Content} base64字符串
   */
export function decodeBase64 (base64Content) {
  let commonContent = base64Content.replace(/\s/g, '+')
  commonContent = Buffer.from(commonContent, 'base64').toString()
  return commonContent
}

/**
   * base64编码
   * @param  {commonContent} object
   */
export function encodeBase64 (commonContent) {
  const base64Content = Buffer.from(commonContent).toString('base64')
  return base64Content
}
