import React from 'react'
import AuthBox from '../app/components/authBox'
import Head from 'next/head'

const Auth = () => {
    return (

        <div>
        <Head>
            <title> Login </title>
            <meta name='description' content='Your Tattoo Shop'/>
            <link rel="icon" href="/favicon.png" />        
            </Head>
            <AuthBox/>
        </div>
    )
}

export default Auth;