/**
 * Copyright (c) 2015 [3Doers]
 *
 * @author Luis Carlos Cruz Carballo [lcruzc@linkux-it.com]
 *
 */

import React from 'react';
import Router from 'react-router';

import routes from '../../app/components/routes.jsx';


Router.run(routes, Router.HistoryLocation, (Root, state) => {
  React.render(<Root/>, document.getElementById('react-root'));
});
