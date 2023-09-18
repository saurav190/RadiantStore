import React from 'react';
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-dark pt-6 border-t border-gray-300 shadow-md">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0">
                    <h4 className="text-2xl font-semibold">Let's keep in touch!</h4>
                    <p className="mt-4 text-lg">
                        Find us on social media, and we'll respond within 1-2 business days.
                    </p>
                    <div className="mt-6 flex space-x-4">
                        <a href="#" className="hover:text-blue-400">
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                        <a href="#" className="hover:text-pink-500">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            <FontAwesomeIcon icon={faTwitter} size="2x" />
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            <FontAwesomeIcon icon={faLinkedin} size="2x" />
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0 md:px-16">
                    <span className="block text-xl font-semibold mb-2">Useful Links</span>
                    <NavLink to="/aboutus" className="text-gray-400 hover:text-black block mb-2">About Us</NavLink>
                    <NavLink to="/ourteam" className="text-gray-400 hover:text-black block mb-2">Our Team</NavLink>
                    <NavLink to="/termsandconditions" className="text-gray-400 hover:text-black block mb-2">Terms &amp; Conditions</NavLink>
                    <NavLink to="/privacypolicy" className="text-gray-400 hover:text-black block mb-2">Privacy Policy</NavLink>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3">
                    <span className="block text-xl font-semibold mb-2">Contact Us</span>
                    <div className="mb-2 flex items-center">
                        <img width="30" height="30" src="https://img.icons8.com/color/30/address--v1.png" alt="address--v1" />
                        <address>
                            A-201-207, Sankalp Iconic Tower,<br /> Near Iscon Cross Road, Ambli - Bopal Rd,<br /> Ahmedabad, Gujarat 380058<br />
                        </address>
                    </div>
                    <div className="flex items-center">
                        <img width="30" height="30" src="https://img.icons8.com/fluency/30/phone.png" alt="phone" />
                        <a href="tel:+16286284042">+1- (628) 628-4042.</a>
                    </div>
                    <div className="flex items-center">
                        <img width="30" height="30" src="https://img.icons8.com/bubbles/30/new-post.png" alt="new-post" />
                        <a href="mailto:info@inexture.com">info@inexture.com</a>
                    </div>
                </div>
            </div>
            <hr className="my-2 border-gray-600" />
            <div className="text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Inexture solution. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
