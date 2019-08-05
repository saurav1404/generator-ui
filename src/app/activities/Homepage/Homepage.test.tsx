import { assert } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import Homepage from './Homepage';

describe('Homepage activity', () => {
  it('Should render correctly', () => {
    const component = shallow((
      <Homepage classNames={{}} image='no-image.png' />
    ));

    assert.equal(component.find('h3').text(), 'Homepage');
    assert.equal(component.find('p').text(), 'Works.');
  });
});
