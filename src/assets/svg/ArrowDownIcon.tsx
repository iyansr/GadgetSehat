import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ArrowDownIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={26} height={25} fill="none" {...props}>
    <Path
      stroke="#DB4951"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={5}
      d="M13.1 19.5V3M23.2 11.8l-10.1 9.9L3 11.8"
    />
  </Svg>
);
export default ArrowDownIcon;
