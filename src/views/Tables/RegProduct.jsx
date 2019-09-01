import React from "react";

// // reactstrap components
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   Table,
//   Row,
//   Col,

//   // 8/27
//   ButtonGroup,
//   ButtonToolbar,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Button
// } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

import { thead, tbody } from "variables/general";

class RegProduct extends React.Component {

  constructor(props) {
    super(props)
    const { product } = props
    console.log(product, '상 품 등 록 상 품 등 록 상 품 등 록');
    this.state = {
      product: product
    }
  }


  render() {
    var list = this.state.orderlist

    return (

      <div>
       {/* 9/1 embedded CSS */}
        <style dangerouslySetInnerHTML={{ __html: "\n\tbody {font-family:'맑은 고딕', verdana; padding:0; margin:0; }\n\tul { padding:0; margin:0; list-style:none;  }\n \n\tdiv#root { width:90%; margin:0 auto; }\n\t\n\theader#header { font-size:60px; padding:20px 0; }\n\theader#header h1 a { color:#000; font-weight:bold; }\n\t\n\tnav#nav { padding:10px; text-align:right; }\n\tnav#nav ul li { display:inline-block; margin-left:10px; }\n \n \t\tsection#container { padding:20px 0; border-top:2px solid #eee; border-bottom:2px solid #eee; }\n\tsection#container::after { content:\"\"; display:block; clear:both; }\n\taside { float:left; width:200px; }\n\tdiv#container_box { float:right; width:calc(100% - 200px - 20px); }\n\t\n\taside ul li { text-align:center; margin-bottom:10px; }\n\taside ul li a { display:block; width:100%; padding:10px 0;}\n\taside ul li a:hover { background:#eee; }\n\t\n\tfooter#footer { background:#f9f9f9; padding:20px; }\n\tfooter#footer ul li { display:inline-block; margin-right:10px; } \n" }} />
        <style dangerouslySetInnerHTML={{ __html: "\n.inputArea { margin:10px 0; }\nselect { width:100px; }\nlabel { display:inline-block; width:70px; padding:5px; }\nlabel[for='gdsDes'] { display:block; }\ninput { width:150px; }\ntextarea#gdsDes { width:400px; height:180px; }\n" }} />
       
       
        <div id="root">
          <header id="header">
            <div id="header_box">

            </div>
          </header>
          <nav id="nav">
            <div id="nav_box">

            </div>
          </nav>
          <section id="container">

            <div id="container_box">
              <h2>상품 등록</h2>
              <form role="form" method="post" autoComplete="off">
                <div className="inputArea">
                  <label>Upper</label>
                  <select className="category1">
                    <option value>Category1</option>
                    <option value>Category2</option>
                    <option value>Category3</option>
                  </select>
                  <label>Lower</label>
                  <select className="category2" name="cateCode">
                    <option value>Category1</option>
                    <option value>Category2</option>
                    <option value>Category3</option>
                  </select>

                </div>
                <div className="inputArea">
                  <label htmlFor="gdsName">상품명</label>
                  <input type="text" id="gdsName" name="gdsName" />
                </div>
                <div className="inputArea">
                  <label htmlFor="gdsPrice">상품그룹</label>
                  <input type="text" id="gdsPrice" name="gdsPrice" />
                  <label htmlFor="gdsStock">그룹이름</label>
                  <input type="text" id="gdsStock" name="gdsStock" />
                </div>
                <div className="inputArea">
                  <label htmlFor="gdsPrice">원산지</label>
                  <input type="text" id="gdsPrice" name="gdsPrice" />
                  <label htmlFor="gdsStock">단위</label>
                  <input type="text" id="gdsStock" name="gdsStock" />
                </div>
                <div className="inputArea">
                  <label htmlFor="gdsPrice">옵션1</label>
                  <input type="text" id="gdsPrice" name="gdsPrice" />
                  <label htmlFor="gdsStock">옵션2</label>
                  <input type="text" id="gdsStock" name="gdsStock" />
                </div>

                <label>배송비</label>
                <select className="category1">
                  <option value>3000원</option>
                  <option value>배송비무료</option>
                </select>



                <div className="inputArea">
                  <label htmlFor="gdsDes">상품설명</label>
                  <textarea rows={5} cols={50} id="gdsDes" name="gdsDes" defaultValue={""} />
                </div>
                <div className="image">
                  <label htmlFor="gdsDes">이미지 첨부</label>
                  <input type="file" />
                </div>


                <div className="inputArea">
                  <button type="submit" id="register_Btn" className="btn btn-primary">등록</button>
                </div>


              </form>
            </div>
          </section>
          <footer id="footer">
            <div id="footer_box">

            </div>
          </footer>
        </div>
      </div>
    );
  }

}


export default RegProduct;