import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Students from '~/pages/Students';
import StudentsRegistration from '~/pages/StudentsRegistration';

import Plans from '~/pages/Plans';
import PlansRegistration from '~/pages/PlansRegistration';

import Profile from '~/pages/Profile';

import Enrolments from '~/pages/Enrolments';
import EnrolmentsRegistration from '~/pages/EnrolmentsRegistration';

import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={Students} isPrivate />
      <Route
        path="/studentsregistration"
        component={StudentsRegistration}
        isPrivate
      />
      <Route
        path="/studentupdate/:id"
        component={StudentsRegistration}
        isPrivate
      />

      <Route path="/plans" component={Plans} isPrivate />
      <Route
        path="/plansregistration"
        component={PlansRegistration}
        isPrivate
      />
      <Route path="/planupdate/:id" component={PlansRegistration} isPrivate />

      <Route path="/enrolments" component={Enrolments} isPrivate />
      <Route
        path="/enrolmentsregistration"
        component={EnrolmentsRegistration}
        isPrivate
      />
      <Route
        path="/enrolmentsupdate/:id"
        component={EnrolmentsRegistration}
        isPrivate
      />

      <Route path="/help-orders" component={HelpOrders} isPrivate />

      <Route path="/register" component={SignUp} />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
