import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Header from './routes/Header';
//redux
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers'

import { BrowserRouter, Switch, Route, Link,  } from 'react-router-dom';
import Login from './components/Login';
import LoadingComponent from './components/LoadingComponent';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import NoteDetail from './components/NoteDetail';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// authenticated component must be below login
ReactDOM.render(<Provider store = { store }>
                  <BrowserRouter>
                    <LoadingComponent>
                      <div>
                        <Switch>
                          <Route path="/login" component={Login} exact={true}/>
                          <Route path="/:id" component={NoteDetail} exact={true} />

                          <AuthenticatedComponent>
                            <Header/>
                            <Route path="/" component={App} exact={true}/>
                          </AuthenticatedComponent>
                        </Switch>
                      </div>
                    </LoadingComponent>
                  </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
