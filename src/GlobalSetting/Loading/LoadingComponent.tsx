import React, { Component } from 'react'
import styleLoading from './Loading.module.css';
import Loading from './../../assets/images/Loading.png';

export default class LoadingComponent extends Component {
  render() {
    return (
      <div className={styleLoading.bgLoading}>
        <img src={Loading} alt="Loading......" />
      </div>
    )
  }
}
