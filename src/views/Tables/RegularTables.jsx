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
import React from "react";

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
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">상품등록용 게시판? 상품이미지, 제목, 옵션1,2,3</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        {thead.map((prop, key) => {
                          if (key === thead.length - 1)
                            return (
                              <th key={key} className="text-right">
                                {prop}
                              </th>
                            );
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tbody.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.data.map((prop, key) => {
                              if (key === thead.length - 1)
                                return (
                                  <td key={key} className="text-right">
                                    {prop}
                                  </td>
                                );
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>




                    {/* 8/27 Pagination */}
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

export default RegularTables;
