// This File comes for testing
/*
  Some Notes about unit testing
  1: Enzyme provides a mechanism to mount and traverse React.js component trees. This will help us get access to its own properties and state as well as its children props in order to run our assertions.
  2: toBe uses Object.is to test exact equality
  3: jest can test a plain javascript function
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from './App';


Enzyme.configure({ adapter: new Adapter() });

describe('Search', () => { // describe block is a test suite
  it('renders without crashing', () => { // it is a test cases
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => { // Start a Test Case
    const component = renderer.create(<Search>Search</Search>); // render a component with the new renderer
    const tree = component.toJSON(); // transform it into JSON
    expect(tree).toMatchSnapshot(); // match the snapshot to the previously stored snapshot:
  });

})

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button onClick = {() => {}}>Give me more</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
    <Button onClick={() => {}}>Give me more</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

})

describe('Table', () => {

  const props = {
    list: [
      {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
      {title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'},
    ],
    sortKey: 'TITLE',
    isSortReverse: false,
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Table {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('show two items in list', () => {
    const element = shallow(
      <Table {...props} />
    );

    expect(element.find('.table-row').length).toBe(2)
  })

})

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
    });

  test('has a valid snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});


// This what i found in the file
/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/
