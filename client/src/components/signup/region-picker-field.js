import React from 'react';
import { CountryDropdown } from 'react-country-region-selector';


class RegionPickerField extends React.Component {
  constructor (props) {
    super(props);
    this.state = { 
        country: '',
        region: '',
        onChangeMethod: props.input.onChange 
    };
    this.selectCountry = this.selectCountry.bind(this)
    
  }

  selectCountry (val) {    
    this.setState({ country: val });    
  }
  handleCountryChange(e) {
      this.selectCountry(e)
      this.state.onChangeMethod(e)
  }  
 
  
  render () { 
    const { 
        meta: { 
          error,
          touched 
        }        
      } = this.props     
    const { country } = this.state;
    return (
        <div className='field'>
            <label>Country{touched && error && <span className='span-error'> -> {error}</span>}</label>
            <CountryDropdown
              value={country}
              onChange={e => this.handleCountryChange(e) }
              name='country'            />            
          </div>
    );
  }
}

export default RegionPickerField;