import Main from 'pages/Main';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="flex min-h-screen flex-col">
            <Main />
          </div>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
