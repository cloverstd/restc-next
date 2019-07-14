import React, { Component } from 'react';
import styled from 'styled-components'
import Highlight from 'react-highlight.js'
import { ImageView, DownloadView } from './FileView'


const Section = styled.section`
    left: 0;
    width: 57%;
    transition: width .01s .7s;
    position: absolute;
    top: 0;
    bottom: 0;
`

const DL = styled.dl`
position: relative;
height: 100%;
box-sizing: border-box;
margin: 0;
display: flex;
flex-direction: column;
> dt {
  position: relative;
  border-bottom: 1px solid #e4e4ec;
  padding: 0 ${props => props.padding}px;
  margin: 0;
  font-size: 0;
  > a {
    position: relative;
    z-index: 1;
    text-decoration: none;
    display: inline-block;
    box-sizing: border-box;
    padding: .5em 1em;
    font-size: 16px;
    width: ${props => props.btnWidth}px;
    text-align: center;
    font-weight: 600;
    color: #5d6576;
    &:hover {
      opacity: .8;
      cursor: pointer;
    }
  }
  > span {
    transition: left 200ms ease, right 200ms ease;
    position: absolute;
    top: 0;
    bottom: -1px;
    font-size: 16px;
    width: ${props => props.btnWidth}px;
    border-bottom: 2px solid #2d2f3b;
    background: #f1f1f6;
  }
}
> dd {
  flex: 1;
  overflow: auto;
  margin: 0;
}
&.loading:after {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  content: '';
  background: rgba(248, 248, 250, 0.8) url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPScyNHB4JyBoZWlnaHQ9JzI0cHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgc3Ryb2tlPSIjN2NjZmFmIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0IiBkdXI9IjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZnJvbT0iMCIgdG89IjUwMiI+PC9hbmltYXRlPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNoYXJyYXkiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiB2YWx1ZXM9IjE1MC42IDEwMC40OzEgMjUwOzE1MC42IDEwMC40Ij48L2FuaW1hdGU+PC9jaXJjbGU+PC9zdmc+') 50% 50% no-repeat;
  cursor: progress;
  z-index: 1000;
}
&.waiting:after {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  content: 'Click “Send” to send the request';
  font-weight: 500;
  font-size: 1.2em;
  background: rgba(248, 248, 250, 0.8);
  z-index: 1000;
}
`

const Underline = styled.span`
left: ${props => props.underline}px;
`

const ResultWrapper = styled.div`
font-size: 12px;
line-height: 1.5;
margin-bottom: 0 8px;
& code {
    padding: 20px 32px 0px;
    background: transparent;
    overflow: visible;
}
& a {
  margin-left: 32px;
}
`


export default class Result extends Component {
  constructor(props) {
    super(props)

    this.state = {
      underline: this.padding + 0 * this.btnWidth,
      $response: void 0,
      target: 0,
      loading: false
    }
  }
  stringifyHeader([key, value]) {
    key = key.replace(/(?:^|-)./g, $0 => $0.toUpperCase());
    return [key, value].join(': ');
  }
  updateRequest({ method, path, queryString, body, headers }) {
    let uri = path;
    if (queryString) uri += '?' + queryString;
    headers = Object.keys(headers)
      .map(key => ({ key, value: headers[key] }))
      .map(({ key, value }) => ({ key, values: Array.isArray(value) ? value : [value] }))
      .reduce((result, { key, values }) => [...result, ...values.map(value => ({ key, value }))], []);
    let request = [
      [method, uri, 'HTTP/1.1'].join(' '),
      ...headers.map(({ key, value }) => [key, value].join(': '))
    ].join('\n');
    if (!['HEAD', 'GET'].includes(method) && body) request = [request, body].join('\n\n');
    this.setState({ request })
  }
  update(request, $response) {
    this.updateRequest(request)
    this.updateResponse($response)
  }
  updateResponse($response) {
    this.setState({
      response: void 0,
      loading: true
    })
    this.click(0)
    Promise.resolve($response).then(response => {
      let status = ['HTTP/1.1', response.status, response.statusText].join(' ');
      let headers = [...response.headers.entries()].map(this.stringifyHeader).join('\n');
      let contentType = response.headers.get('Content-Type');
      let json = /json/.test(contentType);
      let javascript = /javascript/.test(contentType);
      let binary = !(/text/.test(contentType) || json || javascript);
      let image = /image/.test(contentType);
      let contentDisposition = response.headers.get('Content-Disposition') || '';
      try {
        contentDisposition = window.ContentDispositionAttachment.parse(contentDisposition);
      } catch (error) {
        contentDisposition = { attachment: false };
      }
      let { attachment, filename } = contentDisposition;
      let $body
      if (binary || attachment || image) {
        $body = response.blob().then(URL.createObjectURL).then(url => {
          let key = image ? 'image' : 'file'
          return {
            [key]: { filename, url }
          }
        });
      } else {
        $body = response.text().then(result => {
          let body = result;
          if (json) {
            try {
              body = window.jsonFormatSafely(body);
            } catch (e) { /* ignore */ }
          }
          return { body };
        });
      }
      return $body.then(({ body, image, file }) => {
        this.setState({
          response: [status, headers, '', body].join('\n'),
          image: image,
          file: file
        })
      })
    }).catch(({ message }) => {
      this.setState({
        response: message,
        image: void 0,
        file: void 0
      })
    }).then(() => {
      this.setState({
        loading: false
      })
    })
  }
  get padding() {
    return 40
  }
  get btnWidth() {
    return 120
  }
  click(i) {
    if (i === this.state.target) {
      return
    }
    this.setState(state => {
      let target = state.target === 0 ? 1 : 0
      return {
        underline: this.padding + target * this.btnWidth,
        target: target
      }
    })
  }
  render() {
    return (
      <Section>
        <DL padding={this.padding} btnWidth={this.btnWidth} className={this.state.loading && 'loading'}>
          <dt>
            <Underline underline={this.state.underline} />
            <a onClick={() => this.click(0)}>Response</a>
            <a onClick={() => this.click(1)}>Request</a>
          </dt>
          <dd>
            {this.state.target === 0 && (
              <ResultWrapper>
                <Highlight language={'http'}>
                  {this.state.response || ''}
                </Highlight>
                {this.state.image && <ImageView image={this.state.image} />}
                {this.state.file && <DownloadView file={this.state.file} />}
              </ResultWrapper>
            )}
            {this.state.target === 1 && (
              <ResultWrapper>
                <Highlight language={'http'}>
                  {this.state.request || ''}
                </Highlight>
              </ResultWrapper>
            )}
          </dd>
        </DL>
      </Section>
    )
  }
}
