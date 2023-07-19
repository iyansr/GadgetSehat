import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ClockIntro = (props: SvgProps) => (
  <Svg viewBox="0 0 25 25" width={25} height={25} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeMiterlimit={10}
      strokeWidth={1.723}
      d="M12.45 22.9c5.771 0 10.45-4.679 10.45-10.45C22.9 6.679 18.221 2 12.45 2 6.679 2 2 6.679 2 12.45 2 18.221 6.679 22.9 12.45 22.9Z"
    />
    <Path stroke="#fff" strokeMiterlimit={10} strokeWidth={1.723} d="M12.335 9.292v4.02h5.053" />
  </Svg>
);
export default ClockIntro;
