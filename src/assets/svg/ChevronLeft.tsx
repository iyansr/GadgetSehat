import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ChevronLeft = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    <Path
      stroke={props?.color ?? '#fff'}
      strokeMiterlimit={10}
      strokeWidth={2}
      d="m14 17-5-5 5-5"
    />
  </Svg>
);

export default ChevronLeft;
