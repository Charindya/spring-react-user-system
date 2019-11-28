import React, { Component } from 'react';import './App.css';
import {AddTask} from "./components/AddTask";
import {List} from "./components/List";
import {Link, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {UpdateTask} from "./components/UpdateTask";
import {ListHome} from "./components/ListHome";
import {AddList} from "./components/AddList";
class App extends Component {
  state = {
    isLoading: true,
    groups: []
  };
  //
  // async componentDidMount() {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  //   const body = await response.json();
  //   this.setState({ groups: body, isLoading: false });
  // }

  componentDidMount() {
    fetch('/users')
        .then(response => response.json())
        .then(json => this.setState({ isLoading: false, groups:json }));
    console.log("yooyoyo");
  }


  render() {
    const {groups, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
        <div className="App">
           <Router>
               <Switch>
                   <Route path="/list" exact component={List}/>
                   <Route path="/addlist" exact component={AddList}/>
                   <Route path="/" exact component={ListHome}/>
                   <Route path="/adduser" component={AddTask}/>
                   <Route path="/edituser" component={UpdateTask}/>

               </Switch>
            </Router>

        </div>
    );
  }
}

export default App;
