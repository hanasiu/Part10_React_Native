//it is difficult for me to 'type' this javascript component provided by the course. so I use 'any' and ? a lot.
import React from 'react'
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';


const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal as any
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold as any
  },
}
);

const Text = ({ color, fontSize, fontWeight, style, children, ...props }: { color?: string, fontSize?: string|number, fontWeight?: string, style?: { [key: string]: any },children: React.ReactNode }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props}>{children}</NativeText>;
};

export default Text;