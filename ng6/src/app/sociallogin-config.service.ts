import { AuthServiceConfig, FacebookLoginProvider } from "angular-6-social-login"; 

export function getAuthServiceConfigs() 
{
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("{FACEBOOK_APP_ID_HERE}")
    }
  ]);
   return config;
}