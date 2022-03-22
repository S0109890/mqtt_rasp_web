<template>
  <div>
    <h1>Store Test</h1>
    <div>
      <h3>User List</h3>
      <b-button variant="primary" @click="searchUserList">Search</b-button>
      <div style="border: 1px solid red">
        {{ userList }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchParams: null // 검색 조건을 넣을 수 있음
    }
  },
  computed: {
    userList() {
      return this.$store.getters.UserList
    }
  },
  methods: {
    searchUserList() {
      this.$store.dispatch('actUserList', this.searchParams) // 검색 조건을 넘겨 준다.
    }
  }
}
</script>
