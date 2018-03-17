import React, { Component } from 'react'
import Calendar from './Calendar'
import {MyModal} from './MyModal'
import moment from 'moment'

const RenderTextInput = (props) => {
  return (
      <input type="text" style={ {display: 'inline-block'} } className={props.className} onChange={props.onChange} value={props.value}/>
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


class DateField extends Field {
  constructor(props) {
    super(props)
    
    const date = moment(props.value)
    const text = props.value ? date.format('DD.MM.YYYY') : ""
    this.state = {
      value: text,
      cls: "valid",
      showCalendar: false
    }
  }
  onChange(e) {
    const date = moment(e.target.value, "DD.MM.YYYY", true)
    if (date.isValid()) {
      this.setState({value: e.target.value, cls: "valid"})
      if (this.props.onChange)
        this.props.onChange(date.format())
    }
    else
    {
      this.setState({value: e.target.value, cls: "is-invalid "})
    }
  }
  onChangeCal(d) {
    const val = d.format('YYYY-MM-DD')
    const text = d.format('DD.MM.YYYY')
    this.setState({value: text})
    if (this.props.onChange)
      this.props.onChange(val)
  }
  onShowCalendar(e) {
    this.setState({showCalendar: true})
    e.preventDefault()
  }
  onCalendarClose() {
    this.setState({showCalendar: false})
  }
  renderEdit() {
    const date = moment(this.props.value)
    const props = {
      className: this.state.cls + " form-control",
      onChange: this.onChange.bind(this),
      value: this.state.value,
      style: {display: 'inline-block'}
    }
    return (
    <div>
      <nobr>
      <RenderTextInput {...props}/>
      <button className="btn btn-primary" style={ {display: 'inline-block'} } onClick={(e) => this.onShowCalendar(e)}>...</button>
      </nobr>
      <MyModal width={340} show={this.state.showCalendar} onHide={this.onCalendarClose.bind(this)}>
        <Calendar value={date} onChange={ (d) => this.onChangeCal(d)}/>
      </MyModal>
    </div>)
  }
}

export {DateField, TextField, IntField}
