import React from 'react'
import ReactDOM from 'react-dom'

import {AuthorFormErrors} from './AuthorFormErrors';

describe('AuthorFormErrors component renders without crashing',()=>{
    it('empty forErrors props', () => {
        let errors=[]    
        const div = document.createElement('div');
        ReactDOM.render(<AuthorFormErrors formErrors={errors}/>, div);
    })

    it('formErrors props not provided', () => {    
        const div = document.createElement('div');
        ReactDOM.render(<AuthorFormErrors/>, div);
    })

    it('formErrors props has an error with both fieladName and msg', () => {    
        let errors=[]
        errors.push({fieldName:"firstName", 
            msg:"Invalid FN. Only alpha caracters are allowed!"})
        const div = document.createElement('div');
        ReactDOM.render(<AuthorFormErrors formErrors={errors}/>, div);
    })

    it('formErrors props has an error but with fieldName onlye', () => {    
        let errors=[]
        errors.push({fieldName:"lastName"})
        const div = document.createElement('div');
        ReactDOM.render(<AuthorFormErrors formErrors={errors}/>, div);
    })

})
