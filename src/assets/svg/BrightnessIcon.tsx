import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const BrightnessIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 36 36" width={36} height={36} fill="none" {...props}>
    <G fill={props?.color ?? '#1C74BB'} clipPath="url(#a)">
      <Path d="M18 25.326a7.462 7.462 0 1 0 0-14.924 7.462 7.462 0 0 0 0 14.925Z" />
      <Path d="M18 25.87c-4.387 0-8.005-3.573-8.005-8.006 0-4.387 3.573-8.005 8.005-8.005 4.387 0 8.005 3.573 8.005 8.005 0 4.387-3.618 8.005-8.005 8.005Zm0-14.97a6.968 6.968 0 0 0-6.965 6.964A6.968 6.968 0 0 0 18 24.83a6.968 6.968 0 0 0 6.965-6.965A6.968 6.968 0 0 0 18 10.9ZM18.543 0h-1.04v7.372h1.04V0ZM18.543 28.628h-1.04V36h1.04v-7.372ZM36 17.502h-7.372v1.04H36v-1.04ZM7.372 17.502H0v1.04h7.372v-1.04ZM30.362 4.922l-5.213 5.212.736.736 5.212-5.213-.735-.735ZM10.149 25.157 4.936 30.37l.735.735 5.213-5.213-.735-.735ZM25.896 25.114l-.736.736 5.213 5.212.736-.735-5.213-5.213ZM5.66 4.9l-.735.736 5.212 5.213.736-.736L5.66 4.901Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BrightnessIcon;
