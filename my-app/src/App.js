import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./App.css";

var lifeStyle = {
  fontSize:"100px",
  color:"red"
};

var HelloMessage = React.createClass({
  render:function(){
    return <h1>hello {this.props.name }</h1> ;
  }
});



var WebSite = React.createClass({ 
  getDefaultProps: function(){
    return {
      name: "cainiao",
      site:"http://www.baidu.com" 
    }
  },
  render:function(){
    return (
    <div>
      <Name name={this.props.name}></Name>
      <Link site={this.props.site}></Link>
      <InPutText />
    </div>);
  }
});

var Name = React.createClass({
  render:function(){
    return (<span>{this.props.name}</span>);
  }
});

var Link = React.createClass({
  render:function(){
    return (<a href={this.props.site}>
        {this.props.site}
    </a>);
  }
});

var InPutText = React.createClass({
  render:function(){
    return <input type="text" value={this.props.aaa}/>;
  }
});

var ButtonLike = React.createClass({
    getInitialState:function(){
      return {liked:false};
    },
    handleClick: function(event){
      this.setState({liked: !this.state.liked});
    },
    render: function(){
      var text = this.state.liked == true? "喜欢":"不喜欢";
      return <span onClick={this.handleClick}>你<b>{text}</b>我吗?</span>;
    }
});

var Counter = React.createClass({
  getInitialState: function(){
    return {count: 0};
  },
  clickCounter: function(state){
    this.setState(function(state){
      return {count : state.count + 1};
    });
  },
  render: function(){
    return (
      <span onClick={this.clickCounter}>点我:{this.state.count}</span>
    );
  }
});

var Hello = React.createClass({
  getInitialState: function(){
      alert("getInitialState");
      return null;
  },
  componentWillMount: function(){
    alert("componentWillMount");
  },
  componentDidMount: function(){
    alert("comonentDidMount");
  },
  render: function(){
    alert("render");
    return null;
  }
});

ReactDOM.render(
        /**注释 */
        <div>
          {/*it is a test*/}
          <h1 style= {lifeStyle} >{1+1}</h1>
          <div className="foo">it is just begin!</div>
          <HelloMessage name="world" />
          <WebSite  />
          <ButtonLike />
          <Counter />
          <Hello />
        </div>
        ,
        document.getElementById('root')
);