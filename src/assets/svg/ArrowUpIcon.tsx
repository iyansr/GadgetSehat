import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ArrowUpIcon = (props: SvgProps) => (
  <Svg
    width={26}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    {...props}
    className="rotate-180 transform">
    <Path
      stroke="#189741"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={5}
      d="M13.1 19.5V3M23.2 11.8l-10.1 9.9L3 11.8"
    />
  </Svg>
);
export default ArrowUpIcon;
