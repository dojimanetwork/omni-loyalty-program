import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import Button from 'components/button'
import Modal from 'components/modal'

import LightLogo from 'assets/svg/logo.svg'
import DarkLogo from 'assets/svg/darkmode-logo.svg'
import HamburgerIcon from 'assets/svg/hamburger.svg'
import CrossIcon from 'assets/svg/cross.svg'
import SunIcon from 'assets/svg/sun.svg'
import MoonIcon from 'assets/svg/moon.svg'

import { setTheme } from 'store/appearance'
import { getCommonMotionProps } from 'lib/utils'

import stl from './Header.module.scss'

const Header = ({ customClass }) => {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()
  const { isDark } = useSelector(state => state.appearance)
  const [animation, setAnimation] = useState(false)

  const motionProps = getCommonMotionProps(animation, setAnimation)

  const navLinks = ['Home', 'Discover', 'Community']

  return (
    <motion.header
      {...motionProps}
      className={clsx(stl.header, isDark && stl.dark, customClass)}
    >
      <div className={stl.logo}>{isDark ?  <h1 style={{color: 'white',}}>Omnichain Loyalty</h1>:   <h1 style={{color: 'black',}}>Omnichain Loyalty</h1>}</div>

      <div className={stl.navLinks}>
        {navLinks.map(label => (
          <Button key={label} label={label} link="/" />
        ))}
      </div>

      <div className={stl.navBtns}>
        <Button label="Contact" variant="secondary" />
        <Button label="My account" />
        <Button
          onClick={() => dispatch(setTheme(!isDark))}
          customClass={stl.iconBtn}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </Button>
        <HamburgerIcon
          className={stl.hamburger}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <Modal
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        customClass={stl.modal}
        blur
      >
        <div className={stl.mobileNav}>
          <CrossIcon onClick={() => setIsOpen(false)} />

          <div className={stl.navLinksMob}>
            {navLinks.map(label => (
              <Button key={label} label={label} link="/" />
            ))}
          </div>

          <div className={stl.navBtnsMob}>
            <Button label="Contact" variant="secondary" />
            <Button label="My account" />
          </div>
        </div>
      </Modal>
    </motion.header>
  )
}

Header.propTypes = {
  customClass: PropTypes.string,
}

export default Header
