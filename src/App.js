import React, { Component } from 'react';
import './App.css';
import LoaderSpinner from './components/Loader';
import Seachbar from './components/Searchbar';
import Button from './components/Button';
import fetchGallery from './services/gallery-service';
import ImageGallery from './components/ImageGallery';

export default class App extends Component {
  state = {
    gallery: [],
    currentPage: 1,
    isLoading: false,
    search: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchPictures();
    }
  }

  fetchPictures = () => {
    const { search, currentPage } = this.state;
    this.setState({ isLoading: true });

    fetchGallery(search, currentPage)
      .then(images => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.onLoadMoreBtnClick();
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = query => {
    if (query !== this.state.search) {
      this.setState({
        gallery: [],
        search: query,
        currentPage: 1,
      });
    }
  };

  onLoadMoreBtnClick = () => {
    if (this.state.currentPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { search, gallery, isLoading } = this.state;

    return (
      <>
        <Seachbar onSubmit={this.handleSubmit} />
        <LoaderSpinner visible={isLoading} />

        {search && <ImageGallery gallery={gallery} />}

        <div className="container">
          {search && <Button onClick={this.fetchPictures} />}
        </div>
      </>
    );
  }
}
