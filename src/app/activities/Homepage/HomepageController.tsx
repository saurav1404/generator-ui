import * as image from 'assets/emoji.gif';
import * as React from 'react';
import Homepage from './Homepage';
import * as styles from './Homepage.css';

export default function HomepageController() {
  return (
    <Homepage classNames={styles} image={image as any} />
  );
}
