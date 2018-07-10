<template>
  <div id="blog-post-demo" class="demo">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>1.父子组件通信</span>
      </div>
      <p>1.父组件通过v-bind 向子组件传参，子组件通过props获取数据</p>
      <p>2.父组件通过v-on将事件绑定在子组件上，子组件用过$emit()触发父组件方法</p>
      <blog-post class="dynamic-component" v-for="post in posts" :key="post.id" :blog="post" :style="{ backgroundColor: color }" @change-color="changeColor"></blog-post>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>3.父组件通过solt向子组件分发内容</span>
      </div>
      <div>
        <slot-demo><h3><span class="fa fa-car"></span>父组件分发内容</h3></slot-demo>
        <slot-demo></slot-demo>
        <slot-demo>
          <h3 slot="footer">
            <span class="fa fa-user-circle-o">父组件通过具名插槽分发的内容</span>
          </h3>
        </slot-demo>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>4.动态组件</span>
      </div>
      <div>
        <span>1.使用keep-alive实例在它们第一次被创建的时候缓存下来</span><br>
        <button v-for="tab in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]" @click="currentTab=tab">{{tab}}</button>
        <div class="dynamic-component">
          <keep-alive>
            <component
              v-for="post in posts" :key="post.id" :blog="post"
              v-bind:is="currentTabComponent"
              class="tab"
            ></component>
          </keep-alive>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>5.组件缓存</span>
      </div>
      <span>使用 <strong>keep-alive</strong>包裹组件使其缓存下来</span><br>
      <strong>注意这个 keep-alive 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。</strong>
    </el-card>
  </div>
</template>

<script>
import BlogPost from './BlogPost'
import SlotDemo from './SlotDemo'

export default {
  name: 'component-base',
  components: {SlotDemo, BlogPost},
  data () {
    return {
      posts: [],
      color: '',
      tabs: ['BlogPost', 'SlotDemo'],
      currentTab: 'BlogPost'
    }
  },
  methods: {
    changeColor: function () {
      this.color = '#' + (Math.random() * 0xffffff << 0).toString(16)
    }
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab
    }
  },
  created: function () {
    let vm = this
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        vm.posts = data.slice(0, 3)
      })
  }
}
</script>
<style scoped>
  .dynamic-component{
    background: #99a9bf;
    width: 500px;
  }
  .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .tab {
    border: 1px solid #ccc;
    padding: 10px;
  }
  .posts-tab {
    display: flex;
  }
  .posts-sidebar {
    max-width: 40vw;
    margin: 0;
    padding: 0 10px 0 0;
    list-style-type: none;
    border-right: 1px solid #ccc;
  }
  .posts-sidebar li {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  .posts-sidebar li:hover {
    background: #eee;
  }
  .posts-sidebar li.selected {
    background: lightblue;
  }
  .selected-post-container {
    padding-left: 10px;
  }
  .selected-post > :first-child {
    margin-top: 0;
    padding-top: 0;
  }
</style>
