import { Routes } from 'app/Routes';
import { Icon, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './Header.css';

export function Header() {

  return (
    <div className={styles.header}>
      <div className='main-menu'>
        <nav className='navbar navbar-expand-lg navbar-light '>
          <div className='navbar-toggler' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='icon-bar'/>
            <span className='icon-bar'/>
            <span className='icon-bar'/>
          </div>
          <a className='navbar-brand' href='/'>
            ERP Generator
          </a>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            {/* <Menu mode='horizontal'>
              <Menu.Item key={Routes.HOMEPAGE}>
                <Link href='#' className='dropdown-item'  to={Routes.HOMEPAGE}>
                  <Icon type='dashboard'/>Home
                </Link>
              </Menu.Item>
              <Menu.Item key={Routes.ABOUT}>
                <Link href='#' className='dropdown-item' to={Routes.ABOUT}>
                  <Icon type='file-pdf'/>About
                </Link>
              </Menu.Item>
            </Menu> */}
          </div>
        </nav>
      </div>
    </div>
  );
}
