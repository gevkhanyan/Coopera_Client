import React from 'react';
import { Grid } from 'semantic-ui-react';

const TeamSideBar = ({
    teamName, username, channelNames, userToDM,
}) => (
    <Grid>
        <Grid.Row>
            <h1>{teamName}</h1>
            <h4>{username}</h4>
        </Grid.Row>
        <Grid.Row>
            <h1>Channels</h1>
            {channelNames.map(cn => <p>{cn}</p>)}
        </Grid.Row>
        <Grid.Row>
            <h1>Direct Messages</h1>
            {userToDM.map(person => <p>{person}</p>)}
        </Grid.Row>
    </Grid>
);

export default TeamSideBar;
