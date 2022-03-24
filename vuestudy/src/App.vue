<template>
  <div>
    <app-header v-if="this.$route.meta.header !== false" />
    <router-view />
  </div>
</template>

<script>
import Header from './views/comp/Header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>
