import React from 'react'
import { Field, reduxForm } from 'redux-form'

const required = value => value ? undefined : 'Required'
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength8 = minLength(8)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="field">
    <label>{label}{touched && ((error && <span className='span-error'> -> {error}</span>) || (warning && <span>{warning}</span>))}</label>
    <div className="ui fluid input">
      <input {...input} placeholder={label} type={type} />

    </div>
  </div>
)

const SignInForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="ui inverted segment">
      <form onSubmit={handleSubmit} className="ui inverted form">
        <div className="equal width fields">
          <Field name="email" type="email"
            component={renderField} label="Email"
            validate={[required, email]}
          />
          <Field name="password" type="password"
            component={renderField} label="Password"
            validate={[required, minLength8]}
          />
        </div>
        <button
          className="ui button"
          type="submit"
          disabled={submitting}
        >
          Submit
                </button>
        <button
          className="ui button"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
                </button>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(SignInForm)