import { join as joinPath } from 'path'
import { promisify, reject } from 'quiver-promise'
import { ArgsBuilderFilter } from 'quiver-component'

import { listDirMiddleware } from './list-dir.js'

var getIndexFile = (indexNames, files) => {
  for(var i=0; i<indexNames.length; i++) {
    var indexName = indexNames[i]
    var index = files.indexOf(indexName)
    if(index > -1) return indexName
  }

  return null
}

export var indexPathFilter = new ArgsBuilderFilter(
config => {
  var listDir = config.listDirHandler

  return args => {
    var { path, filePath, fileStats } = args

    if(!fileStats.isDirectory) return args

    return listDir(args).then(({subpaths: files}) => {
      var indexFile = getIndexFile(indexNames, files)
      if(!indexFile) return reject(error(404, 'file not found'))

      args.path = joinPath(path, indexFile)
      args.filePath = joinPath(filePath, indexFile)
      args.fileStats = null

      return args
    })
  }
}, {
  name: 'Quiver Index Path Filter'
})
.addMiddleware(listDirMiddleware)