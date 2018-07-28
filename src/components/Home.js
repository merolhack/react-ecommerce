import React, { Component } from 'react';
import { connect } from 'react-redux';
// CSS Styles
import styled from 'styled-components';
// Reducer methods
import { removeToken, removeUserData, getMessage, getItems } from '../reducer';
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

const baseName = (process.env.NODE_ENV !== 'development') ? '/react-ecommerce' : '/';

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

const QuoteContainer = styled.blockquote`
  background: #303F9F;
  color: #ffffff;

  padding: 20px;
  padding-left: 50px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(#222222, 0.12);

  position: relative;
  overflow: hidden;
  min-height: 120px;

  p {
    font-size: 22px;
    line-height: 1.5;
    margin: 0;
    max-width: 80%;
  }
  cite {
    font-size: 16px;
    margin-top: 10px;
    display: block;
    font-weight: 200;
    opacity: 0.8;
  }
  &:before {
    font-family: Georgia, serif;
    content: "“";
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 5em;
    color: rgba(#3F51B5, 0.8);
    font-weight: normal;
  }
  &:after {
    font-family: Georgia, serif;
    content: "”";
    position: absolute;
    bottom: -110px;
    line-height: 100px;
    right: -32px;
    font-size: 25em;
    color: rgba(#3F51B5, 0.8);
    font-weight: normal;
  }
`;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreItems: false,
    };
  }

  componentDidMount() {
    // Gent the message from the API
    this.props.getMessage();
    this.getMoreItems();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  handleScroll = () => {
    const wrappedElement = document.getElementById('product-list');
    if (this.isBottom(wrappedElement)) {
      this.setState({
        hasMoreItems: true
      });
    }
  };

  /**
   * Get the items from the store
   */
  getMoreItems = () => {
    this.props.getItems();
    this.setState({
      hasMoreItems: false
    });
  };

  /**
   * Handle the click on the close session button
   */
  handleCloseSessionClick = () => {
    this.props.removeToken();
    this.props.removeUserData();
    window.location.replace(baseName);
  }

  render() {
    const { userData, joke, asyncItems } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            <QuoteContainer>
              <p>
                { joke }
              </p>
              <cite>
                Dad
              </cite>
            </QuoteContainer>
          </div>
        </div>
        <div className="row">
          <div className="nine columns" id="product-list">
            <ProductList items={asyncItems} get={this.getMoreItems} has={this.state.hasMoreItems} />
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
  removeToken, removeUserData, getMessage, getItems
};

const mapStateToProps = (state) => ({
  token: state.token,
  userData: state.userData,
  joke: state.joke,
  asyncItems: state.asyncItems,
});

export default connect(mapStateToProps, mapDispatch)(Home);
