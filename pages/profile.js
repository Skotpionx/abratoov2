import React from 'react'
import styles from '../app/page.module.css'
import NavImage from '@/app/components/navImage';
import Footer from '@/app/components/footer';
import '../app/styles/profile.css'
import ProfileInfo from '@/app/components/profileInfo';
import Head from 'next/head'

export default function Profile() {
    return (
        <>
            <Head>
                <title> Tu Perfil </title>
                <meta name='description' content='Your Tattoo Shop'/>
                <link rel="icon" href="/favicon.png" />        
            </Head>
            <NavImage />
                <ProfileInfo />
            <Footer/>
        </>
    )
}