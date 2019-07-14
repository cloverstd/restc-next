import React, { Component } from 'react';
import Result from './ResultView';
import SideBar from './SideBar';
import styled from 'styled-components'

const Container = styled.div`
position: relative;
flex: 1;
width: 100%;
min-height: 0;
&.sidebar-collapse {
  > section {
    width: 100%;
    transition: none;
  }
  > aside {
    transform: translateX(100%);
  }
}
`

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  onRequest(request, $response) {
    this.result.update(request, $response)
  }
  toggle() {
    this.setState(state => {
      return {
        collapse: state.collapse === 'sidebar-collapse' ? void 0 : 'sidebar-collapse'
      }
    })
  }
  render() {
    return (
      <Container className={this.state.collapse}>
        <Result ref={r => this.result = r} />
        <SideBar onRequest={(req, resp) => this.onRequest(req, resp)} />
      </Container>
    )
  }
}
