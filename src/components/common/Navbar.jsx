
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Link, redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../utils/auth';
import { useLogoutMutation } from './../../features/slices/authSlice';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from './../../assets/logo.png'
import SwitchMode from './SwitchMode';
import CustomToggle from './CustomToggle';

function NavbarComponent({ toggleDarkMode, darkMode }) {


    const { isAuthenticated, logoutLocal } = useAuth()
    const [logout] = useLogoutMutation()
    const onLogOut = async () => {
        try {
            await logout().unwrap()
            logoutLocal()
            redirect('/', { replace: true })
        } catch (error) {
            toast.error(error.data.message)
        }

    }
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <Navbar expand="lg" className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar'}`}>
                <Container >
                    <Navbar.Brand >
                        <Link to="/">
                            <h1 className="title">
                                <img src={logo} alt="الغالي" style={{ width: '100px' }} />
                            </h1>

                        </Link>

                    </Navbar.Brand>
                    <Nav className='me-auto' >
                        <SwitchMode toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                    </Nav>
                    <CustomToggle />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {isAuthenticated ? (
                                <div className="auth-buttons">
                                    <Button className="logout" onClick={onLogOut}>
                                        تسجيل الخروج
                                    </Button>
                                    <Link to="/my-courses">
                                        <Button className="auth-login">
                                            كورساتي
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="auth-buttons">
                                    <Link to="/login">
                                        <Button className="auth-login">
                                            تسجيل الدخول <FontAwesomeIcon icon={faArrowRightFromBracket} color="#ff4b2bbb" />
                                        </Button>
                                    </Link>
                                    <Link to="/sign-up">
                                        <Button className="auth-signUp">{'!'} انشئ حسابك الأن</Button>
                                    </Link>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            <ToastContainer />
        </>

    );
}

export default NavbarComponent;
