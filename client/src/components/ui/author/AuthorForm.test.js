import {AuthorForm} from './AuthorForm'

let props = {}
let form

beforeEach(()=>{
  form = new AuthorForm(props)
})

afterEach(()=>{
  form = null
})

test('isValidName: check a valid name', () => {
    expect(form.isValidName('Vasya')).toBe(true)
  })

  test('isValidName: check a invalid name', () => {
    expect(form.isValidName('Jenia23')).toBe(false)
  })
  
  test('isValidFormData: empty author json', ()=>{
    let author = {}
    expect(form.isValidFormData(author)).toHaveLength(2) //expect 2 validation errors
  })

  test('isValidFormData: empty last name only', ()=>{
    let author = {firstName:'Valera'}
    expect(form.isValidFormData(author)).toHaveLength(1) //expect 1 validation errors
  })

  test('isValidFormData: empty first name only', ()=>{
    let author = {lastName:'Kio'}
    expect(form.isValidFormData(author)).toHaveLength(1) //expect 1 validation errors
  })
