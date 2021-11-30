import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import New from '../views/New';
import Stuff from '../views/Stuff';
import Detail from '../views/Detail';
import Edit from '../views/Edit';

export default function Routes({ userId }) {
  return (
    <div>
      <Switch>
        console.warn({userId});
        <Route exact path="/home" component={Home} />
        <Route exact path="/new" component={() => <New userId={userId} />} />
        <Route exact path="/detail/:firebaseKey" component={Detail} />
        <Route
          exact
          path="/edit/:firebaseKey"
          component={() => <Edit userId={userId} />}
        />
        <Route
          exact
          path="/stuff"
          component={() => <Stuff userId={userId} />}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  userId: PropTypes.string,
};

Routes.defaultProps = { userId: {} };
