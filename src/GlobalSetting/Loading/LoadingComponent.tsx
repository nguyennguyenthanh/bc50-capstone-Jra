import React, { Component } from 'react'
import styleLoading from './Loading.module.css';
import Loading from './../../assets/images/loading.gif';

export default class LoadingComponent extends Component {
  render() {
    return (
      <div className={styleLoading.bgLoading}>
        <img src={Loading} alt="Loading......" />
      </div>
    )
  }
}
