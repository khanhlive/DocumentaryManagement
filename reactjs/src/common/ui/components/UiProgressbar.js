import React from "react";

import $ from "jquery";

import "bootstrap-progressbar/bootstrap-progressbar.min.js";

export default class UiProgressbar extends React.Component {
  componentDidMount() {
    // $(this.refs.progressbar).progressbar({
    //   display_text: "fill"
    // });
    //console.log("data-transitiongoal", this.props)
  }

  render() {
    let style = this.props.vertical === true ? { height: this.props['data-transitiongoal'] + '%' } : { width: this.props['data-transitiongoal'] + '%' };

    return (
      <div {...this.props} role="progressbar" style={style} aria-valuenow={this.props['data-transitiongoal']} aria-valuemin="0" aria-valuemax="100">{this.props['data-transitiongoal']}%</div>
    )
    //return <div {...this.props} ref="progressbar" />;
  }
}
