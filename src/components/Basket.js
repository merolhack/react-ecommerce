import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import ConfirmDeleteItem from './ConfirmDeleteItem';

const baseName = (process.env.NODE_ENV !== 'development') ? '/react-ecommerce' : '/';
class Basket extends Component {
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
  handleDeleteClick = (data) => {
    this.setState({ openDialog: true, selectedItem: data });
  }

  /**
   * 
   */
  handleCloseDialog = () => {
    this.setState({ openDialog: false, selectedItem: null });
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
      <h4>
        Total:
        $ {(total / 100).toFixed(2)}
      </h4>
    );
  }

  /**
   * 
   */
  handleBuy = () => {
    window.location.replace(`${baseName}/confirm`);
  }

  render() {
    const items = this.getItems();
    const total = this.getTotal();
    const showButton = (this.props.showButton) ? {} : {display: 'none'};
    let title = '';
    let buyButton = null;
    if (items !== null && items.length > 0) {
        title = 'Productos seleccionados';
        if (this.props.showButton) {
            buyButton = (
                <Button variant="contained" color="secondary" onClick={this.handleBuy}>
                    Comprar Productos
                </Button>
            );
        }
    }
    return (
      <div>
          <h4>{title}</h4>
          {items && items.map((item, index) => {
              return (
                <div key={index}>
                    <Button variant="contained" color="secondary" 
                        onClick={() => this.handleDeleteClick(item)}
                        style={showButton}>
                        <DeleteIcon />
                    </Button>
                    {item.name}
                </div>
            );
          })}
          {total}
          {buyButton}
          <ConfirmDeleteItem 
            open={this.state.openDialog} 
            item={this.state.selectedItem}
            handleClose={this.handleCloseDialog} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    basket: state.basket,
});
  
export default connect(mapStateToProps, null)(Basket);
