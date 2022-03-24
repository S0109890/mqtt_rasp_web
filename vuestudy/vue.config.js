const { VUE_APP_SERVER } = process.env
//호풀 .env에 있는 뷰 앱서버 '주소'

//모듈 익스포트한다
module.exports = {
  devServer: {
    Proxy: {
      serverApi: {
        target: VUE_APP_SERVER,
        changeOrigin: true,
        pathRewrite: {
          '^/serverApi': ''
          //없애준다.
        }
      }
    }
  }
}
