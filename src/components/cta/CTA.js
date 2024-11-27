import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { motion } from "framer-motion";

import Feature from "components/sections/feature";

import { getCommonMotionProps } from "lib/utils";
import stl from "./CTA.module.scss";

const CTA = ({ customClass }) => {
  const { isDark } = useSelector((state) => state.appearance);
  const [animation, setAnimation] = useState(false);
  

  const motionProps = getCommonMotionProps(animation, setAnimation);

  return (
    <motion.div
      {...motionProps}
      className={clsx(stl.container, isDark && stl.dark, customClass)}
    >
      <div className={stl.head}>
        <div />
        <div />
        <div />
      </div>
      <Feature
        title={
          <>
            Join Our Unified Loyalty Platform
            <br /> Today!
          </>
        }
        description="Transform your loyalty experience with our innovative platform. Seamlessly manage, exchange and redeem points across multiple brands with ease and flexibility. Enjoy personalized rewards, extended validity and transparent transactions powered by blockchain technology. Join now to unlock the full value of your loyalty points and gain access to a network of rewards like never before!"
        src={`/assets/png/users${isDark ? "-dark" : ""}.png`}
        customClass={stl.featureBox}
      />
    </motion.div>
  );
};

CTA.propTypes = { customClass: PropTypes.string };

export default CTA;
