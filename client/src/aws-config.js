import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-2', 
    userPoolId: 'us-east-2_SdpyPZcEq',
    userPoolWebClientId: 'spbtf78pmarmt6q4um9omeu10',
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
});