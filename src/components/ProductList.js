import React, { Component } from 'react';
import { connect } from 'react-redux';
// CSS Styles
import styled from 'styled-components';
// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// Reducer methods
import { addItemToBasket } from '../reducer';

const PContainer = styled.p`
  margin: 0;
  padding: 0
`;
const ButtonContainer = styled.div`
  align-content : center;
`;
const CardStyle = {
  height: '500px',
  marginTop: '20px'
};

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /**
   * Handle the click on the buy button
   */
  handleBuyClick = (data) => {
    console.log('handleBuyClick', data);
    this.props.addItemToBasket(data);
  }

  render() {
    const { items } = this.props;
    return (
      <div>
        <h4>
          Listado de productos
        </h4>
        <div>
          {items.map((element, index) => {
            const marginLeft = (index===3) ? 0 : '' ;
            return (
              <Card key={index} className="four columns" style={{...CardStyle, marginLeft}}>
                <CardHeader
                  title={element.name}
                />
                <img src={element.img} alt="" style={{width: '100%'}} />
                <CardContent>
                  <PContainer>Precio: $ {(element.price / 100).toFixed(2)}</PContainer>
                  <ButtonContainer>
                    <Button type="button" variant="contained" color="secondary"
                      onClick={() => this.handleBuyClick(element)}>
                      Añadir al carrito
                    </Button>
                  </ButtonContainer>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  addItemToBasket,
};

export default connect(null, mapDispatch)(ProductList);