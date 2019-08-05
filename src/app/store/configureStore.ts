/* istanbul ignore file */
import { environment } from 'app/helpers/environment';
import { applyMiddleware, compose as composeWithoutDevTools, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// When running the app in development mode we want to wire up redux dev tools support
// This makes it possible to see the actions being dispatched within your browser.
// Just install the Redux DevTools extension for Chrome.
const compose = environment.isDevelopment(process) ? composeWithDevTools : composeWithoutDevTools;

// redux-saga is a library that aims to make application side effects (i.e.
// asynchronous things like data fetching and impure things like accessing the
// browser cache) easier to manage, more efficient to execute, simple to test,
// and better at handling failures.
//
// The mental model is that a saga is like a separate thread in your application
// that's solely responsible for side effects.
const sagaMiddleware = createSagaMiddleware();

export function configureStore() {
 const store = createStore(
  rootReducer,
  compose(
    // @ts-ignore
    applyMiddleware(sagaMiddleware)
  ),
 );

  // Second start the redux saga middleware.
  //
  // Dynamically run saga. Can be used to run sagas only after the
  // applyMiddleware phase.
 sagaMiddleware.run(rootSaga);

 return store;
}
