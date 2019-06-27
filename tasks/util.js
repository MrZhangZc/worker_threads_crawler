const { Worker, isMainThread, parentPort } = require('worker_threads')

const threadFetch = script => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(script)
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}

module.exports = threadFetch