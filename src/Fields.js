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
        <input type="text" className="form-control" onChange={this.onChange.bind(this)} value={this.props.value}/>
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
    if (e.target.value.match(/^ *\d* *$/)) {
      this.setState({value: e.target.value, cls: "valid"})
      if (this.props.onChange)
        this.props.onChange(parseInt(e.target.value))
    }
    else
    {
      this.setState({value: e.target.value, cls: "is-invalid "})
    }
  }
  renderEdit() {
    return (
      <div>
        <input type="text" className={this.state.cls + " form-control"} onChange={this.onChange.bind(this)} value={this.state.value}/>
      </div>
    )
  }
}

export {IntField, TextField, Field};
