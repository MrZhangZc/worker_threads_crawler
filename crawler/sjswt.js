const puppeteer = require('puppeteer')
const {
  Worker, 
  parentPort,
  workerData 
} = require('worker_threads')

const url = `http://www.sse.com.cn/aboutus/mediacenter/hotandd/`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('开始获取上交所动态')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(url)

  await sleep(3000)

  const result = await page.evaluate(() => {
    const $ = window.$
    const items = $('#sse_list_1 dl dd')
    const links = []

    if(items.length > 1){
      items.each(async (index, item) => {
        const it = $(item)
        const title = it.find('a').text()
        const link = 'http://www.sse.com.cn' + it.find('a').attr('href')
        const data = it.find('span').text()

        links.push({
          title,
          link,
          data,
        })
      })
    }

    return links
  })
  await browser.close()
  parentPort.postMessage(result)
  process.exit(0)
})()