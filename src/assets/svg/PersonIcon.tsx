import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';
const PersonIcon = (props: SvgProps) => (
  <Svg width={15} height={22} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeWidth={2}
      d="M1.031 17.622a6.256 6.256 0 0 1 12.512 0v2.841H1.031v-2.841Z"
    />
    <Circle cx={6.861} cy={5.244} r={3.268} stroke="#fff" strokeWidth={2} />
  </Svg>
);
export default PersonIcon;
