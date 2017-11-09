import {AuthorForm} from './AuthorForm'

let props = {}
let form = new AuthorForm(props)

test('isValidName: check a valid name', () => {
    expect(form.isValidName('Vasya')).toBe(true)
  })
