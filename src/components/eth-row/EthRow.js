import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { getCommonMotionProps } from "lib/utils";

import srcImg from "../../../../omni-loyalty-program/public/assets/png/ETH-row.png";
import stl from "./EthRow.module.scss";



const EthRow = () => {
  const src=srcImg
  const [animation, setAnimation] = useState(false);

  const motionProps = getCommonMotionProps(animation, setAnimation);

  return (
    <motion.div {...motionProps} className={stl.container}>
      <Image src={src} width={2010} height={200} />
    </motion.div>
  );
};

export default EthRow;
