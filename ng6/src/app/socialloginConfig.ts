import {
    AuthServiceConfig,
    FacebookLoginProvider,
    GoogleLoginProvider
} from "angular-6-social-login";
import{Socialconfig} from "./constant/socialconfig";
export function getAuthServiceConfigs() {
    let socialconfig=new Socialconfig();
    let config = new AuthServiceConfig([
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(socialconfig.facebookId)
        },
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
                socialconfig.googleId
            )
        }
    ]);
    return config;
}