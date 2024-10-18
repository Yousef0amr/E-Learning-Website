import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faCreditCard, faUserGraduate, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import AppStrings from './../../utils/appStrings';
const ProfileMenu = ({ onLogOut }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='profile-menu-container'>
            <button className={`profile Btn`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className='sign'><FontAwesomeIcon icon={faUser} /></div>
                <div className="text">{t(AppStrings.profile)}</div>
            </button>
            <div ref={menuRef} className={`card-menu collapse ${isMenuOpen ? 'show' : ''}`} id="profile-menu">
                <ul className="list">
                    <Link to="/">
                        <li className="element">
                            <FontAwesomeIcon icon={faHome} />
                            <p className="label">{t(AppStrings.home)}</p>
                        </li>
                    </Link>
                    <div className="separator"></div>
                    <Link to="/profile">
                        <li className="element">
                            <FontAwesomeIcon icon={faUser} />
                            <p className="label">{t(AppStrings.my_account)}</p>
                        </li>
                    </Link>
                    <div className="separator"></div>
                    <Link to="/profile/my-wallet">
                        <li className="element">
                            <FontAwesomeIcon icon={faCreditCard} />
                            <p className="label">{t(AppStrings.my_wallet)}</p>
                        </li>
                    </Link>
                    <div className="separator"></div>
                    <Link to="/my-courses">
                        <li className="element">
                            <FontAwesomeIcon icon={faUserGraduate} />
                            <p className="label">{t(AppStrings.my_courses)}</p>
                        </li>
                    </Link>
                    <div className="separator"></div>
                    <li className="element" onClick={onLogOut}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <p className="label">{t(AppStrings.signout)}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileMenu;
