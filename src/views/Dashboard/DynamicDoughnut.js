import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

class DynamicDoughnut extends Component {

 static option = {
  
    maintainAspectRatio: false,
 }
getRandomInt = (min,max)=>{
   return  Math.floor(Math.random()*(max-min+1))+min;
};

 getState = () => ({
  labels: [
    '서문',
    '북문',
    '정문'
  ],
  datasets: [{
    data: [this.getRandomInt(50, 200), this.getRandomInt(100, 150), this.getRandomInt(150, 250)],
    backgroundColor: [
    '#CCC',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
});

getInitialState() {
  return this.getState();
}

componentWillMount() {
  //컴포넌트 렌더링 되기 전에 생성할때 주기적으로 스테이트 바꿔줌.
  setInterval(() => {
    this.setState(this.getState());
  }, 5000);
}

  render() {
    return (
      <div>
        <h2 style = {{marginLeft:500+'px'}}><strong>실시간 경북대 인근 유동인구</strong></h2>
        <div className="chart-wrapper" style={{ height: 480 + 'px', marginTop: 30 + 'px',marginLeft: 500+'px' }}>
        <Doughnut data={this.state} options = {this.option} height = {400}/>
        </div>
      </div>
    );
  }
}

export default DynamicDoughnut;



