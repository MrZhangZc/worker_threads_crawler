// 主线程
const worker = new Worker(__filename, {
    workerData: script// 传递的数据，可以是任意合法js值，会深拷贝一份过去
 })
worker.on('message', data =>{
    console.log(data) // 接收工作线程数据并打印
})
worker.postMessage('hello') // 向工作线程发送数据


// 工作线程
const {
    Worker, 
    parentPort, // 表示父进程的 MessagePort 类型的对象，在主线程里为 null
    workerData // 主线程传递过来的数据
  } = require('worker_threads')
parentPort.postMessage('hello') // 向父线程发送数据
parentPort.on('message', data =>{
    console.log(data) // 接收主线程数据并打印
});