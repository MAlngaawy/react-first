/*
 1 ==> Props are used to pass data from component to component
 2 ==> props are only passed from top to bottom in react's component tree
 3 ==> there is no way in react to set props == Props are read-only.
 4 ==> props are only used to pass data from one component to another component React, but only from parent to child components down the component tree.
 5 ==> lifecycle methods Just "componentDidMount()" method use to ({fech Date})
 6 ==> Unit tests === Libr -> Enzyme
 7 ==> snapshot tests === Libr -> Jest >> used for component tests // create-react-app already comes with Jest
*/
import React, {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';
import { sortBy } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './App.css';

// it's for font awesome in react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngry } from '@fortawesome/free-solid-svg-icons';

// You can learn everything about the next by going to (https://hn.algolia.com/api)
const DEFAULT_QUERY = 'javaScript';
const DEFAULT_HPP = '10'; // to control the num of hits 20 or 100 or 50

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search'; // Sorted by relevance, then points, then number of comments
const PARAM_SEARCH = 'query='; // full-text query ==> i set bydefault to "javaScript"
const PARAM_PAGE = 'page='; // the number of page
const PARAM_HPP = 'hitsPerPage='; // to control the num of hits 20 or 100 or 50

// `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`

// URL
// const url =  `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

const Test = () => {
  const [value, setValue] = useState('Hello World') // Used Hookes Here instead of useState Function
  const handleChange = event => setValue(event.target.value);

  return (
    <div>
      <input type='text' value={value} onChange={handleChange} />
      <p>
        <strong>Output: </strong> {value}
      </p>
    </div>
  )
}

//_________//
// Ex HOC (Heigher Order Component)
function withFeature(Component) {
  return function(props) {
    return <Component {...props} />;
  }
}
const withEnhancement = (Component) => (props) =>
      <Component {...props} />
//_________//

class Search extends Component {

// Using REF ATTRIBUTE
  componentDidMount() {
    if (this.input) { // Target the input
      this.input.focus(); // Trigger the Focuse method in the input ref
    }
  }

  render() {
    const {value, onChange,onSubmit, children} = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={el => this.input = el} // Ref the DOM Element ==> REF ATTRIBUTE
        />
        <button type='submit'>
          {children}
        </button>
      </form>
    );
  }
}
      Search.propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        children: PropTypes.string
      };

// Error Component
const ErrorHandle = () =>
      <div className='errorhandle'>
        <h1>Something Went Wrong.</h1>
      </div>

const Sort = ({sortKey, onSort, children, activeSortKey}) => {
  const sortClass =  classNames('button-inline', {'button-active': sortKey === activeSortKey});

  return (
  <Button onClick={() => onSort(sortKey)} className={sortClass}>
    {children}
  </Button>
  );
}

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false
    }
    this.onSort = this.onSort.bind(this)
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const {list, onDismiss, plusPoints} = this.props
    const {sortKey, isSortReverse} = this.state
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
    ? sortedList.reverse()
    : sortedList;
    return (
      <div className='table'>
        <div className='table-header'>
          <span style={{width: '40%'}}>
            <Sort sortKey={'TITLE'} onSort={this.onSort} activeSortKey={sortKey}> </Sort>
            Title
          </span>
          <span style={{width: '30%'}}>
            <Sort sortKey={'AUTHOR'} onSort={this.onSort} activeSortKey={sortKey}> </Sort>
            Author
          </span>
          <span style={{width: '10%'}}>
            <Sort sortKey={'COMMENTS'} onSort={this.onSort} activeSortKey={sortKey}> </Sort>
            Comments
          </span>
          <span style={{width: '10%'}}>
            <Sort sortKey={'POINTS'} onSort={this.onSort} activeSortKey={sortKey}> </Sort>
            Points
          </span>
          <span style={{width: '10%'}}>
            Archive
          </span>
        </div>
        {reverseSortedList.map(item =>
          <div key={item.objectID} className='table-row'>
          <span style={{ width: '40%' }}>
              <a href={item.url} target='_blank'>{item.title}</a>
            </span>
            <span style={{ width: '30%' }}> {item.author} </span>
            <span style={{ width: '10%' }}> {item.num_comments} </span>
            <span style={{ width: '10%' }}> {item.points} </span>
            <span style={{ width: '10%' }}>
            <Button onClick={() => onDismiss(item.objectID)} className='button-inline'>
              onDismiss
            </Button>
            {/* <Button onClick={() => plusPoints(list.indexOf(item))}>plusPoints</Button> */}
            </span>
          </div>
        )}
      </div>
    );
  }
}
      // define a PropType interface for the Table component
      Table.propTypes = {
        list: PropTypes.array.isRequired,
        onDismiss: PropTypes.func.isRequired,
      };
      // You can define the content of an array PropType more explicitly Like This
      /*
      Table.PropTypes = {
        list:PropTypes.arrayOf(
          PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number
          })
        ).isRequired,
        onDismiss: PropTypes.func.isRequired,
      };

      ===== Only the objectID is required, because some of the code depends on it
      */

const Button = ({onClick, className, children}) =>
      <button
        onClick={onClick}
        className={className}
        type='button'
      >
        {children}
      </button>

      // Component Interface with PropTypes
      // we want to take every argument from the function signature and assign a PropType to it.
      Button.propTypes = {
        onClick: PropTypes.func.isRequired, // it's mean that it's nutt alowed to be null or undefined
        className: PropTypes.string, // Not required Cuz it can default to an empty string
        children: PropTypes.node.isRequired, // it's mean that it's nutt alowed to be null or undefine
      };

      // We Can set default props loke this
      Button.defaultProps = {
        className: '',
      };

      // now we use (functional stateless component) instead of (ES6 class components)
      const Loading = () =>
            <div className='loading'>
              <FontAwesomeIcon className="angry" icon={faAngry} />
            </div>

      // HOC with Loading
      const withLoading = (Component) => ({isLoading, ...rest}) =>
        isLoading
          ? <Loading />
          : <Component {...rest} />

// Apply HOC in the Button Component
const ButtonWithLoading = withLoading(Button);

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const {searchKey, results} = prevState; // retrieve the searchKey from the component state.
  // if the page is 0 return rmptey array ==== if the page not equal 0 return the current hits in result
  // this time the old hits get retrieved from the results map with the searchKey as key.
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  // concat all the old hits from the previose const with the hits witch comes back in result from last fetch
  const updatedHits = [...oldHits, ...hits];
  return {
  results: {
    ...results,
    [searchKey]: {hits: updatedHits, page} // ({[JavaScript objects are really dictionaries]}) ==> results[javaScript] : {hits: updatedHits, page}
  },
  isLoading: false
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  // Check if the search tern is already in the results map or not if it's Not return (True)
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm]
  }

  // it's for change the value of searchTerm depending on the input field value
  setSearchTopStories(result) {
    // let's show all pages instead of the just last page
    const {hits, page} = result
    //Update the state
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({isLoading: true});
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(result => this.setSearchTopStories(result.data)) // set the JSON data as a result in the local component state
    .catch(error => this.setState({error})) // if an error occurs
  }

  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm})
    // Only search if it's not in the results map
    if(this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm)
    }
    event.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.setState({searchKey: searchTerm})
    this.fetchSearchTopStories(searchTerm)
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value}) // event.target.value ==> target input fild value
  }
/*
  plusPoints = (index) => {
    const newList = this.state.list
    newList[index].points += 1
    this.setState({list: newList})
  }
*/
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {...results, [searchKey]: {hits: updatedHits, page}}
    })
  }

  render() {
    const {results, searchTerm, searchKey, error, isLoading} = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0; // set the page proparty ==>
    const list = (results && results[searchKey] && results[searchKey].hits) || []; // set the page proparty ==>

    return (
      <div className='page' >
      <div className='interactions'>
        <Search
          value={searchTerm} // value proparte
          onChange={this.onSearchChange} // onChange proparte
          onSubmit={this.onSearchSubmit}
        >
        Search Fucker
        </Search>
      </div>
        {results?
          <Table
          list={list} // list proparte
          onDismiss={this.onDismiss} // onDismiss proparte
          // plusPoints={this.plusPoints}
        />
        :error?
        <ErrorHandle />
        :
        <Loading />
        }
        <div className='interactions'>
          <ButtonWithLoading
            isLoading = {isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
        <Test />
      </div>
    )
  }
}

export default App;

export {
  Button,
  Search,
  Table,
};
