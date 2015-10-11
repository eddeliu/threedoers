/**
 * Copyright (c) 2015 [3Doers]
 *
 * @author Luis Carlos Cruz Carballo [lcruzc@linkux-it.com]
 *
 */

import React from 'react';
import _ from 'lodash';

import OrderNavigationStatus from './navigation.jsx';

import {OrderActions} from './actions.jsx';
import {OrderStore} from './stores.jsx';
import {PageWithMenu} from '../base.jsx';
import {ORDER_STATUSES} from '../../utils/constants';

// Customer order status
import CustomerOrderStatus from './customer/order.jsx';
import CustomerRequestStatus from './customer/request.jsx';
import CustomerReviewStatus from './customer/review.jsx';
import CustomerAcceptedStatus from './customer/accepted.jsx';
import CustomerPrintingStatus from './customer/printing.jsx';

// Printer order status
import PrinterReviewStatus from './printer/review.jsx';
import PrinterAcceptedStatus from './printer/accepted.jsx';
import PrinterPrintingStatus from './printer/printing.jsx';


export default class Order extends PageWithMenu {

  constructor (props, context, updater) {
    let order = props.order;
    delete props.order;

    super(props, context, updater);

    this.orderStore = new OrderStore(order);
    this.state = this.orderStore.getState();
  }

  componentDidMount () {
    this.orderStore.setupPrimus();
    this.unsubscribe = this.orderStore.listen(this.onOrderChanged.bind(this));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  onOrderChanged (state) {
    let shouldRedirect = !state.order;
    shouldRedirect |= (this.isPrinter() && !state.order.printer);

    if (shouldRedirect) {
      // FIXME: Change this to handle html5 push state
      window.location.href = '/';
    } else {
      this.setState(state);
    }
  }

  isPrinter () {
    return this.props.user && this.props.user.printer &&
      (this.props.user.printer === 'accepted' ||
      this.props.user.isPrinter);
  }

  renderAppropriateStep () {
    let rendered;
    let isPrinter = this.isPrinter();
    let props = {...this.state, user: this.props.user, isPrinter};

    switch (this.state.order.status) {
      case ORDER_STATUSES.STARTED[0]:
        rendered = <CustomerOrderStatus {...props}/>;
        break;
      case ORDER_STATUSES.PRINT_REQUESTED[0]:
        rendered = <CustomerRequestStatus {...props}/>;
        break;
      case ORDER_STATUSES.PRINT_REVIEW[0]:
        if (isPrinter) {
          rendered = <PrinterReviewStatus {...props}/>;
        } else {
          rendered = <CustomerReviewStatus {...props}/>;
        }
        break;
      case ORDER_STATUSES.PRINT_ACCEPTED[0]:
        if (isPrinter) {
          rendered = <PrinterAcceptedStatus {...props}/>;
        } else {
          rendered = <CustomerAcceptedStatus {...props}/>;
        }
        break;
      case ORDER_STATUSES.PRINTING[0]:
        if (isPrinter) {
          rendered = <PrinterPrintingStatus {...props}/>;
        } else {
          rendered = <CustomerPrintingStatus {...props}/>;
        }
        break;
    }

    return rendered;
  }

  renderBlock () {
    return (
      <div>
        <OrderNavigationStatus
          status={this.state.order.status}
          isPrinter={this.isPrinter()}
        />

        {this.renderAppropriateStep()}
      </div>
    );
  }
}

