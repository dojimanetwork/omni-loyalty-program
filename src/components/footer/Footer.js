import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import Button from 'components/button'
import Para from 'components/para'
import Field from 'components/field'

import LightLogo from 'assets/svg/logo.svg'
import DarkLogo from 'assets/svg/darkmode-logo.svg'
import FacebookIcon from 'assets/svg/facebook.svg'
import LinkedinIcon from 'assets/svg/linkedin.svg'
import GithubIcon from 'assets/svg/github.svg'
import TwitterIcon from 'assets/svg/twitter.svg'
import InstagramIcon from 'assets/svg/instagram.svg'

import { getCommonMotionProps } from 'lib/utils'

import stl from './Footer.module.scss'

const Footer = ({ customClass }) => {
  const { isDark } = useSelector(state => state.appearance)
  const [animation, setAnimation] = useState(false)

  const motionProps = getCommonMotionProps(animation, setAnimation)

  const navLinks = ['Home', 'Roadmap', 'Discover', 'Community']
  const socialLinks = [
    <FacebookIcon key={1} />,
    <LinkedinIcon key={2} />,
    <GithubIcon key={3} />,
    <TwitterIcon key={4} />,
    <InstagramIcon key={5} />,
  ]

  return (
    <footer className={clsx(stl.footer, isDark && stl.dark, customClass)}>
      <div className={stl.main}>
        <div className={stl.upperSection}>
          <motion.div {...motionProps}>
            {isDark ?  <h1 style={{color: 'white',}}>Omnichain Loyalty</h1>:   <h1 style={{color: 'black',}}>Omnichain Loyalty</h1>}
          </motion.div>
          <motion.div
            {...motionProps}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Para size="small">
            Thanks for visiting our Unified Loyalty Platform! We're here to revolutionize the way you use and manage loyalty points. Follow us on social media and sign up for our newsletter to stay updated on exciting rewards and new brand partnerships. Got questions? Let us know – we're always here to help!
            </Para>
          </motion.div>
        </div>
        <motion.div
          {...motionProps}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={stl.secondaryLinks}
        >
          <Button label="Support" link="/" />
          <Button label="Term" link="/" />
          <Button label="License" link="/" />
        </motion.div>
      </div>

      <div className={stl.primaryLinks}>
        <motion.div {...motionProps} className={stl.upperSection}>
          {navLinks.map(label => (
            <Button key={label} label={label} link="/" />
          ))}
          <Button label="My account" />
        </motion.div>

        <motion.div
          {...motionProps}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={stl.socialLinks}
        >
          {socialLinks.map(icon => (
            <Button key={icon.key} link="/">
              {icon}
            </Button>
          ))}
        </motion.div>
      </div>

      <div className={stl.buttons}>
        <motion.div {...motionProps} className={stl.upperSection}>
          <Para size="small">
          Want to make the most of your loyalty points and stay updated on exciting rewards? Sign up for our newsletter! Get regular updates on new brand partnerships, exclusive offers, and the latest developments in our Unified Loyalty Platform. Don’t miss out – join our community today!
          </Para>
        </motion.div>

        <motion.div
          {...motionProps}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={stl.width100}
        >
          <Field />
        </motion.div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  customClass: PropTypes.string,
}

export default Footer
