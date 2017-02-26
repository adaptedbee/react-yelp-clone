import React, { PropTypes as T } from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import {searchNearby} from 'utils/googleApiHelpers';

import Header from 'components/Header/Header';
import styles from './styles.module.css';

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null
    }
  }
  renderChildren() {
    const childProps = {
      ...this.props
    };
    const {children} = this.props;
    return React.Children.map(children,
              c => React.cloneElement(c, childProps));
  }
  onReady(mapProps, map) {
    // When the map is ready and mounted
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    };
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        // We got some results and a pagination object
        this.setState({
          places: results,
          pagination
        });
      }).catch((status, result) => {
        // There was an error
      });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <Map
          google={this.props.google}
          onReady={this.onReady.bind(this)}
          visible={false}>

          {this.state.places.map(place => {
            return (<div key={place.id}>{place.name}</div>)
          })}

        </Map>
        <Header tite="play" />
        <div className={styles.content}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyASazw-8gBIeMf833apXVerbelOLWvMoa4'
})(Container);
