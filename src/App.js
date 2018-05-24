import React, { Component } from 'react';
import './App.css';
import { debounce } from './helperFunctions'
import { config } from './config/index'

const keypadObj = {
  0 : '0',
  1 : '.,!1',
  2 : 'abc2',
  3 : 'def3',
  4 : 'ghi4',
  5 : 'jkl5',
  6 : 'mno6',
  7 : 'pqrs7',
  8 : 'tuv8',
  9 : 'wxyz9',
  '*' : '*',
  '#' : '#'
}
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      result : '',
      prevKey : 0,
      prevKeyIndex : 0,
      tempKeyValue : ''
    }
    this.handleButtonClickAppend = debounce(this.handleButtonClickAppend, config.DEBOUNCE_TIME)
  }  

  handleButtonClick = (e, key) => {
    let value = keypadObj[key]

    let result = this.state.result
    let tempKeyValue = this.state.tempKeyValue
    let prevKeyIndex = Number(this.state.prevKeyIndex)
    let prevKey = this.state.prevKey
    let tempString = '', index = 0;
    if(value && value.length > 0){
      if(tempKeyValue.length > 0  && value[prevKeyIndex] && key == prevKey){
        tempString = tempKeyValue.slice(0,-1).concat(value[prevKeyIndex])
        index = prevKeyIndex + 1
      
      } else if(tempKeyValue.length > 0 && value[0] != undefined && key != prevKey){
        tempString = tempKeyValue.concat(value[0])
        index = 1
      
      } else if(tempKeyValue.length == 0 && result.length == 0){
        tempString = value[prevKeyIndex]
        index = prevKeyIndex + 1

      } else if(tempKeyValue.length == 0 && result.length > 0 && value[prevKeyIndex] != undefined){
        tempString = result.concat(value[prevKeyIndex])
        index = 0

      } else {
        if(result.length > tempKeyValue.length){
          tempString = result
        } else if(result.length < tempKeyValue.length){
          tempString = tempKeyValue
        } else {
          tempString = result
        }
      }
      if(value[index] == undefined){
        index = 0
      }
      this.setState({
        prevKey : key,
        prevKeyIndex : index,
        tempKeyValue : tempString,
      })
      this.handleButtonClickAppend()
    }

  }

  handleButtonClickAppend = () => {
    if(this.state.tempKeyValue){
      this.setState({prevKeyIndex : 0, tempKeyValue : '', result : this.state.tempKeyValue}, 
        () => {
          console.log('resultant array----after debounce------------', this.state.result)   
      })  
    }
    
  }

  render() {
    return (
      <div className="App">
        <table id="phone">
        <tbody>
          <tr>
              <td colSpan="3">
                  <input type="text" id="result" value={this.state.tempKeyValue && this.state.tempKeyValue.length > 0 ? this.state.tempKeyValue : this.state.result}/>
              </td>
          </tr>
          <tr>
              <td>
                  <button data-value="1" className="key" onClick={(e) => this.handleButtonClick(e,'1')}>1
                      <span>. , !</span>
                  </button>
              </td>
              <td>
                  <button data-value="2" className="key" onClick={(e) => this.handleButtonClick(e,'2')}>2
                      <span>a b c</span>
                  </button>
              </td>
              <td>
                  <button data-value="3" className="key" onClick={(e) => this.handleButtonClick(e,'3')}>3
                      <span>d e f</span>
                  </button>
              </td>
          </tr>
          <tr>
              <td>
                  <button data-value="4" className="key" onClick={(e) => this.handleButtonClick(e,'4')}>4
                      <span>g h i</span>
                  </button>
              </td>
              <td>
                  <button data-value="5" className="key" onClick={(e) => this.handleButtonClick(e,'5')}>5
                      <span>j k l</span>
                  </button>
              </td>
              <td>
                  <button data-value="6" className="key" onClick={(e) => this.handleButtonClick(e,'6')}>6
                      <span>m n o</span>
                  </button>
              </td>
          </tr>
          <tr>
              <td><button data-value="7" className="key" onClick={(e) => this.handleButtonClick(e,'7')}>7
                  <span>p q r s</span>
                  </button>
              </td>
              <td>
                  <button data-value="8" className="key" onClick={(e) => this.handleButtonClick(e,'8')}>8
                      <span>t u v</span>
                  </button>
              </td>
              <td>
                  <button data-value="9" className="key" onClick={(e) => this.handleButtonClick(e,'9')}>9
                      <span>w x y z</span>
                  </button>
              </td>
          </tr>
          <tr>
              <td><button data-value="*" className="key" onClick={(e) => this.handleButtonClick(e,'*')}>*</button></td>
              <td><button data-value="0" className="key" onClick={(e) => this.handleButtonClick(e,'0')}>0</button></td>
              <td><button data-value="#" className="key" onClick={(e) => this.handleButtonClick(e,'#')}>#</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;