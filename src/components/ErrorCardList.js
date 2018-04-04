import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import { getError, listErrors } from '../api/harry';

class ErrorCardList extends React.Component {
  state = {
    errors: [],
  };

  componentDidMount() {
    listErrors().then(data => {
      console.log(data);
      getError(Object.keys(data)[0]).then(result => {
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
  }

  render() {
    const { errors } = this.state;
    if (!errors.length) {
      return <CircularProgress />;
    }

    return (
      <div>
        {errors.map(e => (
          <Card>
            <CardHeader title={e.label} subtitle={e.reason} />
            <CardText>Time detected: {e.timeDetected}</CardText>
            <CardTitle showExpandableButton actAsExpander>
              Occurrences
            </CardTitle>
            <CardText expandable>
              {e.timesOccurred.map(o => <div>{o}</div>)}
            </CardText>
          </Card>
        ))}
      </div>
    );
  }
}

export { ErrorCardList };
