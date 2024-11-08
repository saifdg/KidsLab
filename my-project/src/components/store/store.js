
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from "./reducers";
import storage from 'redux-persist/lib/storage'


const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(...(middleware)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  export let persistor = persistStore(store)
