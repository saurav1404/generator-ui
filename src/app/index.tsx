/* istanbul ignore file */
import { App } from 'app/components/App/App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StoreContext } from 'redux-react-hook';
import { configureStore } from './store/configureStore';

const store = configureStore();

const appComponent = (
  <Provider store={store}>
    {/* When using Redux React Hooks we must provide a StoreContext. Otherwise the hooks won't work. */}
    <StoreContext.Provider value={store}>
      <App/>
    </StoreContext.Provider>
  </Provider>
);

const container = document.querySelector('#app');
ReactDOM.render(appComponent, container);
