import React, { Component, lazy, Suspense } from 'react';
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
      date: date
    };
  }

  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">

        <Row>
          <DynamicDoughnut /> 
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
