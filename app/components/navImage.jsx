import '../styles/authBox.css'
import Image from 'next/image';
import Link from 'next/link';

const NavImage = () => {
    return (
        <div className="img-container">
            <Link href="/">
                    <Image
                        src="/logotfg.png"
                        className="auth-logo"
                        alt="Vuelta a Home"
                        priority={true}
                        width={150}
                        height={150}
                    />
            </Link>
        </div>
    );
}

export default NavImage
