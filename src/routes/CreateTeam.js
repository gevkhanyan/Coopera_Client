import gql from 'graphql-tag';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { graphql } from 'react-apollo';
import {
    Button, Container, Form, Header, Input, Message,
} from 'semantic-ui-react';


class CreateTeam extends React.Component {
    constructor(props) {
        super(props);

        extendObservable(this, {
            name: '',
            errors: {},
        });
    }

    onSubmit = async () => {
        const { name } = this;
        let response = null;

        try {
            response = await this.props.mutate({
                variables: { name },
            });

            const { success, errors } = response.data.createTeam;

            if (success) {
                this.props.history.push('/');
            } else {
                const err = {};
                errors.forEach(({ path, message }) => {
                    err[`${path}Error`] = message;
                });
                this.errors = err;
            }
        } catch (e) {
            this.props.history.push('/login');
        }

        console.log(response);
    };

    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    };

    render() {
        const { name, errors: { nameError } } = this;

        const errorList = [];

        if (nameError) {
            errorList.push(nameError);
        }

        return (
            <Container text>
                <Header as="h2">Create a team</Header>
                <Form>
                    <Form.Field error={!!nameError}>
                        <Input
                            name="name"
                            onChange={this.onChange}
                            value={name}
                            placeholder="Name"
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


const createTeamMutation = gql`
    mutation($name: String!) {
        createTeam(name: $name) {
            success
            errors {
                path
                message
            }
        }
    }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
