import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import CloseIcon from '@material-ui/icons/Close';
// CSS Styles
import styled from 'styled-components';

// Redux: Reducer methods
import { addToken, addUserData } from '../reducer';

// Auth0
// import Auth from '../services/Auth';

const Container = styled.section`
  width: 100vw;
  height: 60vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
`;
const SnackBarOptions = {
  vertical: 'bottom',
  horizontal: 'left',
};
const ExternalContainer = styled.div`
  width: 100%;
  height: 40px;
  clear: both;
  display: block;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      openSnackBar: false,
      openSnackBarFilled: false,
      apiData: {}
    };
  }

  /**
   * Check if the email is valid
   * https://gist.github.com/tabvn/c047f0376a1ba0d93b2c3e14947fa8da
   */
  isEmail = (email = null) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('isEmail', 'email', email);
    console.log('isEmail', 'test', regex.test(email));
    return !regex.test(email);
  }

  /**
   * Handle the change of the email input
   */
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  /**
   * Handle the change of the password input
   */
  handlePassChange = (event) => {
    this.setState({ pass: event.target.value });
  }

  /**
   * Handle the submit of the login form
   */
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('this.state', this.state);
    // Show the snackbar at the botton
    if (this.state.email.length === 0 || this.state.pass.length === 0) {
      this.setState({ openSnackBar: true });
      // Hide the snackbar after 3 seconds
      setTimeout(() => {
        this.setState({ openSnackBar: false });
      }, 3000);
    } else {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log('options', options);
      // Get the token
      fetch('https://react-back-siujvuooba.now.sh/login', options)
        .then(response => response.json())
        .then(apiData => {
          console.log('apiData', apiData);
          this.setState({ openSnackBarFilled: true });
          this.setState({ apiData });
          this.props.addToken(apiData.token);
          this.props.addUserData({
            email: this.state.email
          });
        });

        // Auth.login();
    }
  }

  /**
   * 
   */
  handleCloseSnackBar = () => {
    this.setState({ openSnackBar: false });
  }

  /**
   * 
   */
  handleCloseSnackBarFilled = () => {
    this.setState({ openSnackBarFilled: false });
  }

  /**
   * 
   */
  handleRegistryClick = (event) => {
    alert('Por el momento no se puede registrar');
  }

  /**
   * A better approach on how to change the state values
   */
  changeStateValue = (param, value) => {
    this.setState(() => ({
      [param]: value,
    }))
  }
  
  /* 
  onChange={({ target: { value }}) => this.changeVal('email', value)}
  */

  /**
   * 
   */
  render() {
    // Destructuring variables
    const { email, pass, openSnackBar, openSnackBarFilled } = this.state;
    console.log(this.state.token);
    console.log('render', 'props', this.props);
    return (
      <div>
        <Container>
          <StyledForm onSubmit={this.handleFormSubmit}>
            <div>
              <p>Credenciales:</p>
              <ul>
                <li><strong>User:</strong> admin@email.io</li>
                <li><strong>Pass:</strong> 123456</li>
              </ul>
            </div>
            <FormControl>
              <InputLabel htmlFor="name" error={email.length !== 0 && this.isEmail(email)}>Email</InputLabel>
              <Input id="name" type="email" 
                value={email} onChange={this.handleEmailChange} 
                error={email.length !== 0 && this.isEmail(email)}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
                required />
              <FormHelperText id="name-helper-text">Ingresa tu correo</FormHelperText>
            </FormControl>
            <br />
            <FormControl>
              <InputLabel htmlFor="pass">Password</InputLabel>
              <Input id="pass" type="password" 
                value={pass} onChange={this.handlePassChange} 
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                required />
              <FormHelperText id="pass-helper-text">Ingresa tu contraseña</FormHelperText>
            </FormControl>
            <ButtonContainer>
              <Button type="submit" variant="contained">
                Ingresar
              </Button>
              <Button type="button" variant="contained" color="secondary" onClick={this.handleRegistryClick}>
                Registrarse
              </Button>
            </ButtonContainer>
          </StyledForm>

          <Snackbar
            anchorOrigin={SnackBarOptions}
            open={openSnackBar}
            autoHideDuration={3000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Favor de ingresar el Usuario y la Contraseña</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseSnackBar}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
          <Snackbar
            anchorOrigin={SnackBarOptions}
            open={openSnackBarFilled}
            autoHideDuration={3000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Lo has llenado</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseSnackBarFilled}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Container>
        <ExternalContainer><a href="/foo">Ir a foo</a></ExternalContainer>
      </div>
    );
  }
}

const mapDispatch = {
  addToken,
  addUserData
};

export default connect(null, mapDispatch)(Login);
