import request from '@/utils/request'
import reqUrl from '@/utils/reqUrlConf'

export function customerList (param) {
  return request({
    url: reqUrl.qryCustomerList,
    method: 'post',
    data: param
  })
}

export function customerDetail (param) {
  return request({
    url: reqUrl.qryCustomerDetail,
    method: 'post',
    data: param
  })
}
