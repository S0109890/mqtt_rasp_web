import api from '../apiUtil'

export default {
  state: {
    // state에 사용할 모델이나 값을 선언 한다.
    User: {
      id: 0,
      name: null,
      username: null,
      email: null
    }, // User 상세 정보용 state
    UserList: [] // User 리스트용 state
  },
  getters: {
    // getters을 통해 state값을 호출 한다.
    User: state => state.User,
    UserList: state => state.UserList
  },
  mutations: {
    // mutations는 동기적이어야 함.(비동기 사용 불가)
    setUser(state, data) {
      state.User = data
    },
    setUserList(state, data) {
      state.UserList = data
    }
  },
  actions: {
    // action은 비동기적 사용이 가능하다. (action에서 mutation을 호출하는 방법을 권장함)
    // 사용자 정보 출력
    actUserInfo(context, payload) {
      console.log('User.id', payload) // payload를 통해 검색 조건을 받을 수 있다.

      // RestAPI로부터 UserInfo를 가져온다.
      api.get(`https://jsonplaceholder.typicode.com/users/${payload}`).then(response => {
        console.log('response', response)

        const userInfo = response && response.data // response중 userInfo만 추출 한다.
        context.commit('setUser', userInfo) // mutation을 통해 User값을 세팅 한다.
      })
    },
    // 사용자 리스트 조회
    actUserList(context, payload) {
      console.log('searchParams', payload) // payload를 통해 검색 조건을 받을 수 있다.

      const testUserList = ['user1', 'user2', 'user3'] // 이 값을 RestAPI에서 받아오면 된다.
      context.commit('setUserList', testUserList) // mutation을 통해 UserList값을 세팅 한다.
    }
  }
}
