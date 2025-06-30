// import React from 'react';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';  // Default import for jwt-decode

// function Googlepage() {
//   const handleSuccess = (response) => {
//     try {
//       // Decode the JWT token from the credential
//       const decoded = jwt_decode(response.credential);  // Use jwt_decode here
//       console.log('Login Success:', decoded);  // Log the decoded JWT to the console
//     } catch (error) {
//       console.error('Error decoding JWT:', error);
//     }
//   };

//   const handleError = () => {
//     console.log('Login Failed');
//   };

//   return (
//     <GoogleOAuthProvider clientId="9241649200-m7rkabh6ifrrgi42a8l8ed95mdj8cg0h.apps.googleusercontent.com">
//       <div>
//         <h1>Google Authentication in React</h1>
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// export default Googlepage;
