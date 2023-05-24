import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter ,
  Switch,
  Route,
 
} from "react-router-dom";



import { Router } from 'react-bootstrap-icons';

export default class App extends Component {
  pageSize=6;
  apiKey=process.env.REACT_APP_NEWS_API
  
  render() {
    return (
      <div>
        <BrowserRouter >
        <NavBar/>
        
        <Switch>
    <Route exact key="general"  path="/">
             <News pageSize={this.pageSize}  apiKey={this.apiKey} country='in' category='general'/>
    </Route>
    <Route exact key="general"  path="/general">
             <News pageSize={this.pageSize}  apiKey={this.apiKey} country='in' category='general'/>
    </Route>
    <Route exact key="business"  path="/business">
             <News pageSize={this.pageSize}  apiKey={this.apiKey} country='in' category='business'/>
    </Route>
    <Route exact key="entertainment"  path="/entertainment">
             <News pageSize={this.pageSize}  apiKey={this.apiKey} country='in' category='entertainment'/>
    </Route>
    <Route exact key="health"   path="/health">
             <News pageSize={this.pageSize}  apiKey={this.apiKey} country='in' category='health'/>
    </Route>
    <Route exact key="science"  path="/science">
             <News pageSize={this.pageSize}  apiKey={this.apiKey } country='in' category='science'/>
    </Route>
    <Route exact key="sports"  path="/sports">
             <News pageSize={this.pageSize}  apiKey={this.apiKey } country='in' category='sports'/>
    </Route>
    <Route exactkey="technology"   path="/technology">
             <News pageSize={this.pageSize}  apiKey={this.apiKey } country='in' category='technology'/>
    </Route>
  
  </Switch> 
        </BrowserRouter>
      </div>
    )
  }
}

