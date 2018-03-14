import React, { Component } from 'react';
import {Form, IntField, TextField, Field} from './Form.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auction: {
        id: 123,
        maker: "Volkswagen",
        model: "Golf",
        mileage: 90000
      }
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Form example</h1>

        <Form edit={true} value={this.state.auction} onChange={(val) => this.setState({auction: val})}>
          <TextField label="Hersteller" attr="maker" />   
          <TextField label="Modell" attr="model" />   
          <IntField label="Laufleistung" attr="mileage" />   
        </Form>

      </div>
    );
  }
}

export default App;
