import React, { Component } from 'react';

class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let helloUser;
    const { userData, closeSession } = this.props;
    if (userData) {
      helloUser = (
        <h4>
          Bienvenido:
          {userData.email}
        </h4>
      );
    }
    return (
      <div>
        {helloUser}
        <button type="button" onClick={closeSession}>
          Cerrar sesión
        </button>
      </div>
    );
  }
}

export default UserHeader;
