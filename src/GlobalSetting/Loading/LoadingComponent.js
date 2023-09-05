import React, { Component } from 'react'
import styleLoading from './Loading.module.css';

export default class LoadingComponent extends Component {
  render() {
    return (
      <div className={styleLoading.bgLoading}>
        <img src="./images/loading.gif" alt="Loading......" />
      </div>
    )
  }
}
