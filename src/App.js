/*
 1 ==> Props are used to pass data from component to component
 2 ==> props are only passed from top to bottom in react's component tree
 3 ==> there is no way in react to set props == Props are read-only.
 4 ==> props are only used to pass data from one component to another component React, but only from parent to child components down the component tree.
 5 ==> lifecycle methods Just "componentDidMount()" method use to ({fech Date})
*/
import React, {Component} from 'react';
import {useState} from 'react';
import './App.css';

const DEFAULT_QUERY = 'javascript';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// URL 
const url =  `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

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


// now we use (functional stateless component) instead of (ES6 class components)
const Search = ({value, onChange,onSubmit, children}) => // ({this.Props})
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
        <button type='submit'>
          {children}
        </button>
      </form>

const Loading = () =>
<div> 
<h1 className='loading'>Waite MotherFuckr</h1>
</div>

const Table = ({list, onDismiss, plusPoints}) => 
      <div className='table'>
        {list.map(item => 
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

const Button = ({onClick, className='', children}) =>
      <button
        onClick={onClick}
        className={className}
        type='button'
      >
        {children}
      </button>


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  // it's for change the value of searchTerm depending on the input field value
  setSearchTopStories(result) {
    this.setState({ result })
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(Response => Response.json()) // trabnsform the response to JSON data structure
    .then(result => this.setSearchTopStories(result)) // set the JSON data as a result in the local component state
    .catch(error => error) // if an error occurs
  }

  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault();
  }
  
  componentDidMount() {
    const { searchTerm } = this.state
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
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    })
  }

  render() {
    const {result, searchTerm} = this.state;
    console.log('Render()')

    // if(!result) {return <Loading />;}

    return (
      <div className='page' >
      <div className='interactions'>
        <Search
          value={searchTerm} // value proparte
          onChange={this.onSearchChange} // onChange proparte
          onSubmit={this.onSearchSubmit}
        >
        Search
        </Search>
      </div>
      {result ?
        <Table
          list={result.hits} // list proparte
          onDismiss={this.onDismiss} // onDismiss proparte
          // plusPoints={this.plusPoints}
        /> :
        <Loading />
        }
        <Test />
      </div>
    )
  }
}

export default App;