import React, { Component } from 'react';
import PopularSearch from './components/PopularSearch';
import SearchHistory from './components/SearchHistory';
import SearchBox from './components/SearchBox'

class Search extends Component {
  render() {
    return (
      <div>
        <SearchBox/>
        <PopularSearch/>
        <SearchHistory/>
      </div>
    );
  }
}

export default Search;