import React from "react";

import Stores from "../../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
//import { connect } from "react-redux";

@inject(Stores.BreadcrumbStore)
@observer
class SmallBreadcrumbs extends React.Component<any, any> {
  render() {
    return (
      <ol className="breadcrumb">
        {this.props.breadcrumbStore.items.map((it: any) => (
          <li key={it}>{it}</li>
        ))}
      </ol>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   const navigation = state.navigation;
//   // const {navigation, routing}= state;
//   const route = {}; // routing.locationBeforeTransitions.pathname;

//   const titleReducer = (chain, it) => {
//     if (it.route === route) {
//       chain.push(it.title);
//     } else if (it.items) {
//       it.items.reduce(titleReducer, chain);
//     }
//     return chain;
//   };

//   const items = navigation.items.reduce(titleReducer, ["Home"]);

//   return { items };
// };

//export default connect(mapStateToProps)(SmallBreadcrumbs);
export default SmallBreadcrumbs;
