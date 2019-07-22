const check = (origin, cache, count) => {
  for (let key in origin) {
    if (cache.indexOf(key) === -1) {
      cache.push(key)
    } else {
      count[key] ? count[key]++ : (count[key] = 1)
    }
  }
}

const log = (model, constitute, count) => {
  let logCount = 0
  for (let key in count) {
    if (!logCount) {
      console.warn(`Please note that some of the attributes are inherited in the ${model.namespace} / ${constitute}:`)
    }
    logCount++
    console.warn(`  -> ${key} be overwritten ${count[key]} time(s).`)
  }
}

export default function modelExtend(...models) {
  const base = { state: {}, subscriptions: {}, effects: {}, reducers: {} }
  const stateCache = []
  const stateCount = {}
  const subscriptionsCache = []
  const subscriptionsCount = {}
  const effectsCache = []
  const effectsCount = {}
  const reducersCache = []
  const reducersCount = {}

  const model = models.reduce((acc, extend) => {
    acc.namespace = extend.namespace
    if (typeof extend.state === 'object' && !Array.isArray(extend.state)) {
      check(extend.state, stateCache, stateCount)
      Object.assign(acc.state, extend.state)
    } else if ('state' in extend) {
      acc.state = extend.state
    }
    check(extend.subscriptions, subscriptionsCache, subscriptionsCount)
    Object.assign(acc.subscriptions, extend.subscriptions)
    check(extend.effects, effectsCache, effectsCount)
    Object.assign(acc.effects, extend.effects)
    check(extend.reducers, reducersCache, reducersCount)
    Object.assign(acc.reducers, extend.reducers)
    return acc
  }, base)

  log(model, 'state', stateCount)
  log(model, 'subscriptions', subscriptionsCount)
  log(model, 'effects', effectsCount)
  log(model, 'reducers', reducersCount)
  return model
}
