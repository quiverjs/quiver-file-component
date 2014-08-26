import 'traceur'

import { join as joinPath } from 'path'
import { startServer } from 'quiver-http'
import { makeFileBundle } from '../lib/file-component.js'

var config = {
  dirPath: './test-content',
  serverListen: 8080
}

var { 
  fileHandler,
  indexFileFilter
} = makeFileBundle()

fileHandler.addMiddleware(indexFileFilter)

startServer(fileHandler, config)
.then(server => {
  console.log('simple file server running at port 8080...')
})
.catch(err => {
  console.log('error starting server:', err.stack)
})