import React, { connect } from 'react-redux'
import { BookForm } from '../BookForm'
import { fetchAuthors} from '../../../actions/authors'

const mapStateToProps = state => {
    console.log('state->', state)
    return {
      authors: state.authors.myAuthors,
      isFetching: state.authors.isFetching
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      loadAuthors: () => {
        console.log('Dispatching fetchAuthors...')
        dispatch(fetchAuthors(dispatch, 25))
      }
    }
  }
  
  const VisibleBookForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(BookForm)
  
  export default VisibleBookForm
  
