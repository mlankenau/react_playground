import React, { Component } from 'react';

class Form extends Component {
  renderFormField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">{field.props.label}</label>
        {field}
      </div>
    )
  }
  changeAttribute(attribute, value) {
    let newValue = Object.assign({}, this.props.value)
    newValue[attribute] = value
    console.log("form data change", newValue)
    if (this.props.onChange)
      this.props.onChange(newValue)
  }
  render(children) {
    let childrenWithProps = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
        value: this.props.value[child.props.attr],
        onChange: (newValue) =>  this.changeAttribute(child.props.attr, newValue),
        edit: this.props.edit
      })
    }.bind(this));

    return (
      <form>
        {React.Children.map(childrenWithProps, (child) => { return this.renderFormField(child) } ) }
      </form>
    )
  }
}

export {Form};
