import React, { Component } from 'react';

class Field extends Component {
  renderShow() {
    return (
      <div>
        {this.props.value}
      </div>
    )
  }
  render() {
    if (this.props.edit)
      return this.renderEdit()
    else
      return this.renderShow()
  }
}

class TextField extends Field {
  onChange(e) {
    if (this.props.onChange)
      this.props.onChange(e.target.value)
  }
  renderEdit() {
    return (
      <div>
        <input type="text" onChange={this.onChange.bind(this)} value={this.props.value}/>
      </div>
    )
  }
}

class IntField extends Field {
  constructor(props) {
    super(props)
    this.state = { value: props.value, cls: "valid" }
  }
  onChange(e) {
    console.log("event", e)
    if (e.target.value.match(/^ *\d* *$/)) {
      this.setState({value: e.target.value, cls: "valid"})
      if (this.props.onChange)
        this.props.onChange(parseInt(e.target.value))
    }
    else
    {
      this.setState({value: e.target.value, cls: "invalid"})
    }
  }
  renderEdit() {
    return (
      <div>
        <input type="text" class={this.state.cls} onChange={this.onChange.bind(this)} value={this.state.value}/>
      </div>
    )
  }
}

class Form extends Component {
  renderFormField(field) {
    return (
      <div>
        <label>{field.props.label}</label>
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

export {Form, IntField, TextField, Field};
