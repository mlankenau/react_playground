import React, { Component } from 'react';


const RenderTextInput = (props) => {
  return (
    <div>
      <input type="text" className={props.className} onChange={props.onChange} value={props.value}/>
    </div>
  )
}

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
    const props = {
      className: "form-control",
      onChange: this.onChange.bind(this),
      value: this.props.value
    }
    return <RenderTextInput {...props}/>
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
    const props = {
      className: this.state.cls + " form-control",
      onChange: this.onChange.bind(this),
      value: this.state.value
    }
    return <RenderTextInput {...props}/>
  }
}

export {IntField, TextField, Field};
