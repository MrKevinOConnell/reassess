import React from 'react'
import PropTypes from 'prop-types'

import './FormInput.css'

function FormInput(props) {
  const {
    title,
    label,
    type,
    value,
    onChange,
    name,
    gpt,
    id,
    disabled,
  } = props

  // TODO: Might need to change this back, but getting a react error if you switch from not having a valueProp
  // to having one...
  const valueProp = value !== undefined ? { value } : { value: '' }
  const isGpt = gpt ? 'FormInput-gptInput' : 'FormInput-normalInput'
  return (
    <div className='FormInput-container'>
      { title && <h3 className='FormInput-title'>{ title }</h3> }
      { label && <label className='FormInput-label'>{ label }</label> }
      {
        type === 'textarea' ? (
          <textarea
            className={isGpt}
            onChange={onChange}
            value={value}
            name={name}
            id={id}
            cols='30'
            rows='10'
            disabled={disabled}
          />
        ) : (
          <input
            className={isGpt}
            type={type}
            onChange={onChange}
            {...valueProp}
            name={name}
            id={id}
            disabled={disabled}
          />
        )
      }
    </div>
  )
}

FormInput.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  gpt: PropTypes.bool,
}

FormInput.defaultProps = {
  type: 'text',
  title: null,
  label: null,
  value: undefined,
  disabled: false,
  gpt: false,
}

export default FormInput
