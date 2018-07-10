<template>
  <div class="content">
    <h3>vuex 全局状态管理应用</h3>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>1.更改 Vuex 的 store 中的状态的唯一方法是提交 mutation , <strong>mutation中必须是同步操作</strong></span>
        <span>2.Action 提交的是 mutation，而不是直接变更状态 <strong>Action 可以包含任意异步操作</strong></span>
        <span>a.通过commit mutation 的方式</span> <br>
        <span>b.通过dispatch action 的方式</span>
      </div>
      <el-badge :value="testCount0" class="item"></el-badge>
      <el-row>
        <el-button @click.native="commitType">commit</el-button>
        <el-button @click.native="dispatchType">dispatch</el-button>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>3.在计算属性时从store获取状态</span> <br>
      </div>
      {{count}}
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>4.当一个组件需要获取多个状态时候,使用mapState 辅助函数</span> <br>
      </div>
      <span>a.mapState 入参为数组时，返回 this.$store.state[val]</span>
      <span>当前打开的页面：</span>
      <ul>
        <li v-for="(item, key) in app" :key="key">{{item}}</li>
      </ul>
      <span>b.mapState 入参为函数时，返回当前 store 上的 state 和 getters</span>
      <ul>
        <li v-for="(item, key) in mapStateTest" :key="key">{{item}}</li>
      </ul>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>4.mapGetters 辅助函数将 store 中的 getter 映射到局部计算属性</span> <br>
      </div>
      <span>当前缓存的页面：</span>
      <ul>
        <li v-for="(item, key) in cachedViews" :key="key">{{item}}</li>
      </ul>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>5.mapMutations 辅助函数store 中的 commit 方法映射到组件的 methods 中</span> <br>
      </div>
      {{this.$store.state.test.count}} <br>
      数组方式提交：<el-button @click.native="INCREMENT">commit</el-button>
      对象方式提交:<el-button @click.native="add">commit</el-button>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>6.mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用</span> <br>
      </div>
      {{this.$store.state.test.count}} <br>
      数组方式提交：<el-button @click.native="increment2">+20</el-button>
      对象方式提交:<el-button @click.native="add2">+1(1s后执行)</el-button>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>7.表单处理 </span> <br>
      </div>
      <el-input :value="mapStateTest.count" @input="undateCount"></el-input>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'store-base',
  data () {
    return {
      testCount0: ''
    }
  },
  computed: {
    ...mapGetters([
      'cachedViews'
    ]),
    /* 入参为数组 */
    ...mapState([
      'app'
    ]),
    ...mapState({
      mapStateTest: 'test'
    }),
    count () {
      return this.$store.state.test.count
    }
  },
  mounted () {
    this.testCount0 = this.$store.state.test.count
  },
  methods: {
    undateCount (e) {
      this.$store.commit('UPDATE_COUNT', e)
    },
    // 数组风格
    ...mapActions([
      'increment2' // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    ]),
    // 对象风格
    ...mapActions({
      add2: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    // 数组风格
    ...mapMutations([
      'INCREMENT' // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
    // 对象风格
    ...mapMutations({
      add: 'INCREMENT'// 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    }),
    // 对象风格的提交方式
    payloadType () {
      this.$store.commit({
        type: 'INCREMENTBYPAYLOAD',
        amount: 10
      })
    },
    commitType () {
      this.$store.commit('INCREMENT')
    },
    dispatchType () {
      this.$store.dispatch('increment')
    }
  }
}
</script>

<style scoped>
.content{
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: .3s;
}
.input{
  width: 210px;
}
</style>
