// src/hooks/useFirebaseError.ts
import { useState } from "react";
import { FirebaseError } from "firebase/app";

type FirebaseErrorMessage = string | null;

export const useFirebaseError = () => {
  const [errorMessage, setErrorMessage] = useState<FirebaseErrorMessage>(null);

  const handleFirebaseError = (error: FirebaseError) => {
    const errorCode = error.code;
    let message = "";

    switch (errorCode) {
      case "auth/email-already-in-use":
        message = "The email address is already in use by another account.";
        break;
      case "auth/wrong-password":
        message =
          "The password is invalid or the user does not have a password.";
        break;
      case "auth/invalid-credential":
        message =
          "The provided credentials are invalid or malformed. Please check the input and try again.";
        break;
      case "auth/claims-too-large":
        message =
          "The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes.";
        break;
      case "auth/email-already-exists":
        message =
          "The provided email is already in use by an existing user. Each user must have a unique email.";
        break;
      case "auth/id-token-expired":
        message = "The provided Firebase ID token is expired.";
        break;
      case "auth/id-token-revoked":
        message = "The Firebase ID token has been revoked.";
        break;
      case "auth/insufficient-permission":
        message =
          "The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource.";
        break;
      case "auth/invalid-argument":
        message =
          "An invalid argument was provided to an Authentication method.";
        break;
      case "auth/invalid-claims":
        message =
          "The custom claim attributes provided to setCustomUserClaims() are invalid.";
        break;
      case "auth/invalid-creation-time":
        message = "The creation time must be a valid UTC date string.";
        break;
      case "auth/invalid-disabled-field":
        message =
          "The provided value for the disabled user property is invalid. It must be a boolean.";
        break;
      case "auth/invalid-display-name":
        message =
          "The provided value for the displayName user property is invalid. It must be a non-empty string.";
        break;
      case "auth/invalid-email-verified":
        message =
          "The provided value for the emailVerified user property is invalid. It must be a boolean.";
        break;
      case "auth/invalid-hash-algorithm":
        message =
          "The hash algorithm must match one of the strings in the list of supported algorithms.";
        break;
      case "auth/invalid-hash-block-size":
        message = "The hash block size must be a valid number.";
        break;
      case "auth/invalid-hash-derived-key-length":
        message = "The hash derived key length must be a valid number.";
        break;
      case "auth/invalid-hash-key":
        message = "The hash key must be a valid byte buffer.";
        break;
      case "auth/invalid-hash-memory-cost":
        message = "The hash memory cost must be a valid number.";
        break;
      case "auth/invalid-hash-parallelization":
        message = "The hash parallelization must be a valid number.";
        break;
      case "auth/invalid-hash-rounds":
        message = "The hash rounds must be a valid number.";
        break;
      case "auth/invalid-hash-salt-separator":
        message =
          "The hashing algorithm salt separator field must be a valid byte buffer.";
        break;
      case "auth/invalid-id-token":
        message = "The provided ID token is not a valid Firebase ID token.";
        break;
      case "auth/invalid-last-sign-in-time":
        message = "The last sign-in time must be a valid UTC date string.";
        break;
      case "auth/invalid-page-token":
        message = "The provided next page token in listUsers() is invalid.";
        break;
      case "auth/invalid-password":
        message =
          "The provided value for the password user property is invalid. It must be a string with at least six characters.";
        break;
      case "auth/invalid-password-hash":
        message = "The password hash must be a valid byte buffer.";
        break;
      case "auth/invalid-password-salt":
        message = "The password salt must be a valid byte buffer";
        break;
      case "auth/invalid-photo-url":
        message =
          "The provided value for the photoURL user property is invalid. It must be a string URL.";
        break;
      case "auth/invalid-provider-data":
        message = "The providerData must be a valid array of UserInfo objects.";
        break;
      case "auth/invalid-oauth-responsetype":
        message = "Only exactly one OAuth responseType should be set to true.";
        break;
      case "auth/invalid-session-cookie-duration":
        message =
          "The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.";
        break;
      case "auth/invalid-uid":
        message =
          "The provided uid must be a non-empty string with at most 128 characters.";
        break;
      case "auth/invalid-user-import":
        message = "The user record to import is invalid.";
        break;
      case "auth/maximum-user-count-exceeded":
        message =
          "The maximum allowed number of users to import has been exceeded.";
        break;
      case "auth/missing-hash-algorithm":
        message =
          "Importing users with password hashes requires that the hashing algorithm and its parameters be provided.";
        break;
      case "auth/missing-uid":
        message = "A uid identifier is required for the current operation.";
        break;
      case "auth/missing-oauth-client-secret":
        message =
          "The OAuth configuration client secret is required to enable OIDC code flow.";
        break;
      case "auth/phone-number-already-exists":
        message =
          "The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.";
        break;
      case "auth/project-not-found":
        message =
          "No Firebase project was found for the credential used to initialize the Admin SDKs.";
        break;
      case "auth/reserved-claims":
        message =
          "One or more custom user claims provided to setCustomUserClaims() are reserved.";
        break;
      case "auth/session-cookie-expired":
        message = "The provided Firebase session cookie is expired.";
        break;
      case "auth/session-cookie-revoked":
        message = "The Firebase session cookie has been revoked.";
        break;
      case "auth/uid-already-exists":
        message = "The provided uid is already in use by an existing user.";
        break;
      case "auth/admin-restricted-operation":
        message = "This operation is restricted to administrators only.";
        break;
      case "auth/app-not-authorized":
        message =
          "This app is not authorized to use Firebase Authentication with the provided API key.";
        break;
      case "auth/captcha-check-failed":
        message =
          "The reCAPTCHA response token provided is either invalid, expired, or already used.";
        break;
      case "auth/code-expired":
        message =
          "The SMS code has expired. Please re-send the verification code to try again.";
        break;
      case "auth/invalid-email":
        message = "The email address is badly formatted.";
        break;
      case "auth/invalid-phone-number":
        message = "The format of the phone number provided is incorrect.";
        break;
      case "auth/too-many-requests":
        message =
          "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "auth/user-not-found":
        message =
          "There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case "auth/user-disabled":
        message = "The user account has been disabled by an administrator.";
        break;
      case "auth/weak-password":
        message = "The password must be 6 characters long or more.";
        break;
      case "auth/network-request-failed":
        message =
          "A network error (such as timeout, interrupted connection, or unreachable host) has occurred.";
        break;
      case "auth/unknown":
        message = "Unknown error or an error from a different error domain.";
        break;
      default:
        message = "An unknown error occurred. Please try again.";
        break;
    }

    setErrorMessage(message);
  };

  return {
    errorMessage,
    handleFirebaseError,
    clearError: () => setErrorMessage(null),
  };
};
