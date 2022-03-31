import React from 'react';
import Footer from "../footer/Footer";
import Nav from "../nav/Nav";
import "./Layout.css"

function Layout(props) {
  return (
    <div className = "layout">
      <Nav user = {props.user} logout = {props.logout}/>
      <div className="layout-children">{props.children}</div>
      <Footer/>
    </div>
  );
}

export default Layout;