import { createStore, applyMiddleware, compose } from '../libs/redux.min'
import flatten from 'flatten'
import invariant from 'invariant'
import { returnSelf, isArray } from './utils'

export default function({
  reducers,
  initialState,
  plugin,
  sagaMiddleware,
  promiseMiddleware,
  createOpts: { setupMiddlewares = returnSelf },
}) {
  // extra enhancers
  const extraEnhancers = plugin.get('extraEnhancers')
  invariant(isArray(extraEnhancers), `[app.start] extraEnhancers should be array, but got ${typeof extraEnhancers}`)

  const extraMiddlewares = plugin.get('onAction')
  const middlewares = setupMiddlewares([promiseMiddleware, sagaMiddleware, ...flatten(extraMiddlewares)])

  let devtools = () => noop => noop

  const enhancers = [applyMiddleware(...middlewares), ...extraEnhancers]

  return createStore(reducers, initialState, compose(...enhancers))
}
