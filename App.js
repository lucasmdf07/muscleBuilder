import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from './src/store';

import DefaultNavigator from './src/navigators/DefaultNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DefaultNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
