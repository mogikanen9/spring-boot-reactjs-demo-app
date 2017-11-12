import {AuthorForm} from './AuthorForm'

let props = {}
let form

beforeEach(()=>{
  form = new AuthorForm(props)
})

afterEach(()=>{
  form = null
})

describe('isValidName:',()=>{

  test('check a valid name', () => {
    expect(form.isValidName('Vasya')).toBe(true)
  })

  test('check an invalid name', () => {
    expect(form.isValidName('Jen2ia')).toBe(false)
  })

})

  
describe('isValidFormData',()=>{
  test('empty author json', ()=>{
    let author = {}
    expect(form.isValidFormData(author)).toHaveLength(2) //expect 2 validation errors
  })

  test('empty last name only', ()=>{
    let author = {firstName:'Valera'}
    expect(form.isValidFormData(author)).toHaveLength(1) //expect 1 validation errors
  })

  test('empty first name only', ()=>{
    let author = {lastName:'Kio'}
    expect(form.isValidFormData(author)).toHaveLength(1) //expect 1 validation errors
  })

  test('both FN and LN setup', ()=>{
    let author = {lastName:'Kio', firstName:'Mo'}
    expect(form.isValidFormData(author)).toHaveLength(0)
  })

  test('both FN and LN setup with numbers in them', ()=>{
    let author = {lastName:'K3io', firstName:'Mo2'}
    expect(form.isValidFormData(author)).toHaveLength(2)
  })

})

