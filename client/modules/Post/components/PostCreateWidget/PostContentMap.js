import React, { Component } from 'react';
import MapGL, { NavigationControl, FlyToInterpolator, Marker } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import isEmpty from 'lodash.isempty';
import debounce from 'lodash.debounce';
// import MatGeocoder from 'react-mui-mapbox-geocoder';
// import for use with developing component from copy of source.
import MatGeocoder from 'react-mui-mapbox-geocoder';
import styles from './PostCreateWidget.css';
import { fromJS } from 'immutable';
import { Place } from '@material-ui/icons';

import MAP_STYLE from '../../../../util/map-style-basic-v8.json';

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
const defaultMapStyle = fromJS(MAP_STYLE);

class PostContentMap extends Component {
  state = {
    viewport: {
      width: 600,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
    marker: {},
  };

  onViewportChange = (viewport) => {
    this.setState({ viewport });
  };

  getValue = () => this.state.marker;

  setMarker = debounce((marker) => this.setState({ marker }), 4000);

  handleGeocoderSelect = (result) => {
    const viewport = {
      ...this.state.viewport,
      longitude: result.center[0],
      latitude: result.center[1],
      zoom: 18,
      transitionDuration: 4000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    };
    const marker = {
      longitude: result.center[0],
      latitude: result.center[1],
      addressName: result.place_name,
    };
    this.onViewportChange(viewport);
    this.setMarker(marker);
  };


  render() {
    return (
      <div className="content-map-container">
        <MapGL
          {...this.state.viewport}
          mapboxApiAccessToken={'pk.eyJ1IjoiYWJhc2NvbiIsImEiOiJjanFxYjM0N2kwN3l5NDhxb2o0aWpzYmh4In0.LihBvg8hVAsjKm0JtSuOVQ'}
          onViewportChange={this.onViewportChange}
          mapStyle={defaultMapStyle}
        >
          <div className={styles['map-geocoder']}>
            <MatGeocoder
              inputPlaceholder="Search Address"
              accessToken={'pk.eyJ1IjoiYWJhc2NvbiIsImEiOiJjanFxYjM0N2kwN3l5NDhxb2o0aWpzYmh4In0.LihBvg8hVAsjKm0JtSuOVQ'}
              onSelect={(result) => this.handleGeocoderSelect(result)}
              showLoader
              inputPaperProps={{ square: true }}
              suggestionsPaperProps={{ square: true }}
            />
          </div>
          <div className={styles['map-navControls']}>
            <NavigationControl onViewportChange={this.onViewportChange} />
          </div>
          {!isEmpty(this.state.marker) &&
            <Marker
              latitude={this.state.marker.latitude}
              longitude={this.state.marker.longitude}
            >
              <Place className={styles['map-marker']} />
              <div className={styles['map-marker-info']}>
                You are here
              </div>
            </Marker>
          }
        </MapGL>
      </div>
    );
  }
}

export default PostContentMap;
