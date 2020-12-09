import React, { Component } from 'react';
import './Searchbar.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import logo from '../../icons/sns.svg';
import { FaSearchengin } from 'react-icons/fa';
import { IconContext } from 'react-icons';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({
      query: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    if (!query) {
      error('Search field is empty!');
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className="Searchbar">
        <div className="logobox">
          <IconContext.Provider
            value={{ color: 'black', size: '1.5em', className: 'react-icons' }}
          >
            <div>
              <FaSearchengin />
            </div>
          </IconContext.Provider>
          <span className="logobox__text">Search and Save</span>
        </div>
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={query}
            className="SearchForm-input"
            name="form_input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
