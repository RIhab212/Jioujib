import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
    state = {
        showMap: false
    }

    handleMapClick = () => {
        this.setState({ showMap: true });
    }

    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap defaultCenter={{ lat: 40.756795, lng: -73.954298 }} defaultZoom={13}>
                <Marker position={{ lat: 40.756795, lng: -73.954298 }} />
            </GoogleMap>
        ));

        return (
            <div>
                <i className="fas fa-map-marker-alt" onClick={this.handleMapClick}></i>
                {this.state.showMap && (
                    <div style={{ height: '200px', width: '900%' }}>
                        <GoogleMapExample
                            containerElement={<div style={{ height: '100%' }} />}
                            mapElement={<div style={{ height: '100%' }} />}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default Map;
