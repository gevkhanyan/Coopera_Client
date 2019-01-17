import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import MessageInput from '../components/MessageInput';
import TeamHeader from '../components/TeamHeader';

import TeamSidebar from '../components/TeamSidebar';


export default () => (
    <Container>
        <Grid>
            <Grid.Column width={3}>
                <TeamSidebar
                    teamName="Bob is Cool"
                    username="Bob the first"
                    channelNames={['general', 'random']}
                    userToDM={['slackbot']}
                />
            </Grid.Column>

            <Grid.Column width={10}>
                <TeamHeader />
                <MessageInput />
            </Grid.Column>
        </Grid>
    </Container>
);
3
