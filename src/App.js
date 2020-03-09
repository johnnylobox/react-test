import React, { Component } from 'react';
// import Courses from "./bd/courses";
import Main from "./components/main/";
import Header from "./components/header";
import Footer from "./components/footer/";
import './App.css';

class App extends Component {

//   constructor(props){
//     super(props);
//   }

  componentDidMount = () => {
  }

    render() {
        let header = <Header/>;
        var main = <Main/>;
        let footer = <Footer/>;

        return (
            <div>
                {header}
                {main}
                {footer}
            </div>
        );

    }
}

export default App;