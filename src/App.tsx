import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ContentPage from './page/ContentPage';
import SignUpPage from './page/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={ContentPage} />
      <Route path='/signup' render={() => <SignUpPage isSignUp />} />
      <Route path='/login' component={SignUpPage} />
    </BrowserRouter>
  );
}

export default App;
