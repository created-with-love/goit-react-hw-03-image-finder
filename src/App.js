import React, { Component } from 'react';
import './App.css';
import LoaderSpinner from './components/Loader';
import Seachbar from './components/Searchbar';
import Button from './components/Button';
import fetchGallery from './services/gallery-service';
import ImageGallery from './components/ImageGallery';
import Section from './components/Section';
import Modal from './components/Modal';

export default class App extends Component {
  state = {
    gallery: [],
    currentPage: 1,
    isLoading: false,
    search: '',
    error: null,
    selectedImgURL: '',
    isModalOpen: false,
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
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  hadleImageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    e.preventDefault();

    const fullImgLink = e.target.getAttribute('data-large');

    this.setState({
      selectedImgURL: fullImgLink,
      isModalOpen: true,
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    const {
      search,
      gallery,
      isLoading,
      selectedImgURL,
      isModalOpen,
    } = this.state;

    return (
      <>
        <Seachbar onSubmit={this.handleSubmit} />

        {isLoading && (
          <Section>
            <LoaderSpinner />
          </Section>
        )}

        {search && (
          <ImageGallery gallery={gallery} onClick={this.hadleImageClick} />
        )}

        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImgURL} alt="fullsizeImage"></img>
          </Modal>
        )}

        <Section>
          {!isLoading && search && <Button onClick={this.fetchPictures} />}
        </Section>
      </>
    );
  }
}
