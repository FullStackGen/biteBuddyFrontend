// components/GoogleSignIn.tsx
import React from 'react'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

export default function GoogleSignIn() {
    const handleSuccess = (credentialResponse: CredentialResponse) => {
        console.log('Encoded JWT ID token:', credentialResponse.credential)
        if (!credentialResponse.credential) return;

        const payload = jwtDecode<any>(credentialResponse.credential)
        console.log("Decoded JWT Payload:", payload)
        console.log("User ID:", payload.sub)
        console.log("Name:", payload.name)
        console.log("Email:", payload.email)
        console.log("Picture URL:", payload.picture)
        // Send credentialResponse.credential to your backend for verification/creating a session
    }

    const handleError = () => {
        console.error('Google Sign In Failed')
    }

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
        />
    )
}


