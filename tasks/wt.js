const threadFetch = require('./util')
const { resolve } = require('path')
const fs = require('fs')

;(async () => {
  try{
    const script = resolve(__dirname, '../crawler/sjswt.js')
    const result = await threadFetch(script)
    let opts = {
      encoding: 'utf8',
      stdio: [process.stdin, process.stdout, process.stderr]
    }
    fs.writeFileSync('../data/sjs_wt.json', JSON.stringify(result, null, 2), { encoding:'utf8'})
  }catch(err){
    console.log(err)
  }
})()
