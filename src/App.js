import React, { Component } from 'react';
import './App.css';
import LoaderSpinner from './components/Loader';
import Button from './components/Button';

const API_KEY = '18944189-177b692c9d9a1e8dfd1f135d6';
const BASE_URL = 'https://pixabay.com/api/';

export default class App extends Component {
  state = {
    galery: [],
    isLoaderVisible: false,
    page: 1,
  };

  toggleLoader = () => {
    this.setState({
      isLoaderVisible: !this.state.isLoaderVisible,
    });
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  onLoadMoreBtnClick = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
    console.log(this.state.page);
  };

  render() {
    const isThereMoreThanOnePage = false;
    return (
      <>
        {isThereMoreThanOnePage && <Button onClick={this.onLoadMoreBtnClick} />}
      </>
    );
  }
}
