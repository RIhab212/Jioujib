import React, {Component} from 'react';
import Geocode from "react-geocode";
import "./Location.css"
import map from './icone map.png';


class MapButton extends Component {


    constructor(props) {
        super(props);
        this.state = {
            location: '',
            map: null,
            isIconClicked: false,
            isMapOpen: false,
            showModal: false,
            manualLocation: '',
        };
        this.mapRef = React.createRef();
    }


    componentDidMount() {
        const googleMapsScript = document.createElement('script');
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyAzQNb5184qb5WduzPMHjRhqjycSmNixqE"}&libraries=places&region=MA`;

        window.document.body.appendChild(googleMapsScript);
        googleMapsScript.addEventListener('load', () => {
            this.initMap();
        });
    }

    initMap = () => {
        if (this.mapRef.current) { // Supprimer la condition isIconClicked
            const map = new window.google.maps.Map(this.mapRef.current, {
                center: {lat: 31.7917, lng: -7.0926},
                zoom: 7
            });
            const input = document.getElementById('location');
            input.addEventListener("input", this.handleInputChange);

            const options = {
                componentRestrictions: {country: "MA"},
                types: ["geocode"]
            };

            const autocomplete = new window.google.maps.places.Autocomplete(input, options);
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place && place.geometry) {
                    const location = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`;
                    this.setState({location});
                }
                // Mise à jour de la valeur de l'input avec la sélection de l'utilisateur
                const selectedPlace = autocomplete.getPlace();
                if (selectedPlace && selectedPlace.formatted_address) {
                    const selectedLocation = selectedPlace.formatted_address;
                    this.setState({location: selectedLocation, inputText: selectedLocation});
                }
            });

            this.setState({map, isMapOpen: true});
        }
    };

    handleIconClick = () => {
        if (this.state.isMapOpen) {
            this.setState({isMapOpen: false, isIconClicked: false});
        } else {
            this.setState({isIconClicked: true}, () => {
                this.initMap();
                this.toggleModal(); // Ouvrir le modal lorsque l'icône est cliquée
            });
        }
    };
    handleManualInputChange = (event) => {
        const manualLocation = event.target.value;
        this.setState({manualLocation});
    };
    handleInputChange = (event) => {
        const inputText = event.target.value;
        this.setState({inputText});
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
            {
                input: inputText,
                componentRestrictions: {country: "MA"}
            },
            (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions && predictions.length > 0) {
                    const searchTerm = inputText.toLowerCase();
                    const filteredLocations = predictions.filter(prediction => prediction.description.toLowerCase().startsWith(searchTerm));
                    const suggestedLocations = filteredLocations.map(prediction => prediction.description);
                    console.log(suggestedLocations);
                    // Faites quelque chose avec les suggestions de localisation filtrées

                    // Si vous avez besoin de mettre à jour la valeur de l'input avec la première suggestion
                    if (suggestedLocations.length > 0) {
                        const selectedLocation = suggestedLocations[0];
                        this.setState({location: selectedLocation});
                    }
                }
            }
        );
    };

    reverseGeocode = (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({location: {lat, lng}}, (results, status) => {
            if (status === 'OK' && results[0]) {
                this.setState({location: results[0].formatted_address, isMapOpen: false});
            } else {
                alert('Impossible de trouver l\'adresse correspondante à cette localisation.');
            }
        });
    };

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert('La géolocalisation n\'est pas prise en charge par ce navigateur.');
        }
    };

    showPosition = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geocoder = new window.google.maps.Geocoder();
        const location = new window.google.maps.LatLng(latitude, longitude);

        geocoder.geocode({location}, (results, status) => {
            if (status === 'OK' && results[0]) {
                this.setState({location: results[0].formatted_address});
            } else {
                alert("Impossible de trouver l'adresse correspondante à cette localisation.");
            }
        });

        const map = this.state.map;
        if (map) {
            map.setCenter({lat: latitude, lng: longitude});
            const marker = new window.google.maps.Marker({
                position: {lat: latitude, lng: longitude},
                map
            });
        }
        this.setState({isMapOpen: false});
    }

    toggleModal = () => {
        this.setState(prevState => ({showModal: !prevState.showModal}), () => {
            if (this.state.showModal) {
                this.initMap();
            }
        });
    };

    render() {
        return (
            <div>


                <div className="input-with-icon">
                    <input
                        type="text"
                        id="location"
                        placeholder="Localisation"
                        value={this.state.location}
                        value={this.state.manualLocation}
                        onChange={this.handleManualInputChange}
                        required
                        className="l"
                    />

                    <span className="icone">
                         <img src={map} className='imgLoc' alt="Icone" onClick={this.handleIconClick}/>
  </span>
                </div>
                {/* ... */}
                {this.state.showModal && (
                    <div className="modal">
                        <div className="modal-content">
              <span className="close-button" onClick={this.toggleModal}>
                &times;
              </span>
                            <h4>Add a shipping address </h4>
                            <div className="map-container">
                                <div
                                    ref={this.mapRef}
                                    style={{
                                        height: '400px',
                                        width: '100%',
                                        display: this.state.showModal ? 'block' : 'none'
                                    }}
                                />
                            </div>
                            <button onClick={this.getLocation} className="red-button">Obtenir ma position</button>

                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default MapButton;


