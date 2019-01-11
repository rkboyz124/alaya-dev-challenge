import React, { Component } from 'react';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import PropTypes from 'prop-types';
import {
  FormatBold,
  FormatSize,
  FormatItalic,
  FormatStrikethrough,
  FormatQuote,
  Code,
  InsertPhoto,
  InsertLink,
  FormatListBulleted,
  FormatListNumbered,
  Check,
} from '@material-ui/icons';

import styles from './PostCreateWidget.css';

const icons = {
  bold: <FormatBold className={styles['nav-button-icons']} />,
  heading: <FormatSize className={styles['nav-button-icons']} />,
  italic: <FormatItalic className={styles['nav-button-icons']} />,
  strikethrough: <FormatStrikethrough className={styles['nav-button-icons']} />,
  link: <InsertLink className={styles['nav-button-icons']} />,
  'quote-right': <FormatQuote className={styles['nav-button-icons']} />,
  code: <Code className={styles['nav-button-icons']} />,
  image: <InsertPhoto className={styles['nav-button-icons']} />,
  'list-ul': <FormatListBulleted className={styles['nav-button-icons']} />,
  'list-ol': <FormatListNumbered className={styles['nav-button-icons']} />,
  tasks: <Check className={styles['nav-button-icons']} />,
};

const iconProvider = name => icons[name] || '❓';

class PostContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.placeholder,
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
      noHeaderId: true,
      headerLevelStart: 3,
      smoothLivePreview: true,
      simpleLineBreaks: true,
    });
  }

  getValue = () => this.state.value;

  handleValueChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="container">
        <ReactMde
          className={styles['editor-layout']}
          buttonContentOptions={{ iconProvider }}
          onChange={this.handleValueChange}
          value={this.state.value}
          style={{

          }}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
      </div>
    );
  }
}

PostContentEditor.propTypes = {
  placeholder: PropTypes.string,
};

export default PostContentEditor;
