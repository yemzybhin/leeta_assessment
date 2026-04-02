import React from 'react';
import { View, Text } from 'react-native';

const stub =
  (name: string) =>
  ({ children, ...props }: any) =>
    React.createElement(View, { testID: name, ...props }, children);

const Svg       = stub('Svg');
const Circle    = stub('Circle');
const Ellipse   = stub('Ellipse');
const G         = stub('G');
const Text_     = stub('SvgText');
const TSpan     = stub('TSpan');
const TextPath  = stub('TextPath');
const Path      = stub('Path');
const Polygon   = stub('Polygon');
const Polyline  = stub('Polyline');
const Line      = stub('Line');
const Rect      = stub('Rect');
const Use       = stub('Use');
const Image     = stub('Image');
const Symbol    = stub('Symbol');
const Defs      = stub('Defs');
const LinearGradient = stub('LinearGradient');
const RadialGradient = stub('RadialGradient');
const Stop      = stub('Stop');
const ClipPath  = stub('ClipPath');
const Pattern   = stub('Pattern');
const Mask      = stub('Mask');
const Marker    = stub('Marker');
const ForeignObject = stub('ForeignObject');

export {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  ForeignObject,
  G,
  Image,
  Line,
  LinearGradient,
  Marker,
  Mask,
  Path,
  Pattern,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Symbol,
  Text_ as Text,
  TextPath,
  TSpan,
  Use,
};

export default Svg;
