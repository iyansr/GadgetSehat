import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const CheckMark = (props: SvgProps) => (
  <Svg viewBox="0 0 17 17" width={17} height={17} fill="none" {...props}>
    <Path fill="#36B34A" d="M8.11 16.22A8.11 8.11 0 1 0 8.11 0a8.11 8.11 0 0 0 0 16.22Z" />
    <Path
      fill="#fff"
      d="m13.368 5.096-.474-.429a.902.902 0 0 0-1.227.044L7.012 9.374 5.118 7.677a.984.984 0 0 0-1.338.055l-.289.293a.874.874 0 0 0 .024 1.274l2.805 2.513.18.163a.903.903 0 0 0 1.227-.045l5.656-5.665a.802.802 0 0 0-.015-1.17Z"
    />
  </Svg>
);
export default CheckMark;
