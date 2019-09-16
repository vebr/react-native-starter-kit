import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Login extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  state = {
    error: null,
    success: null,
    loading: false,
  }
  
  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;
    this.setState({ loading: true });
    
    // return fetch('http://localhost:8000/api-token-auth/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(res => res.json())
    //   .then(json => console.log(json))
    //   .then(json => {
    //     localStorage.setItem('token', json.token);
    //     this.setState({
    //       logged_in: true,
    //       displayed_form: '',
    //       username: json.user.username
    //     });
    //   });
    return onFormSubmit(data)
      .then(() => this.setState({
        loading: false,
        success: 'Success - Logged in',
        error: null,
      })).catch((err) => {
        this.setState({
          loading: false,
          success: null,
          error: err,
        });
        throw err; // To prevent transition back
      });
  }

  render = () => {
    const { member, Layout } = this.props;
    const { error, loading, success } = this.state;

    return (
      <Layout
        error={error}
        member={member}
        loading={loading}
        success={success}
        onFormSubmit={this.onFormmSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = dispatch => ({
  onFormSubmit: dispatch.member.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
