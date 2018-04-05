import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import { getError, listErrors } from '../api/harry';

class ErrorCardList extends React.Component {
  state = {
    errors: [],
  };

  componentDidMount() {
    listErrors().then(data => {
      console.log(data);
      Object.keys(data)
        .slice(0, 5)
        .forEach(errorId => {
          getError(errorId).then(result => {
            const { create_date, id, label } = result;
            const { reason, time_detected, times_occurred } = JSON.parse(
              result.params
            );
            this.setState({
              errors: [
                ...this.state.errors,
                {
                  createDate: create_date,
                  id,
                  label,
                  reason,
                  timeDetected: time_detected,
                  timesOccurred: times_occurred,
                },
              ],
            });
            console.log(result);
            console.log(JSON.parse(result.params));
          });
        });
    });
  }

  render() {
    const { errors } = this.state;
    console.log('Render errors', errors);
    if (!errors.length) {
      return <CircularProgress />;
    }

    return (
      <List>
        <Subheader>Nested List Items</Subheader>
        <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
        <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
        <ListItem
          primaryText="Inbox"
          leftIcon={<ContentInbox />}
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Starred"
              leftIcon={<ActionGrade />}
            />,
            <ListItem
              key={2}
              primaryText="Sent Mail"
              leftIcon={<ContentSend />}
              disabled={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Drafts"
                  leftIcon={<ContentDrafts />}
                />,
              ]}
            />,
            <ListItem
              key={3}
              primaryText="Inbox"
              leftIcon={<ContentInbox />}
              open={this.state.open}
              onNestedListToggle={this.handleNestedListToggle}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Drafts"
                  leftIcon={<ContentDrafts />}
                />,
              ]}
            />,
          ]}
        />
      </List>
    );
  }
}

export { ErrorCardList };
