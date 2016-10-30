import React, { Component, PropTypes } from 'react'
import generateContext from './generateContext'

export default class Form extends Component {
  getChildContext() {
    this.context = generateContext()
    return this.context
  }

  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        this.props.onSubmit(e, this.context.data)
      }}>
        {this.props.children}
      </form>
    )
  }
}

Form.defaultProps = {
  onSubmit: function(){}
}

Form.childContextTypes = {
  event: PropTypes.object,
  data: PropTypes.object
}

Form.contextTypes = {
  event: PropTypes.object,
  data: PropTypes.object
}
