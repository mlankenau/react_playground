import React, { Component } from 'react'
import {Field} from './Field'
import {RenderTextInput} from './TextField'

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

export {IntField}
