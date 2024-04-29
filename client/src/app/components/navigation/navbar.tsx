'use client';
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from 'react-modal';
import Auth from "../../auth/auth";

import './navbar.css';

const Navbar = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
      setIsOpen(true);
  };

  const closeModal = () => {
      setIsOpen(false);
  };


  const toggleRegister = () => {
    // TODO: Open modal on /auth page
    setIsRegister(!isRegister);
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <Link href="/">
              <Image src="/logo.png" alt="Tournaments Logo" width={100} height={100}/>
          </Link>
        </div>
        <div className="navbar-action">
            <ul className="navbar-action-page">
              <li>
                <a href="/organize-tournament">
                  <button>
                    Organize tournament
                  </button>
                </a>
              </li>
              <li>
                <a href="/find-tournament">
                  <button>
                    Find tournament
                  </button>
                </a>
              </li>
            </ul>
        </div>


        <div className="network">
          <div className="network">
            <ul className="network">
              <li>
                <a href="/explorer">
                  <button>
                    Explorer
                  </button>
                </a>
              </li>
              <li>
                <a href="/post">
                  <button>
                    Post
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>


        <div className="navbar-connect">
          {isRegister ? (
            <div className="navbar-connect">
              <Image src="/avatar.png" alt="Avatar" width={40} height={40}/>
              <p className="text-white" style={{margin: '3px'}}>Organizer 1</p>
              <button className="navbar-connect-logout" onClick={toggleRegister}>Logout</button>
            </div>
          ) : (
            <div>
              <button className="navbar-register" onClick={openModal}>Register</button>
              <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <Auth />
                <button onClick={closeModal}>Close Modal</button>
                <button onClick={toggleRegister}>Fake Register</button>
              </Modal>
            </div>
          )
        }
        </div>
      </div>
    </>
  );
};

export default Navbar;