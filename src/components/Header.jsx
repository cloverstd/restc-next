import React, { Component } from 'react';
import styled from 'styled-components'

const HeaderStyle = styled.div`
display: flex;
align-items: center;
padding: 10px 40px;
background: #4c5264;
`

const Brand = styled.a`
margin: 0 -8px;
padding: 8px;
width: 67px;
height: 25px;
background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAAAyCAYAAACZIqPyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjNDUyZmZhYi1mYzc2LTQ3NzktYWIxNi0yMWIwYzAwNmQ3MzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REU5NDNBN0VBMDIxMTFFNkJFRjI4RDAyMkVFQTk1MEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REU5NDNBN0RBMDIxMTFFNkJFRjI4RDAyMkVFQTk1MEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjNDUyZmZhYi1mYzc2LTQ3NzktYWIxNi0yMWIwYzAwNmQ3MzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YzQ1MmZmYWItZmM3Ni00Nzc5LWFiMTYtMjFiMGMwMDZkNzM5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3gUV5gAABPZJREFUeNrsXItxozAQlT1pQCmBlIBLwCWQEkgJUAIuwZRglwAlHCVYJYQSOJiTLoqy+gbEx3ozO54xIMTu29WuJDj0fY8ApIPkg8TAsQMK2BrqQRLhv26QYpAKuuBFQopb0OXugQe50t+LePAIXJAHnT0VckoOJTGwZPgI2HfkSHTEgEhR0LziEPKLzeLM2e8MHI9MhhIxQbkEvTqH6CuVNaEZ5K47SUeMNtjXmgxj4j6WeuUg2Ur7qbXrS7DlZHhAIXmrOAZ7BgRiBARiBARiBGyQGFeaofOScsdjLotnopt5xUL2z8sDydd4VEhpFdED8knbzIHksubOkyWemaSfOkT0ng/g+huSzFhOhnERjZOk/45aOG4r1/4nSnos62HcLNvrFe1gTf+iQf70dhjPj+n1de+Gh4PeZMgd7JLr2liiXI2pyCZ+iMR7bpaRIKXXjTN9naTN2qHEjCR9nArQSuhT5BgqUiDAiJgqK574XqXjvEMjIdoUKB1I0eyFGLqFOjKRAfnIkQBenzq2d5/RYaD8alyrekXf16sK2o8WzTQ7vcaqhAjKyhTnvXPKeld4cgaQRYZKMAIzREHb5z2UX5wiFu29GfRxvNcJ/VurEp/rQp/3vNdytaJK4o1LFMpCglHugicXknMTIGrJhrEP4P8LldeZhhEMPGthEA06X8TAHklRUCMQwbidgWdXEg+tJMoShy/sW9EaJEA0rNaUfEaeFGWynB8rDKhKuFqFV+qeK1qoIog95TGm9/9BjMygdJwCrUtnDYlBFEY3IXyN/C+XRw76mSqP40v7H8SQ1fQNWg6qcO8SyToLj7x6nk+IPTmkquS+8c97pAp4AEqoFiZGpCBMr5DMgBjEgBwJ1c0Nzb/PAnsmBjSUxxwXwKqkpUnhB9oXOiD5NTFAir7WYHwRw0cSzErexrRcjam34J0Rg0jmQUy9s0Tr2785RVRObOYx0p0pgUi8cIyOJ4sqIEP7ee+mpCItV8eJojdAOSlawWIOgLGfB0t50wwxbBbRpBqYY7m7M8yvphy6csBJGBf+RwxZWE0W9nKbpHSKTP1Ec6tOo9RsZmLMPYxD77Ge+XzjCFQiPplroyxffWLT9I3jHMsUTjC3Q0a68vWo6eCSCahqBjPxQEpVYmqjF+zwrL5fEyW65LND60Gr6E/q4f6dImpgi6EvcSCG76qwM61K1pRoyqoD3Tg/KvemqTBKR28nlhEjF5LXKxDKdcmhV2yVGAh9vRcaAwYfCVFrKquEKp+9TpgA5VxqQYxOUxr23L1ig+iUG5J/nsiywGZg23ZdN9yq7oV/2WZssMFWhU/g+kSxqTkRzs3o/yPSOTYDb+G9El35aFKaQVHlN1VLKyl3bYYXDFx/l+RT/GsKPY2U6Zz51haIQZB8p7cp4onKwZEQheJY84s+MScgDsTHz0gMpvQTsl/tZXMSFeCdtga4GxDU1LCyrQOd5XO2EzgNiC19BoFFDrbIl0qSOLacrNohxvZwsrYiyfDSUkI0yGy6nFAissQxAvqmW/Jns5BsCCwlz9iiGbdFHITPObI9CLxnnVHA3pALhCtERwovNQdsOscICMQICMQI2Cwxwsdg94n4t8RYfDEnYHKwUt+KGFCtLn5pJmB74KfUa+C40X6M8NHX50NjMpSET0Q/F6DPLIDEGKdr30Pk2D3YJx/ARcG/AgwApoTnnabyZYoAAAAASUVORK5CYII=');
background-position: 50% 50%;
background-repeat: no-repeat;
background-size: 67px 25px;
`

const Toggle = styled.a`
margin-left: auto;
padding: 4px;
width: 24px;
height: 24px;
background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pjxzdmcgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxwYXRoIGQ9Ik0yMzIuMzY5MjMxIDI4Mi44MTMwNDZoNTU5LjI2MTUzOGEzMS41MDc2OTIgMzEuNTA3NjkyIDAgMCAwIDAtNjMuMDE1Mzg0aC01NTkuMjYxNTM4YTMxLjUwNzY5MiAzMS41MDc2OTIgMCAwIDAgMCA2My4wMTUzODR6TTc5MS42MzA3NjkgNDgwLjQ5MjMwOGgtNTU5LjI2MTUzOGEzMS41MDc2OTIgMzEuNTA3NjkyIDAgMCAwIDAgNjMuMDE1Mzg0aDU1OS4yNjE1MzhhMzEuNTA3NjkyIDMxLjUwNzY5MiAwIDAgMCAwLTYzLjAxNTM4NHpNNzkxLjYzMDc2OSA3NDEuMTg2OTU0aC01NTkuMjYxNTM4YTMxLjUwNzY5MiAzMS41MDc2OTIgMCAwIDAgMCA2My4wMTUzODRoNTU5LjI2MTUzOGEzMS41MDc2OTIgMzEuNTA3NjkyIDAgMCAwIDAtNjMuMDE1Mzg0eiIgZmlsbD0iI2ZmZiI+PC9wYXRoPjwvc3ZnPg==');
background-position: 50% 50%;
background-repeat: no-repeat;
border-radius: 4px;
text-indent: 10000px;
overflow: hidden;
&:hover {
  background-color: #3f4555;
  cursor: pointer;
}
&:active, &.active {
  background-color: #2d2f3b;
}
`

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 'active'
    }
  }
  click() {
    this.setState(state => {
      return {
        active: state.active === 'active' ? void 0 : 'active'
      }
    }, () => {
      this.props.onToggleClick && this.props.onToggleClick()
    })
  }
  render() {
    return (
      <HeaderStyle>
        <Brand href="https://github.com/ElemeFE/restc"></Brand>
        <Toggle className={this.state.active} onClick={() => this.click()}>Toggle SideBar</Toggle>
      </HeaderStyle>
    )
  }
}
