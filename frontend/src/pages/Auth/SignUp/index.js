import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';

import Buton from '~/styles/components/Button';
import { Container, SignForm } from '../styles';

class SignUp extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    signUpRequest: PropTypes.func.isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const { signUpRequest } = this.props;
    signUpRequest(name, email, password);
  };

  render() {
    const { email, password, name } = this.state;
    return (
      <Container>
        <SignForm onSubmit={this.handleSubmit} method="POST">
          <h1>Criar Conta</h1>

          <span>NOME</span>

          <input name="name" value={name} onChange={this.handleInputChange} />

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
            Criar
          </Buton>
        </SignForm>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignUp);
