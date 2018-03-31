import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'
import { DatePickerField } from './date-picker-field'
import RegionPickerField from './region-picker-field'
import moment from 'moment';

const gender = [
  { key: '0', text: 'Please select gender', value: null },
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]
const required = value => value ? undefined : 'Required'
// const maxLength = max => value =>
//     value && value.length > max ? `Must be ${max} characters or less` : undefined
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength8 = minLength(8)
// const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
// const minValue = min => value =>
//     value && value < min ? `Must be at least ${min}` : undefined
// const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined
// const tooOld = value =>
//     value && value > 65 ? 'You might be too old for this' : undefined
// const aol = value =>
//     value && /.+@aol\.com/.test(value) ?
//         'Really? You still use AOL for your email?' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="field">
    <label>{label}{touched && ((error && <span className='span-error'> -> {error}</span>) || (warning && <span>{warning}</span>))}</label>
    <div className="ui fluid input">
      <input {...input} placeholder={label} type={type} />
    </div>
  </div>
)

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
  <div className="field">
    <label>{label}{touched && error && <span className='span-error'> -> {error}</span>}
    </label>
    <div>
      <select {...input} >
        {children}
      </select>
    </div>
  </div>
)

const SignUpForm = (props) => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit} className="ui form">
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
        validate={[required]}
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
        validate={[required]}
      />
      <Field
        validate={[required]}
        name="gender"
        component={renderSelectField}
        label="Gender">
        {gender.map(option => <option key={option.key} value={option.value}>{option.value}</option>)}
      </Field>
      <Field
        validate={[required]}
        id="dateOfBirth"
        name="dateOfBirth"
        type="text"
        label="Date of birth"
        placeholder="Please select date of birth"
        component={DatePickerField}
        dateFormat='YYYY-MM-DD'
        normalize={value => (value ? moment(value).format('DD/MM/YYYY') : null)}
      />
      <Field
        validate={[required]}
        name='country'
        component={RegionPickerField}
      />
      <Field
        name="tel"
        type="tel"
        component={renderField}
        label="Phone Number"
        validate={[required, number]}
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
        validate={[required, email]}
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
        validate={[required, minLength8]}
      />
      <Form.Button type="submit" disabled={pristine || submitting}>Submit</Form.Button>
    </form>
  )
}
export default reduxForm({
  form: 'signUpForm'
})(SignUpForm)