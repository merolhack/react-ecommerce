import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import AttachMoney from '@material-ui/icons/AttachMoney';
// CSS Styles
import styled from 'styled-components';
// Reducer methods
import { removeToken, removeUserData } from '../reducer';
// Child components
import UserHeader from './UserHeader';
import Basket from './Basket';

const StyledForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
`;
const ExpirationContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
`;

const baseName = (process.env.NODE_ENV !== 'development') ? '/react-ecommerce' : '/';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      secondName: '',
      cardNumber: '',
      code: '',
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

  /**
   * Handle the submit of the login form
   */
  handleFormSubmit = (event) => {
    event.preventDefault();
  }

  /**
   * A better approach on how to change the state values
   */
  changeStateValue = (param, value) => {
    switch (param) {
      case 'cardNumber':
        value = this.limitLength(value, 16);
        break;
      case 'expirationMonth':
        value = this.limitLength(value, 2);
        break;
      case 'expirationYear':
        value = this.limitLength(value, 4);
        break;
      case 'code':
        value = this.limitLength(value, 4);
        break;
    }
    this.setState(() => ({
      [param]: value,
    }));
  }

  limitLength = (str, length) => str.substring(0, length);

  render() {
    const { userData } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="nine columns">
            <h3>Complete la información de su pago</h3>
            <StyledForm onSubmit={this.handleFormSubmit}>

              <FormControl aria-describedby="first_name-helper-text">
                <InputLabel htmlFor="first_name-helper">Nombre(s)</InputLabel>
                <Input id="first_name-helper" value={this.state.firstName} 
                  onChange={({ target: { value }}) => this.changeStateValue('firstName', value)} />
                <FormHelperText id="first_name-helper-text">Nombre completo</FormHelperText>
              </FormControl>

              <FormControl aria-describedby="second_name-helper-text">
                <InputLabel htmlFor="second_name-helper">Apellido(s)</InputLabel>
                <Input id="second_name-helper" value={this.state.secondName} 
                  onChange={({ target: { value }}) => this.changeStateValue('secondName', value)} />
                <FormHelperText id="second_name-helper-text">Apellidos completo</FormHelperText>
              </FormControl>

              <FormControl aria-describedby="card_number-helper-text">
                <InputLabel htmlFor="card_number-helper">Número de tarjeta</InputLabel>
                <Input id="card_number-helper" value={this.state.cardNumber} type="text"
                  pattern="\d*"
                  onChange={({ target: { value }}) => this.changeStateValue('cardNumber', value)} />
                <FormHelperText id="card_number-helper-text">15 o 16 dígitos</FormHelperText>
              </FormControl>

              <ExpirationContainer>
                <FormControl aria-describedby="expiration_month-helper-text">
                  <InputLabel htmlFor="expiration_month-helper">Mes</InputLabel>
                  <Input id="expiration_month-helper" value={this.state.expirationMonth} type="number"
                    onChange={({ target: { value }}) => this.changeStateValue('expirationMonth', value)} />
                  <FormHelperText id="expiration_month-helper-text">Dos digitos</FormHelperText>
                </FormControl>

                <FormControl aria-describedby="expiration_year-helper-text">
                  <InputLabel htmlFor="expiration_year-helper">Año</InputLabel>
                  <Input id="expiration_year-helper" value={this.state.expirationYear} type="number"
                    onChange={({ target: { value }}) => this.changeStateValue('expirationYear', value)} />
                  <FormHelperText id="expiration_year-helper-text">Cuatro dígitos</FormHelperText>
                </FormControl>
              </ExpirationContainer>

              <FormControl aria-describedby="code-helper-text">
                <InputLabel htmlFor="code-helper">Código de seguridad</InputLabel>
                <Input id="code-helper" value={this.state.code} type="number"
                  onChange={({ target: { value }}) => this.changeStateValue('code', value)} />
                <FormHelperText id="code-helper-text">Al reverso de su tarjeta</FormHelperText>
              </FormControl>

              <p>&nbsp;</p>

              <Button variant="contained" color="primary" type="submit">
                <AttachMoney />
                Pagar
              </Button>

            </StyledForm>
          </div>
          <div className="three columns">
            <UserHeader userData={userData} closeSession={this.handleCloseSessionClick} />
            <Basket showButton={false} />
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <hr />
            <p>
              <a href={baseName}>
                Ir al inicio
              </a>
            </p>
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
  basket: state.basket,
});

export default connect(mapStateToProps, mapDispatch)(Checkout);
