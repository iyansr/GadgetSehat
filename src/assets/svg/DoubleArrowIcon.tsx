import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const DoubleArrowIcon = (props: SvgProps) => (
  <Svg width={20} height={15} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeMiterlimit={10}
      strokeWidth={1.617}
      d="M6.064 4.149 9.255 7.34l-3.191 3.192M11.064 4.149l3.191 3.191-3.191 3.192"
    />
  </Svg>
);
export default DoubleArrowIcon;
