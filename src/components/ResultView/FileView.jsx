import React, { Component } from 'react';
import styled from 'styled-components'


const DownloadWrapper = styled.a`
--r: 76;
--g: 82;
--b: 100;
--a: .9;
background: rgba(var(--r), var(--g), var(--b), var(--a));
border-radius: 4px;
color: #fff;
display: inline-block;
fill: #fff;
font-family: sans-serif;
padding: 10px 15px;
text-decoration: none;
transition: background .2s ease;
white-space: nowrap;
> svg {
    display: inline;
    vertical-align: middle;
}
&:hover {
    --a: .8;
}
&:active {
    --a: 1;
}
`

export class ImageView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: this.props.image,
    }
  }
  render() {
    return (
      <a download={this.props.image.filename} href={this.props.image.url}>
        <img alt={this.props.image.filename} src={this.props.image.url} />
      </a>
    )
  }
}

export class DownloadView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: this.props.file
    }
  }
  render() {
    return (
      <DownloadWrapper download={this.state.file.filename} href={this.state.file.url}>
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M1022.955 522.57c0 100.193-81.516 181.699-181.719 181.699H655.6c-11.298 0-20.467-9.169-20.467-20.466 0-11.308 9.17-20.466 20.467-20.466h185.637c77.628 0 140.787-63.148 140.787-140.766 0-77.424-62.841-140.449-140.203-140.766-.42.03-.819.05-1.218.061-5.945.143-11.686-2.292-15.687-6.703a20.455 20.455 0 0 1-5.168-16.25c1.33-10.806 1.944-19.76 1.944-28.192 0-60.764-23.658-117.885-66.617-160.833-42.969-42.968-100.09-66.617-160.843-66.617-47.369 0-92.742 14.45-131.208 41.782-37.617 26.739-65.953 63.7-81.926 106.884a20.5 20.5 0 0 1-14.828 12.894 20.492 20.492 0 0 1-18.86-5.547c-19.289-19.33-44.943-29.972-72.245-29.972-56.323 0-102.146 45.813-102.146 102.126 0 .317.04.982.092 1.627.061.92.122 1.831.153 2.763a20.466 20.466 0 0 1-15.002 20.455c-32.356 8.934-61.541 28.55-82.181 55.218-21.305 27.517-32.572 60.508-32.572 95.413 0 86.244 70.188 156.423 156.443 156.423h169.981c11.298 0 20.466 9.158 20.466 20.466 0 11.297-9.168 20.466-20.466 20.466H199.951c-108.829 0-197.375-88.536-197.375-197.355 0-44.053 14.224-85.712 41.126-120.474 22.81-29.46 53.898-52.086 88.71-64.816 5.066-74.323 67.15-133.245 142.752-133.245 28.386 0 55.504 8.218 78.651 23.526 19.658-39.868 48.843-74.169 85.498-100.212 45.434-32.296 99.004-49.354 154.918-49.354 71.693 0 139.088 27.916 189.782 78.6 50.695 50.695 78.61 118.09 78.61 189.782 0 3.705-.102 7.47-.296 11.37 90.307 10.478 160.628 87.42 160.628 180.48z" /><path d="M629.259 820.711L527.235 922.724c-3.99 4.002-9.23 5.997-14.47 5.997s-10.478-1.995-14.47-5.997L396.273 820.711c-7.992-7.992-7.992-20.947 0-28.94s20.947-8.001 28.94 0l67.087 67.079v-358.7c0-11.297 9.159-20.466 20.466-20.466 11.308 0 20.467 9.169 20.467 20.466v358.7l67.088-67.078c7.992-8.002 20.947-7.992 28.939 0s7.992 20.947 0 28.939z" /></svg>
        Download <span>{this.state.file.filename}</span>
      </DownloadWrapper>
    )
  }
}
