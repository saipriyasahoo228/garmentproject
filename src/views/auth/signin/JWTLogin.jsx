// import React from 'react';
// import { Row, Col, Alert, Button } from 'react-bootstrap';
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// const JWTLogin = () => {
//   return (
//     <Formik
//       initialValues={{
//         email: 'info@codedthemes.com',
//         password: '123456',
//         submit: null
//       }}
//       validationSchema={Yup.object().shape({
//         email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//         password: Yup.string().max(255).required('Password is required')
//       })}
//     >
//       {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//         <form noValidate onSubmit={handleSubmit}>
//           <div className="form-group mb-3">
//             <input
//               className="form-control"
//               label="Email Address / Username"
//               name="email"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               type="email"
//               value={values.email}
//             />
//             {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
//           </div>
//           <div className="form-group mb-4">
//             <input
//               className="form-control"
//               label="Password"
//               name="password"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               type="password"
//               value={values.password}
//             />
//             {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
//           </div>

//           <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
//             <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
//             <label className="custom-control-label" htmlFor="customCheck1">
//               Save credentials.
//             </label>
//           </div>

//           {errors.submit && (
//             <Col sm={12}>
//               <Alert>{errors.submit}</Alert>
//             </Col>
//           )}

//           <Row>
//             <Col mt={2}>
//               <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
//                 Signin
//               </Button>
//             </Col>
//           </Row>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default JWTLogin;



// import React ,  { useState } from 'react';
// import { Row, Col, Alert, Button } from 'react-bootstrap';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import { useNavigate, } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {setRole, setUserInfo} from '../../../store';
// import {getLoggedInUserInfo, login} from '../../../auth';
// // import React, { useState } from 'react';

// const JWTLogin = () => {
//   const navigate = useNavigate(); // To navigate after login
//   const dispatch = useDispatch();

  
//   return (
//     <div style={{ 
//       backgroundColor: '#d8dede', 
//       backgroundImage: 'linear-gradient(315deg, #d8dede 0%, #e5bdf6 74%)', 
//       border:'none',
//       outline:'none'
//     }}>
//       <Formik
//         initialValues={{
//           username: 'user123',
//           password: '123456',
//           submit: null
//         }}
//         validationSchema={Yup.object().shape({
//           username: Yup.string().max(255).required('Username is required'),
//           password: Yup.string().max(255).required('Password is required')
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//           // Simulate login
//           setTimeout(() => {
//             console.log(values);
//             setSubmitting(false);
//             // Navigate to dashboard after login
//             navigate('/app/dashboard/default');
//           }, 1000);
//         }}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <input
//                 className="form-control"
//                 label="Username"
//                 name="username"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 type="text"
//                 value={values.username}
//               />
//               {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
//             </div>
//             <div className="form-group mb-4">
//               <input
//                 className="form-control"
//                 label="Password"
//                 name="password"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 type="password"
//                 value={values.password}
//               />
//               {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
//             </div>

//             <div className="custom-control custom-checkbox text-start mb-4 mt-2">
//               <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
//               <label className="custom-control-label" htmlFor="customCheck1">
//                 Save credentials.
//               </label>
//             </div>

//             {errors.submit && (
//               <Col sm={12}>
//                 <Alert>{errors.submit}</Alert>
//               </Col>
//             )}

//             <Row>
//               <Col mt={2}>
//                 <Button
//                   className="btn-block mb-4"
//                   style={{ backgroundColor: '#6f1d99', borderColor: '#6f1d99' }} // Purple color
//                   disabled={isSubmitting}
//                   size="large"
//                   type="submit"
//                   variant="primary"
//                 >
//                   Sign In
//                 </Button>
//               </Col>
//             </Row>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default JWTLogin;
import React, { useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole, setUserInfo } from '../../../store';
import { login } from '../../../auth';

const JWTLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMessage, setLoginMessage] = useState(null); // State for the success message

  return (
    <div style={{ 
      backgroundColor: '#d8dede', 
      backgroundImage: 'linear-gradient(315deg, #d8dede 0%, #e5bdf6 74%)', 
      border: 'none',
      outline: 'none'
    }}>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await login(values.username, values.password);
            console.log("Login Response:", response);

            // Extract data from the response
            const { msg, user, Token } = response;
            const { access, refresh } = Token;
            
            // Determine the role based on the boolean is_admin
            const role = user.is_admin ? 'is_admin' : 'OPERATOR_ROLE';

            // Log token and role
            console.log("Access Token:", access);
            console.log("Refresh Token:", refresh);
            console.log("Role:", role);

            // Dispatch to Redux store
            dispatch(setUserInfo(user));
            dispatch(setRole(role));

            // Store the token in localStorage for session persistence
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            // Set the login success message
            setLoginMessage(msg); // Show success message

            // Navigate based on role
            if (user.is_admin) {
              navigate('/app/dashboard/default');
            } else {
              navigate('/appsidebar1');
            }
          } catch (error) {
            if (error.response) {
              setErrors({ submit: 'Login failed. Please check your credentials.' });
            } else {
              setErrors({ submit: 'Network error occurred. Please try again later.' });
            }
            console.error('Error logging in:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {loginMessage && (
              <Alert variant="success" onClose={() => setLoginMessage(null)} dismissible>
                {loginMessage}
              </Alert>
            )}

            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                id="username"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.username}
              />
              {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                id="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>

            <div className="custom-control custom-checkbox text-start mb-4 mt-2">
              <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Save credentials.
              </label>
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            <Row>
              <Col mt={2}>
                <Button
                  className="btn-block mb-4"
                  style={{ backgroundColor: '#6f1d99', borderColor: '#6f1d99' }}
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="primary"
                >
                  Sign In
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default JWTLogin;
