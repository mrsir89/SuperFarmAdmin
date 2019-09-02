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
import React from 'react';
import { Actions } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,

  // 8/27
  ButtonGroup,
  ButtonToolbar,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

import { thead, tbody } from "variables/general";

class RegularTables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productBoardNum:this.props
    }
    // this.handleClick=this.handleClick.bind(this);
    console.log('여기 실행 되나?', this.state)
  }


  
  componentWillMount() {
    const { loadqnaboardList } = this.props;
    console.log(this.state, ' <<<<< willMount')
    let productNum = 5
    let size = 10
    let page = 1
    console.log(loadqnaboardList, ' qnaboardList 실행')
    loadqnaboardList(productNum, size, page);
  }


  render() {
    console.log(this.props, '<----- props')
    const { qnaBoard } = this.props;
    const { items } = qnaBoard;
    console.log(items, ' <------- ')

    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">QnA 목록</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>productBoardNum</th>
                        <th>제목</th>
                        <th>작성일자</th>
                        <th>답변 결과</th>
                      </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => {
                        return (
                          <tr>

                                  <td className="text-right">
                                    {item.productBoardNum}
                                  </td>
                                  <td className="text-right">
                                    {item.questionBoardTitle}
                                  </td>
                                  <td className="text-right">
                                    {item.questionBoardRegDate}
                                  </td>
                                  <td className="text-right">
                                    {item.userId}
                                  </td>
                                  <td className="text-right">
                                    {item.questionBoardStatus}
                                  </td>
                          </tr>
                        );
                      })}
                      {/* {items.map((item, key) => {
                        return (
                          <tr key={key}>
                            {item.map((item, key) => {
                              if (key === thead.length - 1)
                                return (
                                  <td key={key} className="text-right">
                                    {item}
                                  </td>
                                );
                              return <td key={key}>{item}</td>;
                            })}
                          </tr>
                        );
                      })} */}
                    </tbody>


                    {/* 8/27  */}

                    <div className="content">

                      <CardBody>
                        <Pagination>
                          <PaginationItem>
                            <PaginationLink href="#">
                              <span aria-hidden="true">
                                <i
                                  className="fa fa-angle-double-left"
                                  aria-hidden="true"
                                />
                              </span>
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem active>
                            <PaginationLink href="#">2</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">
                              <span aria-hidden="true">
                                <i
                                  className="fa fa-angle-double-right"
                                  aria-hidden="true"
                                />
                              </span>
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </CardBody>

                    </div>

                  </Table>
                </CardBody>
              </Card>
            </Col>


          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps=(state)=> {
  console.log(state)
  const { board } = state;
  const { qnaBoard } = board;
  // const { data } = qnaBoard;
  console.log(qnaBoard, '<--------- qnaBoad')
  console.log(board, ' <--------- product')
  // console.log(data, '<------------ data')
  return {
    qnaBoard
  };

}

const mapDispatchToProps = (dispatch) => ({
  loadqnaboardList: (productNum, size, page) => dispatch(Actions.loadqnaboardList(productNum, size, page))
  //writeQnABoard: (qnaContent) => dispatch(writeQnABoard(qnaContent))
});

export default connect( mapStateToProps, mapDispatchToProps)(RegularTables);
