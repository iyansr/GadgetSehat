import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const ArrowCenter = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" viewBox="0 0 25 25" {...props}>
    <G fill="#fff" clipPath="url(#a)">
      <Path d="M23.758 12.888h-6.405c-.233 0-.389-.155-.389-.388s.156-.388.389-.388h6.405c.233 0 .388.155.388.388s-.155.388-.388.388Z" />
      <Path d="M20.769 16.809a.352.352 0 0 1-.272-.117.375.375 0 0 1 0-.543l3.571-3.65-3.571-3.648a.375.375 0 0 1 0-.544.375.375 0 0 1 .543 0l3.844 3.921a.375.375 0 0 1 0 .544l-3.805 3.92a.44.44 0 0 1-.31.117ZM7.648 12.888H1.242c-.233 0-.388-.155-.388-.388s.155-.388.388-.388h6.406c.232 0 .388.155.388.388a.389.389 0 0 1-.388.388Z" />
      <Path d="M4.231 16.809a.353.353 0 0 1-.271-.117l-3.844-3.92a.375.375 0 0 1 0-.544l3.844-3.92a.375.375 0 0 1 .543 0 .375.375 0 0 1 0 .543L.932 12.5l3.571 3.649a.375.375 0 0 1 0 .543.42.42 0 0 1-.272.117ZM12.5 24.146c-.233 0-.388-.155-.388-.388v-6.405c0-.233.155-.389.388-.389s.388.156.388.389v6.405c0 .233-.155.388-.388.388Z" />
      <Path d="M12.5 25a.353.353 0 0 1-.272-.116l-3.92-3.844a.375.375 0 0 1 0-.543.375.375 0 0 1 .543 0l3.649 3.571 3.65-3.571a.375.375 0 0 1 .543 0 .375.375 0 0 1 0 .543l-3.921 3.844A.352.352 0 0 1 12.5 25ZM12.5 8.036c-.233 0-.388-.156-.388-.389V1.242c0-.233.155-.388.388-.388s.388.155.388.388v6.405a.389.389 0 0 1-.388.389Z" />
      <Path d="M16.42 4.62a.352.352 0 0 1-.27-.117L12.5.932 8.85 4.503a.375.375 0 0 1-.543 0 .375.375 0 0 1 0-.543L12.228.116a.375.375 0 0 1 .544 0l3.92 3.805a.375.375 0 0 1 0 .543.336.336 0 0 1-.271.156Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h25v25H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ArrowCenter;