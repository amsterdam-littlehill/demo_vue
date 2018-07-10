<template>
  <div class="container">
    <ul>
      <li>
        <p>1.路由</p>
        <v-link href="/router-base/home">Home</v-link>
        <v-link href="/router-base/about">About</v-link>
      </li>
      <li>
        <p>2.动态路由</p>
        <router-link :to="{name:'Domain',params:{id:'amsterdam'}}">amsterdam</router-link>
        <router-link :to="{name:'Domain',params:{id:'xihalele'}}">xihalele</router-link>
        <!--<router-link to="/router-base/user/amsterdam">amsterdam</router-link>
        <router-link to="/router-base/user/xihalele">xihalele</router-link>-->
      </li>
      <li>
        <p>3.测试动态路由缓存</p>
        <el-input @keyup.enter.native="searchCust" type="text" style="width: 200px;" placeholder="请输入客户" v-model="custName"></el-input>
        <el-button v-re-click="searchCust">客户定位</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import reClick from '@/directives/reclick.js'
import VLink from '@/components/modules/VLink/index'
import { customerList } from '@/api/custInfo'
export default {
  name: 'base-router',
  components: {VLink},
  directives: {
    reClick
  },
  data () {
    return {
      custName: '',
      customerId: ''
    }
  },
  methods: {
    testDriective: function () {
      console.log('test click')
    },
    searchCust: function () {
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
              'custName': this.custName,
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
      customerList(param).then(res => {
        let customers = res.data.contractRoot.svcCont.respObject.customers
        let customerId = customers[0].custId
        vm.customerId = customerId
        debugger
        vm.$router.push({name: 'Domain', params: {id: customerId}})
      })
    }
  }
}
</script>

<style scoped>

</style>
