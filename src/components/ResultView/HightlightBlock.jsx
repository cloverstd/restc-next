import React, { Component }  from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight.js'


const Pre = styled.pre`
font-size: 12px;
line-height: 1.5;
& > code {
    margin: 0 8px;
    padding: 20px 32px;
    background: transparent;
    overflow: visible;
}
`

export default class HighlightBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: this.props.content
        }
    }
    setValue(content) {
        this.setState({ content })
    }
    render() {
      return (
        <Pre>
            <Highlight language={'http'}>
                {this.state.content || ''}
            </Highlight>
        </Pre>
      )
    }
  }