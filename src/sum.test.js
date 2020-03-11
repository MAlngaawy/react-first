import  Sum, { Counter, dataReducer } from './sum'
import { configure, mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()})

const list = ['a', 'b', 'c'];
describe('Sum', () => {
  describe('Reduser', () => {
    it('should set a list', () => {
      const state = {list: [], error: null};
      const newState = dataReducer(state, {
        type: 'SET_LIST',
        list,
      });
      expect(newState).toEqual({list, error: null});
    });

    // data fetching
    it('should reset the error if list is set', () => {
      const state = { list: [], error: true };
      const newState = dataReducer(state, {
        type: 'SET_LIST',
        list,
      });
      expect(newState).toEqual({ list, error: null });
    });
    it('should set the error', () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, {
        type: 'SET_ERROR',
      });
      expect(newState.error).toBeTruthy();
    });

  });

  test('snapshot render', () => {
    const component = renderer.create(<Sum />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  //  Enzyme gives you the new renderer to render your React component (mount among others)
  // and an API to traverse the DOM (find among others) of it.
  it('renders the inner container', () => {
    const wrapper = mount(<Sum />);
    expect(wrapper.find(Counter).length).toEqual(1);
  });

  it('passes all props to Counter', () => {
    const wrapper = mount(<Sum />);
    const counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.find('p').text()).toEqual('0');
  });

  // simulate click events with Enzyme and check the rendered output in our child component afterward 
  it('increments he counter', () => {
    const wrapper = mount(<Sum />);

    wrapper.find('button').at(0).simulate('click');

    const counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.find('p').text()).toBe('1')
  });

  it('decrememt the counter', () => {
    const wrapper = mount(<Sum />);

    wrapper.find('button').at(1).simulate('click');

    const counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.find('p').text()).toBe('-1')
  });
});


describe('Counter', () => { // describe block is a test suite
  test('snapshot renders', () => { // Start a Test Case
    const component = renderer.create(<Counter counter={1} />); // render a component with the new renderer
    let tree = component.toJSON(); // transform it into JSON to make it comparable,
    expect(tree).toMatchSnapshot(); // match the snapshot to the previously stored snapshot
  });
});


// Important NOTES

/*
  While the test-block is used for my snapshot tests, the it-block is used for integration and unit tests with Enzyme.
  Enzyme API ==> ( https://enzymejs.github.io/enzyme/docs/api/ )
*/