/**
 *
 * @copyright 2015 [3Doers]
 * @version 1.0.0
 * @overview This files will store all actions required for the system.
 * @author Luis Carlos Cruz Carballo [lcruzc@linkux-it.com]
 * @module components/order/actions
 *
 * @exports {{
 *   OrderActions: Object
 * }}
 */

import Airflux from 'airflux';

export let OrderActions = {
 changeColorProject: new Airflux.Action().asFunction,
 changeMaterialProject: new Airflux.Action().asFunction,
 changeAmountProject: new Airflux.Action().asFunction,
 changeAdditionalProcessingProject: new Airflux.Action().asFunction,
 selectCurrentItem: new Airflux.Action().asFunction,
 deleteItem: new Airflux.Action().asFunction,
 newItemAdded: new Airflux.Action().asFunction
};