import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Header } from 'semantic-ui-react'
import DateRangePickerField from './check-in-date-picker'

const roomSizes = [
  { key: '0', text: 'Please select room size', value: null },
  { key: '1', text: 'Single', value: 'single' },
  { key: '2', text: 'Double', value: 'double' },
  { key: '3', text: 'Suite', value: 'suite' }
]
const required = value => value ? undefined : 'Required'

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
  <div className="field">
    <label>{label}{touched && error && <span className='span-error'> -> {error}</span>}
    </label>
    <div>
      <select {...input}>
        {children}
      </select>
    </div>
  </div>
)

const CheckInForm = (props) => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit} className="ui form">
      <Header as='h4'>Use our slick Date Range Picker</Header>
      <Field
        name='dateRangePicker'
        component={DateRangePickerField}
        validate={[required]}
      />
      <Header as='h4'>Pick the size of the room</Header>
      <Field
        validate={[required]}
        name="roomSize"
        component={renderSelectField}
        label="Room Size"
      >
        {roomSizes.map(option => <option key={option.key} value={option.value}>{option.text}</option>)}
      </Field>
      <Form.Button type="submit" disabled={pristine || submitting}>Submit</Form.Button>
    </form>
  )
}
export default reduxForm({
  form: 'checkInForm' // a unique identifier for this form
})(CheckInForm)