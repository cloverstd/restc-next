import React, { Component } from 'react';
import styled from 'styled-components'
import { Input, KeyValue } from './Input';
import Body from './Body'


const Aside = styled.aside`
left: 57%;
right: 0;
transition: transform .7s;
position: absolute;
top: 0;
bottom: 0;
`

const Form = styled.form`
padding: 40px;
box-sizing: border-box;
color: #fff;
background: #2d2f3b;
transition: transform 1s;
height: 100%;
box-sizing: border-box;
overflow: auto;
`

const H = styled.h3`
margin-left: -40px;
margin-right: -40px;
padding: 20px 40px;
border-bottom: 1px solid #373b48;
font-size: 17px;
font-weight: 600;
`


const MethodSection = styled.div`
margin: -.25em;
display: flex;
> * {
  margin: .25em;
}
`

const Select = styled.select`
padding: 0 1.5em 0 1em;
color: #dbdfeb;
background: #3f4555;
font: inherit;
width: 100px;
height: 40px;
border: 0 none;
border-radius: 8px;
outline: none;
-webkit-appearance: none;
-moz-appearance: none;
background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqdJREFUeNpi/P//P8NAAiaGAQajDhh1wKgDGEDlADqGAnYgNoLS5AI2IDaEmYHVLhwOYFVT1/HOLqzdoaKm5Q3ik2E5q5KyumdWQc02dU1dPxAfm11Yo0BJRcPOLzCqUUBASC8gKKZRQUnViURHsIL0BIXGNwoKChv4BUTVAx1jT3QaiIhOy+fh45diZ+dgANEhEclNcgrKDkQ6glVGVsEOqKcBqFcGZAY3L59kREx6PtEOYOdgb2RlY/vKzsHBwAHEfHz8smGRKY1S0nLWQGkWPJazgNSER6c1AfXIg/SCzACa9R1oZhM2DYzYKiNGRkaGrokLLViYWZYxMDJw/P71i+Hnzx8MHz68v7ts4bSaF8+fHAEq+4umjVlMXNIyJiGnTUBQSAXkc6DFwETG8OPP3z8xZfnxx7DZhTMbAjWcYGRijGdiYvrJxsbOADJQQEBQOTIuo1FYWNQCZCGy5cIiYubR8dlNyJYD9f4GmpEIspyscqAwK+ow0AfJQEN+gwxkY2dnACYqtdjk3CaQhVD9TEJCIqYxidlNgkLCGiA1MMtBeoFmHMRnB84oQAYTpi13B0bFrH///rH++vWT4dfPnwxv3766PHdGbw0oeyenF7cICYvqgeIbFFpAy/8ALU8vyIrcjl7mkOUAqCN8gCEx/e/fv8wwR7x7++oC0FF/RUQljEE+B1nOzMz89/+//9lAyzdhK/TIdgDUEYFAR0wCOQKUMH///gVJ+qysyJYXAS1fjavUpcgBUEeEAx3R9+/vP8a//yAZgZmJmYGJmek/0PISoOXL8RX7FDsA7IjpK2KBajpAShFm/68uyIxYQKjeoUptCLRoMdCwemBiAyU4kNENhCynKBfgiY4MUAwAg30qsTUvUQ4YbRGNOmDUAaMOoCcACDAAFHYu4lUVtcQAAAAASUVORK5CYII=');
background-position: 90% 50%;
background-repeat: no-repeat;
background-size: 16px;
cursor: pointer;
&:hover {
  color: #fff;
}
`

const QueryString = styled(Input)`
flex: 1;
&:before {
  margin-right: .2em;
  content: '?';
  color: #5d6577;
}
`

const SendButton = styled.button`
padding: 0 1em;
height: 40px;
color: #dbdfeb;
background: transparent;
font: inherit;
border: 2px solid #959cad;
border-radius: 4px;
outline: none;
cursor: pointer;
transition: .15s background;
`

export default class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.parseParams()
    }

    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleSubmit(e) {
    e.preventDefault()
    let { method, queryString, body, headers } = this.state
    let path = window.requestInfo.path
    if (!method) {
      method = 'GET'
    }
    let host = window.requestInfo.host
    let uri = `//${host}${path}`
    if (queryString) uri += '?' + queryString
    if (method === 'GET' || method === 'HEAD' || !method) {
      body = void 0
    }

    let $response = new Promise((resolve, reject) => {
      let defaultHeaders = new Headers({
        Accept: 'application/json, */*',
        // 'Content-Type': 'application/json',
      })

      headers && headers.map(header => defaultHeaders.append(encodeURIComponent(header.key), header.value))
      switch (this.body.index) {
        case 0:
          defaultHeaders.set('Content-Type', 'text/plain')
          break
        case 1:
          defaultHeaders.set('Content-Type', 'application/json')
          if (body) {
            if (typeof body !== 'string') {
              return reject(new Error('body not a valid JSON object'))
            }
            try {
              JSON.parse(body)
            } catch (e) {
              return reject(e)
            }
          }

          break
        case 2:
          defaultHeaders.set('Content-Type', 'application/x-www-form-urlencoded')
          break
        case 3:
          // defaultHeaders.set('Content-Type', 'multipart/form-data')
          break
        case 4:
          defaultHeaders.set('Content-Type', 'application/octet-stream')
          break
        default: throw new Error('not support body type');
      }
      headers = defaultHeaders


      let options = { method, headers, credentials: 'include', body }

      resolve(fetch(uri, options))

      this.encodeHash()
    })

    // let $response = fetch(uri, options)

    this.props.onRequest && this.props.onRequest({ method, path, queryString, body, headers }, $response)

    // sync title
    document.title = [method, uri].join(' ');
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    }, () => {
      if (key === 'query') {
        this.encodeQueryString(value)
      }
    })
  }
  parseParams() {
    let params = new URLSearchParams(location.hash.slice(2))
    let query = []
    let body = params.get('body') || ''
    let method = params.get('method') || 'GET'
    let bodyType = params.get('bodyType') || 1
    let headers
    try {
      query = JSON.parse(params.get('query'))
    } catch (e) { }
    try {
      headers = JSON.parse(params.get('headers'))
    } catch (e) { }
    return { method, query, body, headers, bodyType }
  }
  componentDidMount() {
    addEventListener('hashchange', () => {
      let { method, query, body, headers, bodyType } = this.parseParams()
      this.setState({ method, query, body, headers }, () => {
        this.headerKeyValue.setData(headers)
        this.queryKeyValue.setData(query)
        this.body.setValue({ body, index: parseInt(bodyType, 10)})
        this.encodeQueryString(this.state.query)
      })
    })
  }
  encodeQueryString(value) {
    if (!value) {
      return
    }
    let query = new URLSearchParams();
    value.filter(item => item.checked).map(item => query.append(item.key, item.value))
    let queryString = query.toString()
    this.setState({
      queryString
    }, () => {
      this.queryStringInput.setValue(queryString)
    })
  }
  onMethodChange(e) {
    this.setState({
      method: e.target.value
    }, () => {
      if (this.state.method === 'GET' || !this.state.method) {
        this.setState({
          body: void 0
        })
      }
    })
  }
  onQueryStringChange(v) {
    let query = [];
    for (let [key, value] of new URLSearchParams(v)) {
      query.push({
        checked: true,
        key, value
      })
    }
    this.setState({
      query
    }, () => {
      this.queryKeyValue.setData(this.state.query)
    })
  }
  onQueryChange(query) {
    this.setState({
      query
    }, () => {
      this.encodeQueryString(this.state.query)
    })
  }
  onBodyChange(body) {
    this.setState({ body }, () => {
      this.body.setValue({ body })
    })
  }
  onHeaderChange(headers) {
    this.setState({ headers })
  }
  encodeHash() {
    let query = this.state.query ? JSON.stringify(this.state.query) : '[]'
    let body = this.state.body || ''
    let method = this.state.method || 'GET'
    let headers = this.state.headers ? JSON.stringify(this.state.headers) : '[]'
    let bodyType = this.body.index || 0
    let params = new URLSearchParams({ method, query, body, headers, bodyType })
    location.hash = '#!' + params.toString()
  }
  render() {
    let body
    if (this.state.method !== 'GET' && this.state.method) {
      body = (
        <div>
          <H>Body</H>
          <Body value={this.state.body} index={this.state.bodyType} ref={ref => this.body = ref} onChange={v => this.onBodyChange(v)}/>
        </div>
      )
    }
    return (
      <Aside>
        <Form onSubmit={this.handleSubmit}>
          <MethodSection>
            <Select onChange={e => this.onMethodChange(e)} value={this.state.method}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </Select>
            <QueryString ref={input => this.queryStringInput = input} value={this.state.queryString} onChange={v => this.onQueryStringChange(v)} />
            <SendButton>Send</SendButton>
          </MethodSection>
          <H>Query Parameters</H>
          <KeyValue addText={'add query parameter'} ref={keyValue => this.queryKeyValue = keyValue} onChange={v => this.onQueryChange(v)} defaultValue={this.state.query && this.state.query.length > 0 && this.state.query[0]} />
          {body}
          <H>Headers</H>
          <KeyValue addText={'add header'} ref={ref => this.headerKeyValue = ref} onChange={v => this.onHeaderChange(v)} />
        </Form>
      </Aside>
    )
  }
}
