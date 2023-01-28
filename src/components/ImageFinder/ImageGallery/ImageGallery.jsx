import React from 'react';
// import axios from 'axios';
// import css from 'components/ImageFinder/imagefinder.module.css';
import ImageGalleryItem from 'components/ImageFinder/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/ImageFinder/Loader/Loader';
import Button from 'components/ImageFinder/Button/Button';

import { searchPosts } from 'shared/services/posts-api';

class ImageGallery extends React.Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      this.setState({ images: [], page: 1 });
    }
    if (
      prevProps.filter !== this.props.filter ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      searchPosts(this.props.filter, this.state.page)
        .then(data => {
          this.setState(({ images }) => ({
            images: [...images, ...data.hits],
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    console.log('Выполнилась функция');
  };

  render() {
    const { images, loading, error } = this.state;
    // console.log(images);
    return (
      <>
        {error && <h2>{error.message}</h2>}
        {loading && <Loader />}
        {images.length > 0 && <ImageGalleryItem items={images} />}
        {Boolean(images.length) && <Button onLoadMore={this.loadMore} />}
      </>
    );
  }
}

export default ImageGallery;
