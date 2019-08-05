import { assert } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Header } from '../Header';

describe('Header component', () => {
  it('Should render correctly', () => {
    const component = shallow((
      <Header />
    ));

    assert.equal(component.find('h1').text(), 'React template');
  });
});
