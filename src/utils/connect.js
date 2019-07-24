// import { bindActionCreators } from 'redux';
//

const hasOwn = Object.prototype.hasOwnProperty

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  }
  return x !== x && y !== y
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}

function defaultMapStateToProps() {
  return {}
}

function defaultMapDispatchToProps(dispatch) {
  return { dispatch: dispatch }
}

function createConnect(mapStateToProps) {
  const app = getApp()
  const mapState = mapStateToProps || defaultMapStateToProps
  // const mapDispatch = mapDispatchToProps && typeof mapDispatchToProps === 'object' ?
  // dispatch => bindActionCreators(mapDispatchToProps, dispatch) : defaultMapDispatchToProps;

  return function(page) {
    function onStateChange() {
      if (this.unsubscribe) {
        const state = app._store.getState()
        const mappedState = mapState(state)
        if (!shallowEqual(this.data, mappedState)) {
          this.setData(mappedState)
          if (page.onStateChange && typeof page.onStateChange === 'function') page.onStateChange.call(this)
        }
      }
    }

    function onLoad(options) {
      const isMapStateToProps = Boolean(mapStateToProps)
      if (isMapStateToProps) {
        this.unsubscribe = app._store.subscribe(onStateChange.bind(this))
        onStateChange.apply(this)
      }
      if (page.onLoad && typeof page.onLoad === 'function') page.onLoad.call(this, options)
    }

    function onUnload() {
      if (page.onUnload && typeof page.onUnload === 'function') page.onUnload.call(this)
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
    }

    return Object.assign(
      {},
      page,
      { dispatch: app._store.dispatch },
      {
        onLoad: onLoad,
        onUnload: onUnload,
      },
    )
  }
}

export function createPage(mapStateToProps, pageOpts) {
  return Page(createConnect(mapStateToProps)(pageOpts))
}

export default createConnect
