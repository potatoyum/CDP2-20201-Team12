import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, Row, Col, CardTitle } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0,
      }
    }],
    xAxes: [{
      barPercentage: 0.8
    }]
  },
  maintainAspectRatio: false,
  legend: {
    onClick: null
  }
}

class DropDownItem extends Component {
  state = {
    list: []
  }
  componentDidMount() {
    fetch('list.json')
      .then(function (result) {
        return result.json();
      })
      .then(function (json) {
        console.log(json);
        this.setState({ list: json });
      }.bind(this));
  }
  render() {
    var arr = [];
    for (var i = 0; i < this.state.list.length; i++) {
      var li = this.state.list[i];
      arr.push(<DropdownItem key={li.id} data-id={li.id} data-title={li.title} onClick={function (e) {
        e.preventDefault();
        this.props.onClick(e.target.dataset.id, e.target.dataset.title);
      }.bind(this)}>
        {li.title}
      </DropdownItem>)
    }
    return (
      <div>
        {arr}
      </div>

    );
  }
}

class Charts extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setChart = this.setChart.bind(this);

    this.state = {
      dropdownOpen: false,
      dropDownValue: '지역 선택',
      list: [],
      cam_id: 0,
      startDate: new Date(),
      barBackground: [],
      date: '',
      cardTitleValue:{
        date: '(날짜 선택)',
        area: '(지역 선택)',
      },
      bar: {
        labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'],
        datasets: [
          {
            label: '유동인구 수',
            backgroundColor: 'rgba(18,171,184,0.5)',
            borderColor: 'rgba(12,119,128,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(18,171,184,0.5)',
            hoverBorderColor: 'rgba(12,119,128,1)',
            data: [],
          },
        ],
      }
    };
  }
  setChart(id, title, count) {
    var min = count[0], max = count[0], range;
    var barBackground = [];
    for(var i = 0; i < count.length; i++){
      if(min < count[i])
        min = min;
      else
        min = count[i];

      if(max > count[i])
        max = max;
      else
        max = count[i];
    }
    range = (max - min) / 5;

    for (var i = 0; i < 24; i++){
        if(count[i] < min + (range * 1))
          barBackground[i] = 'rgba(18,171,184,0.2)';
        else if(count[i] >= min + (range * 1) && count[i] < min + (range * 2))
          barBackground[i] = 'rgba(18,171,184,0.4)';
        else if(count[i] >= min + (range * 2) && count[i] < min + (range * 3))
          barBackground[i] = 'rgba(18,171,184,0.6)';
        else if(count[i] >= min + (range * 3) && count[i] < min + (range * 4))
          barBackground[i] = 'rgba(18,171,184,0.7)';
        else if(count[i] >= min + (range * 4) && count[i] <= min + (range * 5))
          barBackground[i] = 'rgba(18,171,184,0.8)';
      
    }

    console.log(barBackground);

    this.setState({
      dropdownOpen: this.state.dropdownOpen,
      dropDownValue: title,
      list: this.state.list,
      cam_id: id,
      date: this.state.date, 
      cardTitleValue: {
        date: this.state.startDate.getFullYear() +'.'+ (this.state.startDate.getMonth() + 1) + '.' + this.state.startDate.getDate(),
        area: title
      },
      bar: {
        labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'],
        datasets: [
          {
            label: '유동인구 수',
            backgroundColor: barBackground,
            borderColor: 'rgba(12,119,128,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(18,171,184,0.5)',
            hoverBorderColor: 'rgba(12,119,128,1)',
            data: count,
          },
        ],
      }
    })
    

  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  getDate = inputDate => {
    var strdate, year, month, date = '';

    year = inputDate.getFullYear();
    if ((inputDate.getMonth() + 1) < 10)
      month = '0' + (inputDate.getMonth() + 1);
    else
      month = '' + (inputDate.getMonth() + 1);
    if (inputDate.getDate() < 10)
      date = '0' + (inputDate.getDate());
    else
      date = '' + inputDate.getDate();

    strdate = year + month + date;

    this.setState({
      startDate: inputDate,
      date: strdate
    })

   // console.log(this.state.date + "strdate");
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row  style={{ paddingTop: 50 + 'px', height: 80 + '%' }} className="align-items-center">
          <Col style={{height: "100%"}}>
            <Card style={{backgroundColor: '#f7f9fb'}}>
              <CardTitle className="text-center" tag="h3" style={{ marginTop: 20 + 'px' }}>
                {this.state.cardTitleValue.date} {this.state.cardTitleValue.area}
              </CardTitle>
              <CardBody>
                <div className="chart-wrapper">
                  <Bar data={this.state.bar} options={options} height="400px"/>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="auto">
            <DatePicker 
              placeholderText="날짜 선택"
              selected={this.state.startDate}
              onChange={this.getDate}
              className="form-control"
              maxDate={new Date()}
              dateFormat="yyyy년 MM월 dd일"
              inline
              fixedHeight
            />

            <Dropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }} style={{ marginBottom: "80px"}}>
              <DropdownToggle caret style={{ width: 100 + '%'}} color="info">
                {this.state.dropDownValue}
              </DropdownToggle>
              <DropdownMenu style={{ width: 100 + '%'}}>
                <DropdownItem disabled>지역 선택</DropdownItem>
                <DropdownItem divider />
                <DropDownItem onClick={function (id, title) {
                  console.log(id);
                  if (this.state.date === '')
                    alert('날짜를 먼저 선택해 주세요.');
                  else {
                    //
                    fetch(id + '_' + this.state.date + '.json')
                      .then(function (result) {
                        return result.json();
                      })
                      .then(function (json) {


                        this.setState({ list: json });
                        var li = this.state.list;
                        var count = li.count;
                        
                        this.setChart(id, title, count);

                      }.bind(this))
                      .catch(error => alert('해당 날짜와 지역에 데이터가 없습니다!'))

                      
                      
                  }

                }.bind(this)}></DropDownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>



      </div>
    );
  }
}

export default Charts;