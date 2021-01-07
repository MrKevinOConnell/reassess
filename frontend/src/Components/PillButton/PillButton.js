import React, { useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './PillButton.css'

function PillButton(props) {
  const {
    onClick,
    onClickSelected,
    selected,
    SelectedIcon,
    disabled,
    name,
    extraClassName,
    dndProvided,
    id,
    linkTo,
  } = props

  const containerClassNames = useMemo(() => (
    [
      'PillButton-container',
      disabled ? 'disabled' : '',
      selected ? 'selected' : '',
      extraClassName,
    ].join(' ')
  ), [ disabled, selected, extraClassName ])

  const onClickCallback = useCallback(() => {
    if (!disabled) {
      if (selected) {
        onClickSelected()
      } else {
        onClick()
      }
    }
  }, [ disabled, selected, onClick, onClickSelected ])

  return (
    <div
      ref={dndProvided.innerRef}
      {...dndProvided.draggableProps}
      {...dndProvided.dragHandleProps}
      className={containerClassNames}
      onClick={onClickCallback}
      id={id}
    >
      { linkTo ? <Link to={linkTo}>{ name }</Link> : (<div>{ name }</div>) }
      { (selected && SelectedIcon) ? (<SelectedIcon className='PillButton-selectedIcon' />) : null }
    </div>
  )
}

PillButton.propTypes = {
  onClick: PropTypes.func,
  onClickSelected: PropTypes.func,
  selected: PropTypes.bool,
  SelectedIcon: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  extraClassName: PropTypes.string,
  id: PropTypes.string,
  dndProvided: PropTypes.object,
  linkTo: PropTypes.string,
}

PillButton.defaultProps = {
  onClick: () => {},
  onClickSelected: () => {},
  selected: false,
  SelectedIcon: null,
  disabled: false,
  extraClassName: '',
  id: '',
  dndProvided: { draggableProps: {}, dragHandleProps: {} },
  linkTo: null,
}

export default PillButton
