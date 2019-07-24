// import regeneratorRuntime from 'regenerator-runtime'
import * as core from './dva-core'
import saga from './dva-core/saga.js'
import createLoading from './dva-loading'
import connect, { createPage } from './utils/connect.js'
import { createLogger } from './libs/redux-logger.js'
import { createSelector } from './libs/reselect.min.js'
import extendModel from './utils/dva-model-extend'

export default core
// export { connect, saga }
// export { createLoading, connect, regeneratorRuntime, saga }
export { createLoading, connect, createPage, saga, createLogger, createSelector, extendModel }

// module.exports = require('dva-core')
// module.exports.saga = require('dva-core/saga')
// module.exports.createLoading = require('dva-loading')
// module.exports.connect = require('./utils/connect.js')
// module.exports.regeneratorRuntime = require('regenerator-runtime')
