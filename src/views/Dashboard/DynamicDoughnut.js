import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import CountUp from 'react-countup';

class DynamicDoughnut extends Component {

 static option = {
    maintainAspectRatio: false,
 }
//이거 서버랑 연동
getSeoPeople = ()=>{
  return  12;
}
getBukPeople = ()=>{
  return  10;
}
getJeongPeople = ()=>{
  return  13;
}
getTotal = () =>{
  return this.getSeoPeople()+this.getBukPeople()+this.getJeongPeople();
}
 getState = () => ({

  labels: [
    '북문',
    '서문',
    '정문'
  ],
  datasets: [{
    data: [this.getBukPeople(), this.getSeoPeople(), this.getJeongPeople()],
    backgroundColor: [
    '#CCC',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#FF6384',
    '#FF6384',
    ]
  }]
});

getInitialState() {
  return this.getState();
}

componentWillMount() {
  //컴포넌트 렌더링 되기 전에 생성할때 주기적으로 스테이트 바꿔줌.
  setInterval(() => { //이거 서버 연동으로 바꿔야댐
    this.setState(this.getState());
  }, 5000);
}

  render() {
    return (
      <div>
        <h2 style = {{marginLeft:400+'px'}}><strong>실시간 경북대 인근 유동인구</strong></h2><br/>
        <div style={{ height: 480 + 'px', marginTop: 30 + 'px',marginLeft: 430+'px',float:'left'}}>
        <Doughnut data={this.state} options = {this.option} height = {400} />
        </div>
        <div style = {{float:'left',marginLeft: 50+'px',marginTop: 100+'px',fontSize: 30+'px'}}> 
        <div style = {{fontSize: 25+'px'}}>
        최근 한시간 동안 
        </div>
        <div style={{height:50+'px', width:100+'px',backgroundColor : 'white',textAlign:'center',borderRadius:12+'px',marginTop:10+'px',marginBottom:10+'px'}}>
        <CountUp start={0} end={this.getTotal()} />
        명</div>
        <div style = {{fontSize: 25+'px'}} >
        의 유동인구가 있습니다.
          </div> 
        </div>
        {/*여기에 증가 감소 이런거 추가 */}
      </div>
    );
  }
}

export default DynamicDoughnut;



