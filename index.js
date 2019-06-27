const rp = require('request-promise-native')

async function fetchMovie(item){
  const url = item.link

  return await rp(url)
}

;(async () => {
  const connect = [
    {
      title: '双向开放再结硕果 中日ETF互通成功开通 ',
      link: 'http://www.sse.com.cn/aboutus/mediacenter/hotandd/c/c_20190625_4846882.shtml',
      data: '2019-06-25'
    },
    {
      title: '科创板上市委审议工作正式启动 ',
      link: 'http://www.sse.com.cn/aboutus/mediacenter/hotandd/c/c_20190527_4826721.shtml',
      data: '2019-05-27'
    }
  ]

  connect.map(async content => {
    let data = await fetchMovie(content)
    console.log(data)
  })
})()
