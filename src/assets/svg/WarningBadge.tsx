import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const WarningBadge = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#FFECD6"
      fillRule="evenodd"
      stroke="#F4921C"
      strokeMiterlimit={10}
      strokeWidth={1.003}
      d="M7.713 1h8.428c1.825 0 3.54.766 4.743 1.97 1.204 1.277 1.97 2.919 1.97 4.816v8.319c0 1.897-.765 3.539-1.97 4.743-1.204 1.277-2.918 1.97-4.743 1.97H7.713c-1.824 0-3.539-.693-4.743-1.97A6.636 6.636 0 0 1 1 16.105V7.786c0-1.86.766-3.502 1.97-4.816A6.766 6.766 0 0 1 7.713 1Z"
      clipRule="evenodd"
    />
    <Path
      fill="#F4921C"
      fillRule="evenodd"
      d="M16.141 2.131H7.713c-1.532 0-2.919.584-3.94 1.642C2.75 4.794 2.058 6.18 2.058 7.786v8.319c0 1.642.693 2.992 1.715 4.05a5.543 5.543 0 0 0 3.94 1.642h8.428c1.533 0 3.029-.62 4.05-1.642a5.803 5.803 0 0 0 1.642-4.05V7.786c0-1.642-.62-2.992-1.642-4.013-1.021-1.058-2.517-1.642-4.05-1.642ZM7.713 1h8.428c1.825 0 3.54.766 4.743 1.97 1.204 1.277 1.97 2.919 1.97 4.816v8.319c0 1.897-.765 3.539-1.97 4.743-1.204 1.277-2.918 1.97-4.743 1.97H7.713c-1.824 0-3.539-.693-4.743-1.97A6.636 6.636 0 0 1 1 16.105V7.786c0-1.86.766-3.502 1.97-4.816A6.766 6.766 0 0 1 7.713 1Z"
      clipRule="evenodd"
    />
    <Path
      fill="#F4921C"
      fillRule="evenodd"
      stroke="#F4921C"
      strokeMiterlimit={10}
      strokeWidth={1.003}
      d="M16.543 16.214v-.875s-1.642-1.715-4.561-1.715-4.634 1.715-4.634 1.715v.875S9.063 14.5 11.982 14.5c2.919 0 4.56 1.715 4.56 1.715Z"
      clipRule="evenodd"
    />
    <Path
      fill="#F4921C"
      d="M7.75 11.07a1.24 1.24 0 1 0 0-2.481 1.24 1.24 0 0 0 0 2.48ZM16.25 11.07a1.24 1.24 0 1 0 0-2.481 1.24 1.24 0 0 0 0 2.48Z"
    />
    <Path
      fill="#F4921C"
      fillRule="evenodd"
      d="M8.516 5.56 5.743 7.459l.438.693 2.736-1.897-.401-.693ZM18.112 7.495l-2.7-1.934-.438.657 2.7 1.97.438-.693Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default WarningBadge;
