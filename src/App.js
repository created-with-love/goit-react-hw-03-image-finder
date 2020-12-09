import React, { Component } from 'react';
import './App.css';
import LoaderSpinner from './components/Loader';
import Seachbar from './components/Searchbar';
import Button from './components/Button';
import fetchGallery from './services/gallery-service';
import ImageGallery from './components/ImageGallery';
import Section from './components/Section';
import Modal from './components/Modal';
import authContext from './components/Context';
import 'lazysizes';

export default class App extends Component {
  state = {
    gallery: [],
    currentPage: 1,
    isLoading: false,
    search: '',
    error: null,
    selectedImgURL: '',
    selectedLowQImgUrl: '',
    isModalOpen: false,
    hadleImageClick: e => {
      if (e.target.nodeName !== 'IMG') {
        return;
      }

      e.preventDefault();
      const fullImgLink = e.target.getAttribute('data-large');
      this.setState({
        selectedImgURL: fullImgLink,
        isModalOpen: true,
      });
    },
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
        error: null,
      });
    }
  };

  onLoadMoreBtnClick = () => {
    if (this.state.currentPage > 2) {
      const options = {
        top: null,
        behavior: 'smooth',
      };

      options.top = window.pageYOffset + document.documentElement.clientHeight;
      setTimeout(() => {
        window.scrollTo(options);
      }, 1000);
    }
  };

  hadleImageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    e.preventDefault();

    const fullImgLink = e.target.getAttribute('data-large');
    const lowSrc = e.target.getAttribute('src');

    this.setState({
      selectedImgURL: fullImgLink,
      selectedLowQImgUrl: lowSrc,
      isModalOpen: true,
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });

    if (this.state.isModalOpen) {
      document.body.style.overflowY = 'hidden';
    }
  };

  render() {
    const {
      search,
      gallery,
      isLoading,
      selectedImgURL,
      isModalOpen,
      hadleImageClick,
      selectedLowQImgUrl,
    } = this.state;

    return (
      <>
        <Seachbar onSubmit={this.handleSubmit} />

        {isLoading && (
          <Section>
            <LoaderSpinner />
          </Section>
        )}

        <authContext.Provider value={hadleImageClick}>
          {search && <ImageGallery gallery={gallery} />}
        </authContext.Provider>

        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img
              src={selectedLowQImgUrl}
              data-src={selectedImgURL}
              alt="fullsizeImage"
              className="lazyload blur-up"
            ></img>
          </Modal>
        )}

        <Section>{search && <Button onClick={this.fetchPictures} />}</Section>
      </>
    );
  }
}
