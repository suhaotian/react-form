import React from 'react'
import Form from './Form'
import Field from './Field'

const Demo = () => (
  <Form onSubmit={(e, fields) => {
    console.log(fields)
  }}>
    <Field 
      placeholder="type something" 
      component="input" 
      name="username" 
      value=""
      type="text" 
    /> 
    <br/>
    <Field 
      component="input" 
      name="password" 
      value="123456" 
      type="password" 
    />
    <br/>
    <Field 
      component="input"
      type="checkbox"
      name="remember me"
      checked={true}
    />
    <br/>
    <Field component="select" name="sex" value="0">
      <option value="1">woman</option>
      <option value="0">man</option>
    </Field>  
    <br/>
    <Field 
      component="input"
      type="radio"
      name="color"
      value="red"
    /> red
    <Field 
      component="input"
      type="radio"
      name="color"
      value="blue"
    /> blue
    <br/>
    <button type="submit">submit</button>
  </Form>
)

export default Demo