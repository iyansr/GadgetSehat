import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const DangerIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#DB4951"
        d="M7.115.986.428 11.907C-.597 13.584.349 16 2.027 16h12.946c1.644 0 2.601-2.342 1.644-4.019L10.37 1.06c-.8-1.38-2.42-1.418-3.254-.074Z"
      />
      <Path
        fill="#fff"
        d="M9.412 10.391H7.746V4.425h1.666v5.966Zm0 3.144H7.746v-1.603h1.666v1.603Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h17v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default DangerIcon;
