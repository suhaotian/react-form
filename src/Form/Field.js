import React, { Component, PropTypes } from 'react'

export default class Field extends Component {
  constructor(props, context) {
    super(props, context)

    this.value_field = props.type === 'checkbox' ? 'checked' : 'value'
    this.data = {}
    this.data[props.name] = props[this.value_field]
    
    this.state = this.data

    this.handleChange = this.handleChange.bind(this)
    this.init = this.init.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this.context.event.off(this.emit_name)
    delete this.context.data[this.props.name]
  }

  init() {
    const {type, name, value, checked, defaultChecked} = this.props
    let handleChange = null
    if (type === 'checkbox') {
      handleChange = () => {
        this.context.data[name] = this.data[name] = !this.data[name]
        this.setState(this.data)
      }
      this.context.data[name] = checked 
    } else {
      handleChange = (value, e) => {
        this.context.data[name] = this.data[name] = value
        this.setState(this.data)
      }
      this.context.data[name] = (
        type === 'radio' && !defaultChecked ? 
        this.context.data[name] : value
      )    
    }
    this.emit_name = (
      this.context.event.cbs[name] ? 
      `${name}:${this.context.event.cbs[name].length}` : 
      name
    )
    this.context.event.on(this.emit_name, handleChange)
  }

  handleChange(e) {
    this.context.event.emit(this.emit_name, e.target[this.value_field], e)
  }

  render() {
    const {component: TempComponent, ...rest} = this.props
    rest[this.value_field] = this.state[this.props.name]
    
    return (
      <TempComponent 
        {...rest}
        onChange={this.handleChange}
      />
    )
  }
} 

Field.contextTypes = {
  event: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  checked: PropTypes.bool,
  component: PropTypes.string.isRequired,
}