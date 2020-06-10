import React, { Component,lazy, Suspense } from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
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
    labels: ['00:00-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00', '04:00-05:00', '05:00-06:00', '06:00-0700','07:00-08:00','08:00-09:00', '09:00-10:00','10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'],
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
            stepSize: Math.ceil(80 / 5),
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