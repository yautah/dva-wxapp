import * as core from 'dva-core';
import Component from './component';
import PropTypes from './prop_types';
import createPage from './create_page';

function initDva(opts = {}) {
  const createOpts = {
    initialReducer: {},
    setupMiddlewares(middlewares) {
      return [ ...middlewares ];
    },
  };

  const app = core.create(opts, createOpts);
  const oldAppStart = app.start;
  return { ...app, start };


  function start() {
    oldAppStart.call(app);
  }
}


const dvapp = {
  get app() {
    return getApp();
  },
  get currentPages() {
    return getCurrentPages();
  }
};

export default dvapp;

export {
  initDva,
  Component,
  PropTypes,
  createPage,
};


