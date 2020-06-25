import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'

const Footer = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
      All
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_UNFINISHED}>
      Unfinished
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_FINISHED}>
      Finished
    </FilterLink>
  </div>
)

export default Footer
