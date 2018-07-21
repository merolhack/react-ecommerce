import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Reducer methods
import { removeItemToBasket } from '../reducer';

class ConfirmDeleteItem extends Component {
  handleAccept = (data) => {
    this.props.removeItemToBasket(data);
    this.props.handleClose();
  }

  render() {
    console.log(this.props);
    const { item } = this.props;
    const name = (item) ? item.name : null ;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Precaución"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Está seguro de querer eliminar el producto "{name}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => this.handleAccept(this.props.item)} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatch = {
  removeItemToBasket
};
export default connect(null, mapDispatch)(ConfirmDeleteItem);
