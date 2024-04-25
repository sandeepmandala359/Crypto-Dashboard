import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userpool from '../userpool';
export const authenticate=(Email,Password)=>{
    return new Promise((resolve,reject)=>{
        const user=new CognitoUser({
            Username:Email,
            Pool:userpool
        });

        const authDetails= new AuthenticationDetails({
            Username:Email,
            Password
        });

        user.authenticateUser(authDetails,{
            onSuccess:(result)=>{
                console.log("login successful");
                resolve(result);
            },
            newPasswordRequired: function (userAttributes) {
               // delete userAttributes.email_verified;
                user.completeNewPasswordChallenge("ChandraJc@1234", {}, this);
            },
            onFailure:(err)=>{
                console.log("login failed",err);
                reject(err);
            }
        });
    });
};

export const logout = () => {
    const user = userpool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
};
