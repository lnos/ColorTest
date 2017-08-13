/*ToDo
1. Make one Colour more darker //done
2. handleCorrect and handleWrong should be working properly with gameover state
2.5 can add start screen/gameover screen
3. better ui
4. clean up code
**/
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game/>
      </div>
    );
  }
}

class Game extends Component{

  constructor(props) {

      super(props);
      this.generateColor = this.generateColor.bind(this);
      this.generateDarkerColor = this.generateDarkerColor.bind(this);
      this.handleCorrect = this.handleCorrect.bind(this);
      this.hexMinusOne = this.hexMinusOne.bind(this);
      var color = this.generateColor();
      var darkerColor = this.generateDarkerColor(color, "red");
      this.state = {color: color, darkerColor: darkerColor, firstOneIsDarker: false, changeColor: "red", score: 0, gameover: false};
  }

  generateColor(){
    var letters = '123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 15)];
    }
    return color;
  }

  generateDarkerColor(color, changeColor){
    var colorArray = color.split("");
    if(changeColor === "red"){
      var newRedArray = this.hexMinusOne(colorArray[1] + colorArray[2]).split("");
      colorArray[1] = newRedArray[0];
      colorArray[2] = newRedArray[1];
    }
    if(changeColor === "green"){
      var newGreenArray = this.hexMinusOne(colorArray[3] + colorArray[4]).split("");
      colorArray[3] = newGreenArray[0];
      colorArray[4] = newGreenArray[1];
    }
    if(changeColor === "blue"){
      var newBlueArray = this.hexMinusOne(colorArray[5] + colorArray[6]).split("");
      colorArray[5] = newBlueArray[0];
      colorArray[6] = newBlueArray[1];
    }
    color = colorArray.join("");
    return color;
  }

  //Takes two digit hex number then minus one from the value
  hexMinusOne(hex){
    return (parseInt(hex, 16) - 9).toString(16);
  }

  handleCorrect(){
    var color = this.generateColor();
    this.setState({color: color, darkerColor: this.generateDarkerColor(color, "red"), score: this.state.score + 1, firstOneIsDarker: Math.random() >= 0.5});
  }

  handleWrong(){
    this.setState({gameover: true});
  }

  render(){

    if(this.state.firstOneIsDarker){
      return(
      <div className="Game">
        <Score score={this.state.score}/>
        <Square color={this.state.darkerColor}
                onAnswer={this.handleCorrect}/>
        <Square color={this.state.color}
                onAnswer={this.handleCorrect}/>
      </div>
    )
    } 
    else{
      return(
        <div className="Game">
          <Score score={this.state.score}/>
          <Square color={this.state.color}
                  onAnswer={this.handleCorrect}/>
          <Square color={this.state.darkerColor}
                  onAnswer={this.handleCorrect}/>
        </div>
      )
    }

    
  }
}

class Square extends Component{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.props.onAnswer();
  }

  render(){

    const color = this.props.color;

    return(
      <div className="Square">
        <button className="button" style={{background: color}} onClick={this.handleClick}>
        
        </button>
      </div>
    )
  }
}

class Score extends Component{

  render(){
    return(
      <div className="Square">
        {this.props.score}
      </div>
    )
  }
}

export default App;
