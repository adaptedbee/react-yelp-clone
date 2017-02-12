import React from 'react'
import ReactDOM from 'react-dom'

import styles from './styles.module.css'

const App = React.createClass({
  render: function() {
    return (
      <div className={styles.wrapper}>
        <i className="fa fa-star"></i>
        Text text text
      </div>
    )
  }
});

module.exports = App;