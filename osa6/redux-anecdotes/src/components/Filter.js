import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = () => {
  const filterTxt = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(addFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filterTxt} onChange={handleChange} />
    </div>
  )
}

export default Filter