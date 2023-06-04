import React from 'react'
import styles from '../app/page.module.css'
import NavImage from '@/app/components/navImage';
import Footer from '@/app/components/footer';
import '../app/styles/profile.css'
import ProfileInfo from '@/app/components/profileInfo';

export default function Profile() {
    return (
        <>
            <NavImage />
            <main className={styles.main} style={{backgroundColor: 'rgb(197, 219, 245)'}}>
                <ProfileInfo />
            </main>
            <Footer/>
        </>
    )
}