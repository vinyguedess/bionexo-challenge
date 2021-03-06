import React from 'react';
import logo from './../../assets/images/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './../../assets/css/style.css';
import { Dashboard } from '../Dashboard/components';


export const Body = () =>
(
    <div className="app">
        <Header />
        <Content />
    </div>
);


export const Header = () =>
(
    <div className="header">
        <div className="logo">
            <img src={ logo } alt="Bionexo Challenge Logo" />
        </div>
    </div>
);


export const Content = () =>
(
    <div className="content">
        <Dashboard />
    </div>
);