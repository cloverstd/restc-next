import React, { Component } from 'react';
import styled from 'styled-components'

const InputWrapper = styled.div`
padding: 0 1em;
display: flex;
box-sizing: border-box;
color: #dbdfeb;
background: #3f4555;
line-height: 40px;
border: 0 none;
border-radius: 8px;
> input {
    margin: 0;
    padding: 0;
    flex: 1;
    border: 0 none;
    color: inherit;
    background: transparent;
    font: inherit;
    vertical-align: middle;
    outline: none;
    &::-webkit-input-placeholder {
        color: #5d6577;
    }
}
`

const CheckBoxWrapper = styled.input`
margin: 0 8px 0 10px;
width: 18px;
height: 18px;
-webkit-appearance: none;
-moz-appearance: none;
background: #2d2f3b;
border-radius: 4px;
cursor: pointer;
outline: none;
&:hover {
    background: #262c39;
}
&:checked {
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOCA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0xIDIuOTRsMi4wMyAyLjAzTDcgMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+');
}
`

const Parameter = styled.div`
margin-bottom: 1px;
display: flex;
align-items: center;
background: #3f4555;
font-size: 12px;
`
class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || ''
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        }, () => {
            this.props.onChange && this.props.onChange(this.state.value)
        })
    }
    setValue(v) {
        this.setState({
            value: v
        })
    }
    render() {
        return (
            <InputWrapper className={this.props.className}>
                <input type="text" onChange={this.onChange} placeholder={this.props.placeholder} value={this.state.value} />
            </InputWrapper>
        )
    }
}

class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: true
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange() {
        this.setState({
            checked: !this.state.checked
        })
        this.props.onChange && this.props.onChange(!this.state.checked)
    }
    setValue(checked) {
        this.setState({
            checked
        })
    }
    render() {
        return (
            <CheckBoxWrapper checked={this.state.checked} onChange={this.onChange} type="checkbox" />
        )
    }
}

const KeyValueInput = styled(Input)`
padding: 4px 6px 4px 0;
flex: 1;
border-radius: 0;
font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
line-height: 32px;
`

const AddParameterWrapper = styled.div`
padding: 0 11px 0 35px;
display: flex;
align-items: center;
height: 40px;
color: #5d6577;
background: #3f4555 url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiI+PHBhdGggZD0iTTUgMTJWN0gwVjVoNVYwaDJ2NWg1djJIN3Y1eiIgZmlsbD0iIzVkNjU3NyIvPjwvc3ZnPg==') 12px 50% no-repeat;
font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
font-size: 12px;
cursor: pointer;
&:hover {
    color: #fff;
}
`

class ParameterInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.checked,
            key: this.props.keyValue,
            value: this.props.valueValue
        }
    }
    setValue(item) {
        this.setState({
            ...item
        })
    }
    render() {
        return (
            <Parameter>
                <CheckBox checked={this.state.checked} onChange={this.props.onChangeCheckBox} />
                <KeyValueInput ref={input => input && input.setValue(this.state.key)} placeholder="key" value={this.state.key} onChange={this.props.onChangeKey}/>
                <KeyValueInput ref={input => input && input.setValue(this.state.value)} placeholder="value" value={this.state.value} onChange={this.props.onChangeValue}/>
            </Parameter>
        )
    }
}


const KeyValueWrapper = styled.div`
border-radius: 4px;
overflow: hidden;
`

class KeyValue extends Component {
    constructor(props) {
        super(props);

        let data = []
        if (this.props.defaultValue) {
            data.push(this.props.defaultValue)
        }
        this.state = {
            data: data
        }
        this.props.onChange && this.props.onChange(data)
    }
    handleAdd() {
        let data = this.state.data
            data.push({
                checked: true,
                key: 'new item',
                value: ''
            });
        this.setState({
            data
        })
        this.props.onChange && this.props.onChange(data)
    }
    update(i, value, key) {
        let data = this.state.data
        data[i][key] = value
        this.setState({
            data
        })
        this.props.onChange && this.props.onChange(data)
    }
    setData(data) {
        this.setState({ data })
    }
    render() {
        let parameters = []
        for (let i = 0; i < this.state.data.length; i++) {
            parameters.push(<ParameterInput
                 keyValue={this.state.data[i].key}
                 valueValue={this.state.data[i].value}
                 ref={parameterInput => parameterInput && parameterInput.setValue(this.state.data[i])}
                 key={i}
                 onChangeKey={e => this.update(i, e, 'key')}
                 onChangeValue={e => this.update(i, e, 'value')}
                 onChangeCheckBox={e => this.update(i, e, 'checked')}
            />)
        }
        return (
            <KeyValueWrapper>
                {parameters}
                <AddParameterWrapper onClick={() => {this.handleAdd()}}>{this.props.addText} </AddParameterWrapper>
            </KeyValueWrapper>
        )
    }
}

export {
    Input,
    KeyValue,
}