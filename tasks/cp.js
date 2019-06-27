const cp = require('child_process')
const { resolve } = require('path')
const fs = require('fs')

;(async () => {
  const script = resolve(__dirname, '../crawler/sjs.js')
  const child = cp.fork(script, [])

  child.on('message', data => {
    let result = data.result
    let ws = fs.createWriteStream('../data/sjs_cp.json', { encoding:'utf8'} )
    ws.on('error', (err) => {
      console.log('发生异常:', err)
    })
    ws.write(JSON.stringify(result, null, 2))
    ws.end()
  })
})()