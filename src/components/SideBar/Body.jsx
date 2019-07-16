import React, { Component } from 'react';
import styled from 'styled-components'
import { KeyValue } from './Input';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'


const BodyWrapper = styled.div`
& > ul {
  display: flex;
  padding: 0;
  margint: 0;
  white-space: nowrap;
  justify-content: space-between;
  > li {
    display: block;
    text-align: center;
    &:hover {
      border-bottom: 2px solid #5d6577;
      cursor: pointer;
    }
  }
  > .active {
    border-bottom: 2px solid #5d6577;
  }
}
.CodeMirror {
  margin-top: 1em;
  padding: 1em;
  height: 10em;
  border-radius: 8px;
  background: #3f4555;
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  line-height: 1.5;
}
`

export default class Body extends Component {
  constructor(props) {
    super(props)
    let index = this.props.index
    if (index === void 0) {
      index = 1
    }
    index = parseInt(index, 10)
    let formData = []
    if (index === 2) {
      let params = new URLSearchParams(this.props.value)
      for (let [key, value] of params.entries()) {
        formData.push({ key, value, checked: true})
      }
    }
    this.state = {
      index,
      body: this.props.value,
      formData,
    }
  }
  active(index) {
    return index === this.state.index ? 'active' : void 0
  }
  get index() {
    return this.state.index
  }
  set index(index) {
    this.setState({ index })
  }
  setValue({ body, index }) {
    if (index === void 0) {
      index = this.state.index
    }
    this.setState({ index }, () => {
      switch (index) {
        case 0: case 1:
          break
        case 2:
          let params = new URLSearchParams(body)
          let data = []
          for (let [key, value] of params.entries()) {
            data.push({ key, value, checked: true})
          }
          this.form.setData(data)
          break
        case 3:
          break
        default: throw new Error('not support body type');
      }
      this.setState({
        body
      })
    })
  }
  click(index) {
    let body = this.state.body
    if (index <= 1 && body && typeof body !== 'string') {
      let counter = 0
      for (let _ of body.keys()) {
        counter++
      }
      if (counter === 0) {
        body = ''
      } else {
        if (confirm('the body will be lost')) {
          body = ''
        } else {
          return
        }
      }

    }
    this.setState({
      index, body
    })
  }
  onChange(data) {
    let body
    switch (this.state.index) {
      case 0: case 1:
        body = data; break
      case 2:
        body = new URLSearchParams()
        data && data.filter(item => item.checked).map(item => body.append(item.key, item.value))
        body = body.toString()
        break
      case 3:
        body = new FormData()
        data && data.filter(item => item.checked).map(item => body.append(item.key, item.value))
        break
      default: throw new Error('not support body type');
    }
    this.setState({ body }, () => {
      this.props.onChange(body)
    })
  }
  render() {
    let body
    switch (this.state.index) {
      case 0: case 1:
        let options = {
          theme: 'material'
        }
        options.mode = this.state.index === 1 ? 'javascript' : void 0
        body = (
          <CodeMirror className="CodeMirror" value={this.state.body} onChange={(e) => this.onChange(e)} options={options} />
        )
        break;
      case 2: case 3:
        body = (
          <KeyValue data={this.state.formData} addText="add form field" onChange={data => this.onChange(data)} ref={ref => this.form = ref}/>
        )
        break;
      default: throw new Error('not support body type');
    }
    return (
      <BodyWrapper>
        <ul>
          <li className={this.active(0)} onClick={() => this.click(0)}>Text</li>
          <li className={this.active(1)} onClick={() => this.click(1)}>JSON</li>
          <li className={this.active(2)} onClick={() => this.click(2)}>Form URL-Encoded</li>
          {/* <li className={this.active(3)} onClick={() => this.click(3)}>Multipart</li> */}
        </ul>
        {body}
      </BodyWrapper>
    )
  }
}
