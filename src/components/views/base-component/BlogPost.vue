<template>
  <div @mouseover="displayContent" @mouseleave="hideContent">
    <h3 v-if="!display">{{blogStr2}}</h3>
    <span v-if="display">{{blogContent}}</span>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  data () {
    return {
      blogStr: '',
      blogContent: '',
      display: false
    }
  },
  props: {
    blog: {
      type: Object
    },
    title: {
      type: String
    }
  },
  methods: {
    triggerChangeColor: function () {
      this.$emit('change-color')
    },
    hideContent: function () {
      this.display = false
      this.triggerChangeColor()
    },
    displayContent: function () {
      this.display = true
      this.triggerChangeColor()
    }
  },
  created () {
    this.blogStr = this.blog
    this.blogContent = this.blog.body
  },
  computed: {
    blogStr2: function () {
      return this.blogStr.id + ':' + this.blogStr.title
    }
  }
}
</script>

<style scoped>

</style>
