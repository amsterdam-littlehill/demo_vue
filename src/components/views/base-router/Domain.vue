<template>
  <div>
    <h3>User:{{userId}} <br/></h3>
    <p v-if="customerDetailData != null">
      {{customerDetailData}}
    </p>
  </div>
</template>

<script>
import {customerDetail} from '@/api/custInfo'
export default {
  name: 'Domain',
  data () {
    return {
      userId: '',
      customerDetailData: {}
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('路由' + to.params.id + from)
    }
  },
  created () {
    let vm = this
    vm.userId = vm.$route.params.id
    vm.getCustomerDetail(vm.userId)
  },
  methods: {
    getCustomerDetail: function (custId) {
      let param = {
        'contractRoot': {
          'tcpCont': {
            'svcCode': '1010010005',
            'appKey': 'CRM-Portal',
            'dstSysId': 'CustCenter',
            'transactionId': '6099070001201806011001000101201602021234567890',
            'sign': 'xxxxxxxxxxxxx',
            'version': '1.0',
            'menuId': '111',
            'serviceCode': ''
          },
          'svcCont': {
            'authenticationInfo': {
              'sysUserId': 268,
              'sysUserPostId': '20001'
            },
            'requestObject': {
              'custId': custId,
              'enCodeFlag': '0',
              'loginNo': 'sitech01',
              'pageInfo': {
                'pageIndex': '1',
                'pageSize': '10'
              }
            }
          }
        }
      }
      let vm = this
      customerDetail(param).then(res => {
        let customerDetailData = res.data.contractRoot.svcCont.respObject
        vm.customerDetailData = customerDetailData
      })
    }
  },
  beforeRouteUpdate  (to, from, next) {
    console.log('beforeRouteUpdate', from)
    next((vm) => {
      vm.test = '我被改变了'
    })
  }
}
</script>
