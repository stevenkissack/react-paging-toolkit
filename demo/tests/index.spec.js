import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from '../../src/tests/testHelper'
import { Paginate, PaginateControl } from '../../src'
import SimpleDemo from '../paginate-simple'

describe('<SimpleDemo />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SimpleDemo />)
  })

  it('renders the component', () => {
    expect(wrapper.find(Paginate)).to.exist
  })
})
