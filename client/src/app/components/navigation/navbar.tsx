'use client';
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from 'react-modal';
import Auth from "../../auth/auth";
import { AuthToken } from "../../auth/authToken";

import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authToken = AuthToken();

  const openModal = () => {
      setIsOpen(true);
  };

  const closeModal = () => {
      setIsOpen(false);
      window.location.reload();
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <Link href="/">
            <Image src="/logo.png" alt="Tournaments Logo" width={60} height={60} />
          </Link>
        </div>
        <div className="navbar-action">
          <ul className="navbar-action-page">
            <li>
              <a href="/organize-tournament">
                <button>
                  Organize
                </button>
              </a>
            </li>
            <li>
              <a href="/find-tournament">
                <button>
                  Find
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
          {AuthToken() ? (
            <div>
              <p>Welcome, logged in </p>
            </div>
          ) : (
            <div>
              <button className="navbar-register" onClick={openModal}>Register</button>
              <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <Auth />
                <button onClick={closeModal}>Close</button>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;