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
getIncDec = () =>{
  //한시간 전 것과 비교
  var diff = this.getTotal() - 10;
   if(diff>=0)
            return'+'+ diff;
   else
            {
              return diff;
            }
}
/*
 getState = () => ({
  labels: [
    '북문',
    '서문',
    '정문'
  ],
  datasets: [{
    data: [10, 9, 8],
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
*/
/*
getInitialState() {
  return this.getState();
}*/
  /* JSON파일 구조
  {
    "userId" : 1,
    "id" : 1, -> camera_id, counting, hour
    "title" : "delectus aut autem",
    "completed" : false
  }
  */

 callApi = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  await response.json()
  .then(res => 
    {
      //from String to Number
      res.id*=1;
      var BukCount = res.id;
      var SeoCount = res.id*2;
      var JeongCount = res.id*8;

      this.setState({
        labels: [
         '북문',
         '서문',
         '정문'
        ],
       datasets: [{
         data: [BukCount,SeoCount,JeongCount],
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
  })})
  .catch(err => console.log(err));

  console.log('state 변경 오나료');

  };
  
 componentWillMount() {  
  this.callApi();
  //setInterval(() => { //이거 서버 연동으로 바꿔야댐
//    this.setState(this.getState());
 // }, 5000);
}

/*
1 - rest api 연동
2 - 프롭스로 주기
3 - 카메라 별로 다르게
*/

  render() {
    return (
      <div>
        <div style={{ height: 480 + 'px', marginTop: 100 + 'px',marginLeft: 200+'px',float:'left'}}>
        <Doughnut data={this.state} options = {this.option} height = {400} />
        </div>
        <div style = {{float:'left',marginLeft: 150+'px',marginTop: 150+'px',fontSize: 30+'px'}}> 
        <div style = {{fontSize: 35+'px'}}><strong>실시간 경북대 인근 유동인구</strong></div><br/>
        <div style = {{fontSize: 25+'px'}}>
        최근 한시간 동안 
        </div>
        <div style = {{width:100+'%'}}>
        <div style={{height:50+'px', width:200+'px',backgroundColor : 'white',textAlign:'center',borderRadius:12+'px',marginTop:10+'px',marginBottom:10+'px'}}>
        <CountUp start={0} end={this.getTotal()} />
        명  (<span>{this.getIncDec()}</span>)
        </div>
        </div>
        <div style = {{fontSize: 25+'px'}} >
        의 유동인구가 있습니다. 
          </div>
          <div>
            </div> 
        </div>

      </div>
    );
  }
}

export default DynamicDoughnut;



