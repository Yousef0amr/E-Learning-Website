
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../../utils/auth';
import { useLogoutMutation } from './../../features/slices/authSlice';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './../../assets/logo.png'
import SwitchMode from './SwitchMode';
import CustomToggle from './CustomToggle';
import AuthButton from '../navbar/AuthButton';
import MenuBar from '../navbar/MenuBar';
import notification from '../../utils/toastNotify';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import AnchorTemporaryDrawer from './Drawer';
import { faGraduationCap, faHome, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

function NavbarComponent({ toggleDarkMode, darkMode }) {

    const { t } = useTranslation();
    const { isAuthenticated, logoutLocal } = useAuth();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const [state, setState] = React.useState(false);

    const toggleDrawer = () => {
        setState(prev => prev ? false : true);
    };

    const onLogOut = async () => {
        try {
            await logout().unwrap();
            logoutLocal();
            navigate('/login', { replace: true });
        } catch (error) {
            notification('error', t(AppStrings.signoutFailed), error);
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


    const listItems = [{
        label: t(AppStrings.home),
        href: '/',
    },
    {
        label: t(AppStrings.login),
        href: '/login',
    },
    {
        label: t(AppStrings.sign_up),
        href: '/sign-up',
    }
    ];

    const menuListItems = [{
        label: t(AppStrings.home),
        href: '/',
        icon: faHome
    },
    {
        label: t(AppStrings.profile),
        href: '/profile',
        icon: faUser
    },
    {
        label: t(AppStrings.my_wallet),
        href: 'profile/my-wallet',
        icon: faWallet
    },
    {
        label: t(AppStrings.my_courses),
        href: '/my-courses',
        icon: faGraduationCap
    },

    ];


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
                    <CustomToggle toggleDrawer={toggleDrawer} />

                    <Navbar.Collapse id="basic-navbar-nav">
                        {
                            state ? <div >

                                <AnchorTemporaryDrawer toggleDrawer={toggleDrawer} state={state} listItems={
                                    isAuthenticated ?
                                        menuListItems : listItems

                                } >

                                </AnchorTemporaryDrawer>
                            </div> : <Nav className="ms-auto">
                                {isAuthenticated ? (
                                    <MenuBar onLogOut={onLogOut} />
                                ) : (
                                    <AuthButton />
                                )}
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>

            </Navbar>
            <ToastContainer />
        </>

    );
}

export default NavbarComponent;
