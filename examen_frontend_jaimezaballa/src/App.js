import React from 'react';
import './App.css';
import Modal from './Modal';

import UserList from './UsersList';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.userList = React.createRef();
  }

  render() {
    return (
      <div id="App">
        <Modal ref={this.modal} userList={this.userList} />
        <div className="container">
          <div className="heading">
            <h1>Lista de usuarios</h1>
            <small>Developed by <strong>Jaime Zaballa Espinosa</strong></small>
          </div>
          <UserList ref={this.userList} modal={this.modal} />
        </div>
      </div>
    );
  }

}

export default App;