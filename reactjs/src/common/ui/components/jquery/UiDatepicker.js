import React from "react";
import $ from "jquery";
import "smartadmin-plugins/es6/jquery-ui.min";

export default class UiDatepicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    const onSelectCallbacks = [];
    const props = this.props;
    const element = $(this.input);

    if (props.minRestrict) {
      onSelectCallbacks.push(selectedDate => {
        $(props.minRestrict).datepicker("option", "minDate", selectedDate);
      });
    }
    if (props.maxRestrict) {
      onSelectCallbacks.push(selectedDate => {
        $(props.maxRestrict).datepicker("option", "maxDate", selectedDate);
      });
    }

    //Let others know about changes to the data field
    onSelectCallbacks.push(selectedDate => {
      element.triggerHandler("change");
      const form = element.closest("form");
      this.input.dispatchEvent(new Event('change'));
      if (typeof form.bootstrapValidator === "function") {
        try {
          form.bootstrapValidator("revalidateField", element);
        } catch (e) {
          console.log(e.message);
        }
      }
    });

    const options = {
      prevText: '<i class="fa fa-chevron-left"></i>',
      nextText: '<i class="fa fa-chevron-right"></i>',
      onSelect: selectedDate => {
        //console.log("selectedDate:", selectedDate);
        if (this.props.onChange !== undefined) {
          this.props.onChange(this.props.name, selectedDate);
        }
        onSelectCallbacks.forEach(cb => {
          cb.call(cb, selectedDate);
        });
      }
    };

    if (props.numberOfMonths) options.numberOfMonths = props.numberOfMonths;

    if (props.dateFormat) options.dateFormat = props.dateFormat;

    if (props.defaultDate) options.defaultDate = props.defaultDate;

    if (props.changeMonth) options.changeMonth = props.changeMonth;
    if (props.readOnly !== true)
      element.datepicker(options);
  }
  handleInputChange(e) {
    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.name, e.target.value);
    }
  }
  render() {
    const {
      minRestrict,
      maxRestrict,
      changesMonth,
      numberOfMonths,
      dateFormat,
      defaultDate,
      changeMonth,
      onChange,
      ...props
    } = { ...this.props };
    return <input autoComplete="off" onChange={this.handleInputChange} type="text" {...props} ref={ref => this.input = ref} />;
  }
}
