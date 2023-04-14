import { Form, Formik } from 'formik';
import { useState } from 'react';
import RegisterInput from '../inputs/registerInput';
import * as Yup from 'yup';

export default function RegisterForm() {
  const registerInfos = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };

  const [register, setRegister] = useState(registerInfos);
  const { firstName, lastName, email, password, bYear, bMonth, bDay, gender } =
    register;

  const handleRegisterChange = (eve) => {
    const { name, value } = eve.target;
    setRegister({ ...register, [name]: value });
  };

  const years = Array.from(
    new Array(100),
    (val, index) => new Date().getFullYear() - index
  );

  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const totalDaysInMonth = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(
    new Array(totalDaysInMonth()),
    (val, index) => 1 + index
  );

  const registerValidation = Yup.object({
    firstName: Yup.string()
      .required("What's your name?")
      .min(3, 'First name must be at least 3 characters long.')
      .max(30, 'First name must be at most 30 characters long.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    lastName: Yup.string()
      .required("What's your name?")
      .min(3, 'Last name must be at least 3 characters long.')
      .max(30, 'Last name must be at most 30 characters long.')
      .matches(
        /^[aA-zZ\s]+$/,
        'Numbers and special characters are not allowed. White space is allowed.'
      ),
    email: Yup.string()
      .required(
        "You'll use this when you log in and if you ever need to reset your password."
      )
      .email('Please enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters long.')
      .max(50, 'Password must be at most 50 characters long.'),
  });

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy.</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="lastName"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="email"
                  placeholder="Email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select
                    name="bDay"
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day, index) => (
                      <option value={day} key={index}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bMonth"
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month, index) => (
                      <option value={month} key={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bYear"
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year, index) => (
                      <option value={year} key={index}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Privacy Policy &nbsp;</span>
                and <span>Cookies Policy</span>. You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}