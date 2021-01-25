import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';

import Buton from '~/styles/components/Button';
import { Container, SignForm } from '../styles';

class SignIn extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    signInRequest: PropTypes.func.isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    email: '',
    password: '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { signInRequest } = this.props;
    signInRequest(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <SignForm onSubmit={this.handleSubmit} method="POST">
          <h1>Boas Vindas</h1>

          <span>E-MAIL</span>

          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />

          <span>SENHA</span>

          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />

          <Buton size="big" type="submit">
            ENTRAR
          </Buton>
        </SignForm>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
