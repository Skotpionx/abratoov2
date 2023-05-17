import Image from 'next/image'
import styles from './page.module.css'
import NavBar from './components/navBar.jsx'
import Footer from './components/footer'
import GetUsersComponent from './components/getUsers'

export default function Home() {
  return (
    <> 
    <NavBar/>
    <main className={styles.main}>
        {/* <CreateUser/> */}
    </main>
    <GetUsersComponent/>
    <Footer/>
    </>
  )
}