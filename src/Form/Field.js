import React, { Component, PropTypes } from 'react'

export default class Field extends Component {
  constructor(props, context) {
    super(props, context)

    const {name, type, value, checked} = props
    this.is_checkbox = type === 'checkbox'
    this.is_radio = type === 'radio'

    this.data = {}
    this.data[name] = this.is_checkbox ? checked : value
    this.state = this.data

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const {name, value, checked, defaultChecked} = this.props
    let handleChange = null
    if (this.is_checkbox) {
      handleChange = () => {
        this.context.data[name] = this.data[name] = !this.data[name]
        this.setState(this.data)
      }
      this.context.data[name] = checked 
    } else {
      handleChange = (e) => {
        this.context.data[name] = this.data[name] = e.target.value
        this.setState(this.data)
      }
      this.context.data[name] = (
        this.is_radio && !defaultChecked ? 
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

  componentWillUnmount() {
    this.context.event.off(this.emit_name)
  }

  handleChange(e) {
    this.context.event.emit(this.emit_name, e)
  }

  render() {
    const {component: TempComponent, ...rest} = this.props
    if (this.is_checkbox) {
      rest.checked = this.state[this.props.name]
    } else {
      rest.value = this.state[this.props.name]
    }
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