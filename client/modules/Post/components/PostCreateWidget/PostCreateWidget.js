import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import PostContentEditor from './PostContentEditor';
import PostContentMap from './PostContentMap';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  addPost = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentValue = this.editorRef.getValue();
    const mapValue = this.mapRef.getValue();
    if (nameRef.value && titleRef.value && contentValue && mapValue) {
      const geolocation = {
        address: mapValue.addressName,
        location: {
          type: 'Point',
          coordinates: [
            mapValue.longitude,
            mapValue.latitude,
          ],
        }
      };
      this.props.addPost(nameRef.value, titleRef.value, contentValue, geolocation);
      nameRef.value = titleRef.value = '';

      this.editorRef.handleValueChange('');
      this.mapRef.setMarker({});
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;

    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="title" />
          {/* <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="content" /> */}
          <PostContentEditor
            ref={(ref) => {
              this.editorRef = ref;
            }}
          />
          <PostContentMap
            ref={(ref) => {
              this.mapRef = ref;
            }}
          />
          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostCreateWidget);
