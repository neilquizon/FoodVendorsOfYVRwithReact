import React, { Component } from 'react';
import { GoogleMap, withScriptjs,withGoogleMap } from "react-google-maps";

function Map() {
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 49.2820, lng: -123.1171 }}
            />
        );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor (props) {
    super(props);
      this.state = { foodVendors: [], loading: true };
      this.onSortChange = this.onSortChange.bind(this);
      fetch('api/FoodVendor/FoodVendors')
      .then(response => response.json())
          .then(data => {
              this.setState({ foodVendors: data, loading: false, nameSort: 'asc', descriptionSort:'asc' });
      });
    }
    onSortChange(sortParam) {
        let sortedVendors;
        if (sortParam === "name") {
            if (this.state.nameSort === 'asc') {
                this.setState({ nameSort: 'desc', descriptionSort: 'asc' });
                sortedVendors = this.state.foodVendors.sort(function (a, b) {
                    return (a.business_name === null) - (b.business_name === null) || +(a.business_name > b.business_name) || -(a.business_name < b.business_name)
                });
            } else {
                this.setState({ nameSort: 'asc', descriptionSort: 'asc' });
                sortedVendors = this.state.foodVendors.sort(function (a, b) {
                    return (a.business_name === null) - (b.business_name === null) || -(a.business_name > b.business_name) || +(a.business_name < b.business_name)
                });
            }
            }else {
            if (this.state.descriptionSort === 'asc') {
                this.setState({ nameSort: 'asc', descriptionSort: 'desc' });
                sortedVendors = this.state.foodVendors.sort(function (a, b) {
                    return (a.description === null) - (b.description === null) || +(a.description > b.description) || -(a.description < b.description)
                });
            } else {
                this.setState({ nameSort: 'asc', descriptionSort: 'asc' });
                sortedVendors = this.state.foodVendors.sort(function (a, b) {
                    return (a.description === null) - (b.description === null) || -(a.description > b.description) || +(a.description < b.description)
                });
            }
            
        }
        this.setState({ foodVendors: sortedVendors });
    }

  renderFoodVendorsTable (foodVendors) {
    return (
      <table className='table table-striped'>
        <thead>
                <tr>
                    <th onClick={() => this.onSortChange('name')}>Name</th>
                    <th onClick={() => this.onSortChange('description')}>Description</th>
            <th>Longitude (F)</th>
            <th>Latitude</th>
          </tr>
        </thead>
        <tbody>
                {foodVendors.map(vendor =>
            <tr key={vendor.key}>
             <td>{vendor.business_name}</td>
             <td>{vendor.description}</td>
             <td>{vendor.longitude}</td>
             <td>{vendor.latitude}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : this.renderFoodVendorsTable(this.state.foodVendors);

    return (
      <div>
        <h1>Food Vendors</h1>
            <WrappedMap
                googleMapURL={https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}`}
                loadingElement={<div style={{height: '100%'}}/>}
                    containerElement={< div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: '100%' }} />}

            />
        {contents}
      </div>
    );
  }
}
