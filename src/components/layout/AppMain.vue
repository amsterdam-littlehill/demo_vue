<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  provide: function () {
    return {
      printRoute: this.printRoute
    }
  },
  methods: {
    printRoute: function () {
      console.log(this.$route.path)
    }
  },
  computed: {
    cachedViews () {
      console.log('cacheViews', this.$store.state.tagsView.cachedViews)
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.fullPath
    }
  }
}
</script>
