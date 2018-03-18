import React, { Component } from 'react';
import {Form} from './Form.js';
import {Table} from './Table.js';
import * as Field from './Fields.js';
import './App.css';
import moment from 'moment';


class ActionButton extends Component {
  click() {
    console.log("clicked on row: ", this.props.row)
    if (this.props.onClick)
      this.props.onClick(this.props.value)
  }

  render() {
    return (
      <button onClick={this.click.bind(this)}>
        {this.props.children}
      </button>
    )
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: moment(),
      auction: {
        id: 123,
        maker: "Volkswagen",
        model: "Golf",
        mileage: 90000,
        //registration_date: '2008-08-01'
      },
      list: [
        {
          id: 1,
          maker: "Volkswagen",
          model: "Golf",
          mileage: 90000
        },
        {
          id: 2,
          maker: "BMW",
          model: "335",
          mileage: 61000 
        },
        {
          id: 3,
          maker: "Audi",
          model: "A5",
          mileage: 30000
        },
      ]
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Form example</h1>
        <Table edit={true} value={this.state.list} onChange={(val) => this.setState({list: val})}>
          <Field.TextField label="Hersteller" attr="maker" />
          <Field.TextField label="Modell" attr="model" />
          <Field.IntField label="Laufleistung" attr="mileage" />
          <ActionButton>Some Action</ActionButton>
        </Table>
        <Form edit={true} value={this.state.auction} onChange={(val) => this.setState({auction: val})}>
          <Field.TextField label="Hersteller" attr="maker" />   
          <Field.TextField label="Modell" attr="model" />   
          <Field.IntField label="Laufleistung" attr="mileage" />   
          <Field.DateField label="Erstzulassung" attr="registration_date" />   
        </Form>

      </div>
    );
  }
}

export default App;
