/*!

=========================================================
* Now UI Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

import {
  // chartsLine1,
  chartsLine2,
  chartsBar1,
  chartsBar2
} from "variables/charts";


import ChartData from "chartData/ChartData.jsx"

//const initialData = ChartData();

// const updateGraphData = (newData) => {
//   return {
//     ...initialData,
//     data: {
//       ... initialData.data,
//       dataSets: {
//         ...initialData.data.dataSets,
//         data: newData
//       }
//     }
//   }
// };

/*
{
  data: {
    dataset: {
      data: []
    }
  },
  options: {}
}
*/


class Charts extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: ChartData(),
      dataSet: {
        data1 : [30, 40, 50, 60, 50, 40, 30, 40, 50, 60, 50, 40],
        data2 : [10, 5, 100, 40, 70, 30, 10, 24, 44, 22, 10, 20]
      },
      year : 0,
      month: 0,
      Checked : [{"month": false, "daily": false}]
      // isMonthChecked: false,
      // isDailyChecked: false,

    }
    console.log('charts >> ', ChartData());
  }

  updateChart(e, index) {
    e.preventDefault();
    const { dataSet } = this.state;
    //const newValue = dataSet[index].value;
    console.log('updateChart >> ', ChartData(dataSet));

    this.setState({
      chartData: ChartData(dataSet)
    });
  }


  // 검색버튼 누름  -> 해당 날짜의 판매 데이터 return 
  handleSubmit(){
    if(this.state.Checked[0].month === true){
      // dispatch(action(this.state.year))
      // .then(response => {this.setState(
      //      dataSet : response.data
      // )})
      //
    }
  }

  changeYearHandler=(e)=> {
    let tmpCode = e.target.value
    this.setState({
      year : tmpCode
    })
  }

  changeMonthHandler=(e) => {
    let tmpCode = e.target.value
    this.setState({
      month : tmpCode
    })
  }

  isChecked=(e)=>{
    console.log("e.target.value",e.target.value )
    if(e.target.value==="month"){
      console.log("month 체크")
      this.setState({
        Checked : [{"month": true, "daily": false}]
      })
    } else if(e.target.value==="daily"){
      console.log("daily 체크")
      this.setState({
        Checked : [{"month": false, "daily": true}]
      })
    }
  }
  

  render() {
    const { chartData } = this.state;
    console.log("state 변경 >>", this.state)
    return (
      <>
        <PanelHeader
          content={
            <div className="header text-center">
              <h2 className="title"> 판매 통계 </h2>
            </div>
          }
        />
        <div className="content">
          <Row>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category"></h5>
                <CardTitle tag="h4">

                </CardTitle>
              </CardHeader>

              {/* 8/29 버튼 추가 */}

              <CardBody>
                <div className="chart-area">
                  <Bar data={chartData.data} options={chartData.options} />
                </div>
              </CardBody>
              <CardFooter>
                <div align="center">
                  <label><input type="radio" name="date_type" value="month" onClick={this.isChecked} /> 월별</label>
                  <label><input type="radio" name="date_type" value="daily" onClick={this.isChecked}/> 일별</label>
          

                  <select name="year" onChange={this.changeYearHandler}>
                    <option value="">= 연도 선택 =</option>
                    <option value="2019">2019 년</option>
                    <option value="2018">2018 년</option>
                    <option value="2017">2017 년</option>
                  </select>

                  
                  <span class="scMonth" >
                    <select name="month" onChange={this.changeMonthHandler}>
                      <option value="">= 월 선택 =</option>
                      <option value="1">1 월</option>
                      <option value="2">2 월</option>
                      <option value="3">3 월</option>
                      <option value="4">4 월</option>
                      <option value="5">5 월</option>
                      <option value="6">6 월</option>
                      <option value="7">7 월</option>
                      <option value="8">8 월</option>
                      <option value="9">9 월</option>
                      <option value="10">10 월</option>
                      <option value="11">11 월</option>
                      <option value="12">12 월</option>
                    </select>
                  </span>

                  <span><input type="submit" value="검색" onSubmit={e=> this.updateChart(e)} /></span>
                </div>
              </CardFooter>
            </Card>
          </Row>

          {/* 표 */}
          <Row>
            {/* <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Simple With Gradient</h5>
                  <CardTitle tag="h4">Line Chart</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-icon"
                      color="default"
                      outline
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu >
                      {this.state.dataSet.map((item,index) => {
                        return <DropdownItem onClick={e => this.updateChart(e, index)} key={index}>{item.name}</DropdownItem>
                      })}
                       
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      // data={chartsLine1.data}
                      // options={chartsLine1.options}
                      data={chartData.data}     // state에서 꺼내오기 
                      options={chartData.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
                  </div>
                </CardFooter>
              </Card> */}
          </Row>
        </div>
      </>
    );
  }
}

export default Charts;


// onClick={this._updateGraphData(item.value)}