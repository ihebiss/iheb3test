// ./hooks/useAuth.jsx
import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

const keycloak  = new Keycloak({
    url: "http://localhost:8080/",
    realm: "myrealm",
    clientId: "myhanen",
});

const useAuth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [roles, setRoles] = useState([]);
    const [userId, setUserId] = useState(null);
  
    useEffect(() => {
      const initKeycloak = async () => {
        try {
          const authenticated = await keycloak.init({
            onLoad: 'login-required',
            checkLoginIframe: false,
          });
  
          console.log('Authenticated:', authenticated);
  
          if (authenticated) {
            const fetchedToken = keycloak.token;
            const tokenParsed = keycloak.tokenParsed || {};
            const fetchedRoles = tokenParsed.realm_access?.roles || [];
            const userId = tokenParsed.sub;
  
            console.log('Fetched Token:', fetchedToken);
            console.log('Roles:', fetchedRoles);
            console.log('User ID:', userId);
  
            setToken(fetchedToken);
            setRoles(fetchedRoles);
            setUserId(userId);
            setIsLogin(true);
  
            localStorage.setItem('token', fetchedToken);
            localStorage.setItem('roles', JSON.stringify(fetchedRoles)); // Stockage correct des rôles
            localStorage.setItem('userId', userId);
  
            const refreshToken = async () => {
              try {
                await keycloak.updateToken(70);
                localStorage.setItem('token', keycloak.token);
                setToken(keycloak.token); 
              } catch (error) {
                console.error('Failed to refresh token', error);
              }
            };
  
            setInterval(refreshToken, 60000);
          } else {
            setIsLogin(false);
          }
        } catch (error) {
          console.error('Keycloak initialization failed:', error);
          setIsLogin(false);
        }
      };
  
      initKeycloak();
    }, []);
  
    return [isLogin, token, roles, userId];
  };
  
  
  export default useAuth;