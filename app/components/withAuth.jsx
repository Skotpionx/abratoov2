// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import NavImage from './navImage';
// import Loading from './loading';
// import '../styles/authBox.css'

// const withAuth = (WrappedComponent) => {
//   const AuthenticationWrapper = (props) => {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//       const checkAuthStatus = async () => {
//         const API_URL = process.env.NEXT_PUBLIC_API_URL;
//         try {
//           const response = await axios.get(`${API_URL}/auth/status`, {
//             withCredentials: true,
//           });
//           const isUserLogged = response.data.isAuthenticated;
//           if (!isUserLogged) {
//             router.replace('/auth'); // Usar replace en lugar de push
//           } else {
//             setIsLoading(false);
//           }
//         } catch (error) {
//           console.log(error);
//           router.replace('/auth'); // Usar replace en caso de error
//         }
//       };
//       checkAuthStatus();
//     }, []);

//     if (isLoading) {
//         return (
//             <>
//                 <NavImage/>
//                 <Loading/>
//             </>
//         );
        
//     }
    
//     return <WrappedComponent {...props} />;
//   };

//   return AuthenticationWrapper;
// };

// export default withAuth;
