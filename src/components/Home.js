import React, { Component } from 'react';
import { connect } from 'react-redux';
// Reducer methods
import { removeToken, removeUserData } from '../reducer';
// Child components
import UserHeader from './UserHeader';
import ProductList from './ProductList';
import Basket from './Basket';
// Import images
import xxLager from '../assets/images/xx-lager.jpg';
import xxAmbar from '../assets/images/xx-ambar.jpg';
import Heineken from '../assets/images/heineken.jpg';
import Indio from '../assets/images/indio.jpg';
import BohemiaObscura from '../assets/images/bohemia-obscura.jpg';
import Tecate from '../assets/images/tecate.png';

const items = [
  {
    name: 'XX Lager',
    price: 1500,
    image: xxLager,
    id: 'e63f50d2-8cf4-11e8-9eb6-529269fb1459',
  },
  {
    name: 'XX Ambar',
    price: 1800,
    image: xxAmbar,
    id: 'e63f549c-8cf4-11e8-9eb6-529269fb1459',
  },
  {
    name: 'Heineken',
    price: 2200,
    image: Heineken,
    id: 'e63f5a82-8cf4-11e8-9eb6-529269fb1459',
  },
  {
    name: 'Indio',
    price: 1400,
    image: Indio,
    id: 'e63f5z82-8cf4-11e8-9eb6-529269fb1459',
  },
  {
    name: 'Bohemia Obscura',
    price: 2100,
    image: BohemiaObscura,
    id: 'e63f5b83-8cf4-11e8-9eb6-529269fb1459',
  },
  {
    name: 'Tecate',
    price: 1500,
    image: Tecate,
    id: 'e62f5b89-8cf4-11e8-9eb6-529269fb1459',
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /**
   * Handle the click on the close session button
   */
  handleCloseSessionClick = () => {
    this.props.removeToken();
    this.props.removeUserData();
    window.location.replace('/');
  }

  render() {
    const { userData } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="nine columns">
            <ProductList items={items} />
          </div>
          <div className="three columns">
            <UserHeader userData={userData} closeSession={this.handleCloseSessionClick} />
            <Basket showButton={true} />
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <hr />
            <p><a href="/foo">Ir a foo</a></p>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  removeToken, removeUserData
};

const mapStateToProps = (state) => ({
  token: state.token,
  userData: state.userData,
});

export default connect(mapStateToProps, mapDispatch)(Home);
