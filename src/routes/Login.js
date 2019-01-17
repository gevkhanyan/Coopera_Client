import gql from 'graphql-tag';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { graphql } from 'react-apollo';
import {
    Button, Container, Form, Header, Input, Message,
} from 'semantic-ui-react';


class Login extends React.Component {
    constructor(props) {
        super(props);

        extendObservable(this, {
            email: '',
            password: '',
            errors: {},
        });
    }

    onSubmit = async () => {
        const { email, password } = this;
        const response = await this.props.mutate({
            variables: { email, password },
        });

        console.log(response);

        const {
            success, token, refreshToken, errors,
        } = response.data.login;

        if (success) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            this.props.history.push('/');
        } else {
            const err = {};
            errors.forEach(({ path, message }) => {
                err[`${path}Error`] = message;
            });
            this.errors = err;
        }
    };

    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    };

    render() {
        const { email, password, errors: { emailError, passwordError } } = this;

        const errorList = [];

        if (emailError) {
            errorList.push(emailError);
        }

        if (passwordError) {
            errorList.push(passwordError);
        }

        return (
            <Container text>
                <Header as="h2">Login</Header>
                <Form>
                    <Form.Field error={!!emailError}>
                        <Input
                            name="email"
                            onChange={this.onChange}
                            value={email}
                            placeholder="Email"
                            fluid
                        />
                    </Form.Field>
                    <Form.Field error={!!passwordError}>
                        <Input
                            onChange={this.onChange}
                            value={password}
                            type="password"
                            name="password"
                            placeholder="Password"
                            fluid
                        />
                    </Form.Field>
                    <Button onClick={this.onSubmit}>Submit</Button>
                </Form>
                {errorList.length ? (<Message
                    error
                    header="There was some errors with your submission"
                    list={errorList}
                />
                ) : null}
            </Container>
        );
    }
}


const loginMutation = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password:  $password) {
            success
            token
            refreshToken
            errors {
                path
                message
            }
        }
    }
`;

export default graphql(loginMutation)(observer(Login));
