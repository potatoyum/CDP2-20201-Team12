import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')


class TotalLine extends Component {
    
    constructor(props) {
        super(props);

        //렌더링 되기 전으로 setState 바꾸기
       var time = new Date().getHours();
       
        this.state = {
          time: time
        };

      }

    componentWillMount = () => {  
      //  setInterval(() => {
          this.setState({time: new Date().getHours()});
            this.getData();
            console.log(this.state.time+'시');
  //        }, 5000);

    }

    getData1 = ()=>{
        var data1 = [];
        //서버에 요청한 데이터로 업뎃;
        for(var i=0;i<this.state.time;i++)
        {
           data1.push(i+10);
        }
        return data1;
    };
    getData2 = ()=>{
        //서버에 요청한 데이터로 업뎃;
        var data2 =[];
        for(var i=0;i<this.state.time;i++)
        {
           data2.push(i+12);
        }
        return data2;
    };
    getData3 = ()=>{
                //서버에 요청한 데이터로 업뎃;

        var data3 = [];
        for(var i=0;i<this.state.time;i++)
        {
          data3.push(i+7);
        }
        return data3;
    };

 getData = () => {
     return ({
    labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7','7-8','8-9', '9-10','10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'],
    datasets: [
      {
        label: '북문',
        backgroundColor: 'transparent',
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: this.getData1()
      },
      {
        label: '서문',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: this.getData2()
      },
      {
        label: '정문',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: this.getData3()
      },
    ]
});
};

getMainChartOpts = () => {
 return ({
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
        }
      }
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        }],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(40 / 5),
            max: 80,
          },
        }],
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
  });
  
};


    render() {
        return (
            <div>
                <Line data={this.getData()} options={this.getMainChartOpts()} height={300} />
            </div>
        );
    }
}

export default TotalLine;