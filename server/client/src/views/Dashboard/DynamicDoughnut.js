import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import CountUp from 'react-countup';

class DynamicDoughnut extends Component {

 static option = {
    maintainAspectRatio: false,
 }
state={
  total: 0,
}
 
//이거 서버랑 연동
/*
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
  return 75;
}
*/
getIncDec = () =>{
  //한시간 전 것과 비교
  var diff = 25;
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
  datasets: null
});
*/
/*
getInitialState() {
  return this.getState();
}
*/
  /* JSON파일 구조
  {
    "userId" : 1,
    "id" : 1, -> camera_id, counting, hour
    "title" : "delectus aut autem",
    "completed" : false
  }
  */

 callApi = async () => {
  const response = await fetch('http://localhost:3001/api/dashboard/');
  await response.json()
  .then(res => 
    {
      //from String to Numbe
      res.id*=1;
      var BukCount = res.one;
      var SeoCount = res.two;
      var JeongCount = res.three;
      var Total = BukCount+SeoCount+JeongCount;
      this.setState({
        total: Total,
        labels: [
         'IT 융복합관',
         'IT 4호관',
         '공대 9호관'
        ],
       datasets: [{
         data: [BukCount,SeoCount,JeongCount],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
      hoverBackgroundColor: [
      '#903EB0',
      '#903EB0',
      '#903EB0',
      ]
    }]
  })})
  .catch(err => console.log(err));
  console.log('state 변경 오나료');
  };
  
 componentWillMount() {  
   console.log("초기설정");
  this.callApi();
}

componentDidMount(){
//주기적으로 업데이트..
  setInterval(()=>{
//    console.log("업데이트설정");
    if(this.shouldComponentUpdate)
       this.callApi();
 },5000); 
}


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
        <CountUp start={0} end={this.state.total} />
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



