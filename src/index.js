import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import HealthcareProvider from './healthcareProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<HealthcareProvider />, document.getElementById('root'));

// If you want your HealthcareProvider to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
