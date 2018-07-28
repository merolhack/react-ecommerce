import React, { Component } from 'react';
import { connect } from 'react-redux';
// CSS Styles
import styled from 'styled-components';
// Material UI
import Button from '@material-ui/core/Button';
import AttachMoney from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
// Reducer methods
import { removeToken, removeUserData } from '../reducer';
// Custom components
import UserHeader from './UserHeader';
import ConfirmDeleteItem from './ConfirmDeleteItem';

const baseName = (process.env.NODE_ENV !== 'development') ? '/react-ecommerce' : '/';

const TableContainer = styled.table`
  width: 100%;
  border: 1px solid grey;
`;
const TdContainer = styled.td`
  border: 1px solid grey;
`;

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      selectedItem: null
    };
  }

  /**
   * 
   */
  getItems = () => {
    const items = this.props.basket;
    return (items !== null && typeof items === 'string') ? JSON.parse(items) : items ;
  }

  /**
   * 
   */
  getTotal = () => {
    const items = this.getItems();
    let total = 0;
    if (items !== null) {
      total = items.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0);
    }
    return (
      <h2>
        Total:
        $ {(total / 100).toFixed(2)}
      </h2>
    );
  }

  /**
   * Handle the click on the close session button
   */
  handleCloseSessionClick = () => {
    this.props.removeToken();
    this.props.removeUserData();
    window.location.replace('/');
  }

  /**
   * 
   */
  handleBuyItems = () => {
    window.location.replace(`${baseName}/checkout`);
  }

  /**
   * 
   */
  handleDeleteClick = (data) => {
    this.setState({ openDialog: true, selectedItem: data });
  }

  /**
   * 
   */
  handleCloseDialog = () => {
    this.setState({ openDialog: false, selectedItem: null });
  }

  render() {
    const { userData } = this.props;
    const items = this.getItems();
    const total = this.getTotal();
    let title = '';
    let buyButton = null;
    if (items !== null && items.length > 0) {
      title = <h3>{ 'Confirmar la lista de productos en su cesta' }</h3>;
      buyButton = (
        <Button variant="contained" color="primary" onClick={this.handleBuyItems}>
          <AttachMoney />
          Comprar productos
        </Button>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="nine columns">
            { title }
            <TableContainer>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Quitar</th>
                </tr>
              </thead>
              <tbody>
                {items && items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <TdContainer>
                        {item.name}
                      </TdContainer>
                      <TdContainer>
                        $ {(item.price / 100).toFixed(2)}
                      </TdContainer>
                      <TdContainer>
                        <Button variant="contained" color="secondary" onClick={() => this.handleDeleteClick(item)}>
                          <DeleteIcon />
                        </Button>
                      </TdContainer>
                    </tr>
                  );
                })}
              </tbody>
            </TableContainer>
            {total}
            {buyButton}
          </div>
          <div className="three columns">
            <UserHeader userData={userData} closeSession={this.handleCloseSessionClick} />
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <hr />
            <p>
              <a href="/">
                Añadir más productos
              </a>
            </p>
          </div>
        </div>
        <ConfirmDeleteItem 
            open={this.state.openDialog} 
            item={this.state.selectedItem}
            handleClose={this.handleCloseDialog} />
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
  basket: state.basket,
});

export default connect(mapStateToProps, mapDispatch)(Confirm);
