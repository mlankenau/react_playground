import React, { Component } from 'react';
import moment from 'moment'
import './Calendar.css';

const YearSelector = ({value, onChange}) => {
  const goBack = () => onChange( value.clone().subtract(1, 'year'))
  const goForward = () => onChange( value.clone().add(1, 'year'))
  return <div className='year-selector'>
    <button onClick={goBack}> &lt;  </button>
      <span> { value.year() } </span>
    <button onClick={goForward}> &gt; </button>
  </div>
}

const MonthSelector = ({value, onChange}) => {
  const goBack = () => onChange( value.clone().subtract(1, 'months'))
  const goForward = () => onChange( value.clone().add(1, 'months'))
  return <div className='month-selector'>
    <button onClick={goBack}> &lt;  </button>
      <span> { value.format('MMMM') } </span>
    <button onClick={goForward}> &gt; </button>
  </div>
}

const Day = ({value, currentDay, onSelectDay}) => {
  let className = 'day'
  if (value.date() == currentDay.date() && value.month() == currentDay.month())
    className = 'current-day'
  else if (value.month() != currentDay.month())
    className = 'day-other'

  return <div key={'' + value.date() + '_' + value.month()}
    onClick={(e) => onSelectDay(value)}
    className={className}>
      {value.date()}
    </div>
}

class Calendar extends Component {
  constructor(props) {
    super(props)
  }

  onSelectDay(day) {
    if (this.props.onChange)
      this.props.onChange(day)
  }

  /*
   * calculate an integer value for a month including the year
   * so that Dez-2016 < Jan-2017
   */
  totalMonths(m) {
    return m.year()*12+m.month()
  }

  daysToDisplay(date) {
    const firstDayMonth = date.clone().date(1)
    const firstDay = firstDayMonth.clone().subtract(firstDayMonth.day()-1, 'days')
    const days = []
    let day = firstDay
    let finished = false;
    let reachedLastDayOfMonth = false
    while (!finished) {
      days.push(day)
      day = day.clone().add(1, 'd')
      if (this.totalMonths(day) > this.totalMonths(date))
        reachedLastDayOfMonth = true
      if (day.day() == 1 && reachedLastDayOfMonth)
        finished = true
    }
    return days
  }

  currentDate() {
    return this.props.value || moment()
  }

  render() {
    const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

    const days = this.daysToDisplay(this.currentDate())
    return <div className="calendar">
      <div className=''>
        <MonthSelector value={this.currentDate()} onChange={this.props.onChange}/>
        <YearSelector value={this.currentDate()} onChange={this.props.onChange}/>
      </div>
      <div className="week-days">
        {weekDays.map((wday) => <div className="week-day" key={wday}>{wday}</div> )}
      </div>
      {days.map((d) => <Day key={''+d.date()+'_'+d.month()} value={d} currentDay={this.currentDate()} onSelectDay={(e) => this.onSelectDay(d)}/>)}
    </div>
  } 
}

export default Calendar;
