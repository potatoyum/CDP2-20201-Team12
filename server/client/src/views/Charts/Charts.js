import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar, defaults } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader, Row, Col } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
//import DatePickerInput from '../DatePicker/DatePickerInput';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button
} from 'reactstrap';

const ExampleCustomInput = ({ value, onClick }) => (
  <Button color="secondary" className="example-custom-input" onClick={onClick}>
    {value}
  </Button>
);

class DatePick extends React.Component {
  state = {
    startDate: new Date(),
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
    
    //console.log(this.state.startDate.getMonth() + "월" + this.state.startDate.getDate() + "일");
  };
 
  render() {
    //console.log((this.state.startDate.getMonth() + 1) + "월" + this.state.startDate.getDate() + "일 선택됨");
   
    this.props.onClick(this.state.startDate);
    //console.log(this.state.startDate);
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        maxDate={new Date()}
        dateFormat="yyyy년 MM월 dd일"
        className="form-control"
        customInput={<ExampleCustomInput/>}
        //onClick={function(e) {
        //  this.props.onClick(e.target.selected);
        //}.bind(this)}
      />
    );
  }
}

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero:true,
            min: 0,  
        }
      }]
   },
  maintainAspectRatio: false,
  legend: {
    onClick: null
  }
}

class DropDownItem extends Component{
  state = {
    list:[]
  }
  componentDidMount(){
    fetch('list.json')
      .then(function(result){
        return result.json();
      })
      .then(function(json){
        console.log(json);
        this.setState({list:json});
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
  
    this.state = {
      dropdownOpen: false,
      dropDownValue: '지역 선택',
      list:[],
      cam_id: 0,
      date: '',
      bar: {
        labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'],
        datasets: [
          {
            label: '유동인구 수',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [],
          },
        ],
      }
    };
    
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <Col>
            <DatePick onClick={() => function(startDate){
              //
              var strdate, year, month, date = '';
              year = startDate.getFullYear();
              if ((startDate.getMonth() + 1) < 10)
                month = '0' + (startDate.getMonth() + 1);
              else
                month = '' + (startDate.getMonth() + 1);
              if (startDate.getDate() < 10)
                date = '0' + (startDate.getDate());
              else
                date = '' + startDate.getDate();

              strdate = year + month + date;
              console.log(strdate);
              //console.log(startDate.getFullYear() + "년 " + (startDate.getMonth()+1) + "월 " + startDate.getDate() + "일");

              //this.setState({
              //  dropdownOpen: this.state.dropdownOpen,
              //  dropDownValue: this.state.dropDownValue,
              //  list: this.state.list,
              //  cam_id: this.state.cam_id,
              //  date: strdate,
              //  bar: this.state.bar
              //});
              console.log(this.state.date + '// data state value');
            }.bind(this)} />
          </Col>
          <Col>
            <Dropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }} style={{marginLeft: 500 + 'px' }}>
              <DropdownToggle caret style={{width: 100 + 'px'}}>
                {this.state.dropDownValue}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem disabled>지역 선택</DropdownItem>
                <DropdownItem divider />
                <DropDownItem onClick={function(id, title){
                  console.log(id);
                  //this.setState({cam_id: id});
                  //console.log(this.state.cam_id + '클릭클릭');
                  fetch(id + '_' + this.state.date + '.json')
                    .then(function(result){
                      return result.json();
                    })
                    .then(function(json){
                      
                      console.log(id + '_' + this.state.date + '.json');
                      this.setState({list:json});
                        var li = this.state.list;
                        var count = li.count;
                      this.setState({
                        dropdownOpen: this.state.dropdownOpen,
                        dropDownValue: title,
                        list: this.state.list,
                        cam_id: id,
                        date: this.state.date,
                        bar: {
                          labels: this.state.bar.lables,
                          datasets: [
                            {
                              label: this.state.bar.datasets[0].label,
                              data: count,
                            },
                          ],
                        }
                      })
                      
                      //console.log(this.state.cam_id + ' camer is clickkkkkkeeeedddd');
                    }.bind(this))
                }.bind(this)}></DropDownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col>
            <Button color="primary" onClick={function(){
              //console.log(this.state.date.getDate().toString);
              this.setState({
                dropdownOpen: this.state.dropdownOpen,
                dropDownValue: this.state.dropDownValue,
                list: this.state.list,
                cam_id: this.state.cam_id,
                date: this.state.date,
                bar : {
                  labels: this.state.bar.labels,
                  datasets: [
                    {
                      label: '유동인구 수',
                      backgroundColor: 'rgba(255,99,132,0.2)',
                      borderColor: 'rgba(255,99,132,1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                      hoverBorderColor: 'rgba(255,99,132,1)',
                      data: this.state.data,
                    },
                  ],
                }
              })
            }.bind(this)}>선택</Button>
          </Col>
        </Row>
          
          <Card style={{marginTop: 40 + 'px' }}>
            <CardHeader>
              {this.state.dropDownValue}
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={this.state.bar} options={options} height = {300}/>
              </div>
            </CardBody>
          </Card>
          
      </div>
    );
  }
}

export default Charts;
