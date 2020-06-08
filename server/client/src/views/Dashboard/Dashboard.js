import React, { Component } from 'react';
import DynamicDoughnut from './DynamicDoughnut'
import TotalLine from './TotalLine'
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
 
    var today = new Date(),
    //렌더링 되기 전으로 setState 바꾸기
    date = today.getFullYear()+'년 '+(today.getMonth()+1)+'월 '+today.getDate()+'일 '+today.getHours()+'시 기준';

    this.state = {
      date: date,
      hour: 'hour',
      counting:'counting'
    };
    //this.callApi = this.callApi.bind(this);
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

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
  .then(res => this.setState({counting: res}))
  .catch(err => console.log(err));
  console.log('callApi');
  console.log('state 변경 오나료'+this.state.counting.id);

  }
  
 componentWillMount() {
  
  this.callApi();
  }
  

  


 //랜더링 하기 전에 api 호출
 /*
  componentWillMount() {
    const body;
    const response;
      async () => {
       response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      body= await response.json();
     body.
      then(json => 
      { 
        var val = json.id;
        console.log('val의 값:'+ val);

        this.setState({
          counting:val,
          camera_id:val
        });
      })
  };
  console.log('state 변경 오나료'+this.state.counting);

}
*/
  render() {
  
    return (
      <div className="animated fadeIn">

        <Row>
          <DynamicDoughnut counting = {this.state.counting} /> 
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0"><strong>경북대학교 유동인구 추이</strong></CardTitle>
                    <div className="small text-muted">{this.state.date}</div>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 0+ 'px' }}>
                  <TotalLine/>
                </div>
              </CardBody>
        
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
