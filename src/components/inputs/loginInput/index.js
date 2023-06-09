import './style.css';
import { ErrorMessage, useField } from 'formik';
import { useMediaQuery } from 'react-responsive';

export default function LoginInput({ bottom, ...params }) {
  const [field, meta] = useField(params);
  const desktopView = useMediaQuery({
    query: '(min-width: 850px)',
  });
  const largeScreenView = useMediaQuery({
    query: '(max-width: 1050px)',
  });

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView && largeScreenView && field.name === 'password'
              ? 'input_error input_error_desktop password_error'
              : desktopView
              ? 'input_error input_error_desktop'
              : 'input_error'
          }
          style={{ transform: 'translateY(3px)' }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={desktopView ? 'error_arrow_left' : 'error_arrow_top'}
          ></div>
        </div>
      )}

      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        {...field}
        {...params}
      />

      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView && largeScreenView && field.name === 'confirmPassword'
              ? 'input_error confirm_password_error'
              : desktopView
              ? 'input_error input_error_desktop'
              : 'input_error'
          }
          style={{ transform: 'translateY(2px)' }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={desktopView ? 'error_arrow_left' : 'error_arrow_bottom'}
          ></div>
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView ? '63%' : '15px'}` }}
        ></i>
      )}
    </div>
  );
}
