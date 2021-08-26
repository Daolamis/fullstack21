import React from 'react'
import { connect } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    props.addFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={props.filterTxt} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = state =>{
  return {
    filterTxt: state.filter
  }
}

const mapDispatchToProps = {
  addFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)