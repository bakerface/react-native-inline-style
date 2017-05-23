/**
 * Copyright (c) 2017 Chris Baker <mail.chris.baker@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

'use strict';

var React = require('react');
var PropTypes = require('prop-types');

var hasOwnProperty = Object.prototype.hasOwnProperty;

var stylePropTypes = {
  alignContent: PropTypes.any,
  alignItems: PropTypes.any,
  alignSelf: PropTypes.any,
  aspectRatio: PropTypes.any,
  backfaceVisibility: PropTypes.any,
  backgroundColor: PropTypes.any,
  borderBottomColor: PropTypes.any,
  borderBottomLeftRadius: PropTypes.any,
  borderBottomRightRadius: PropTypes.any,
  borderBottomWidth: PropTypes.any,
  borderColor: PropTypes.any,
  borderLeftColor: PropTypes.any,
  borderLeftWidth: PropTypes.any,
  borderRadius: PropTypes.any,
  borderRightColor: PropTypes.any,
  borderRightWidth: PropTypes.any,
  borderStyle: PropTypes.any,
  borderTopColor: PropTypes.any,
  borderTopLeftRadius: PropTypes.any,
  borderTopRightRadius: PropTypes.any,
  borderTopWidth: PropTypes.any,
  borderWidth: PropTypes.any,
  bottom: PropTypes.any,
  color: PropTypes.any,
  decomposedMatrix: PropTypes.any,
  direction: PropTypes.any,
  display: PropTypes.any,
  elevation: PropTypes.any,
  flex: PropTypes.any,
  flexBasis: PropTypes.any,
  flexDirection: PropTypes.any,
  flexGrow: PropTypes.any,
  flexShrink: PropTypes.any,
  flexWrap: PropTypes.any,
  fontFamily: PropTypes.any,
  fontSize: PropTypes.any,
  fontStyle: PropTypes.any,
  fontVariant: PropTypes.any,
  fontWeight: PropTypes.any,
  height: PropTypes.any,
  includeFontPadding: PropTypes.any,
  justifyContent: PropTypes.any,
  left: PropTypes.any,
  letterSpacing: PropTypes.any,
  lineHeight: PropTypes.any,
  margin: PropTypes.any,
  marginBottom: PropTypes.any,
  marginHorizontal: PropTypes.any,
  marginLeft: PropTypes.any,
  marginRight: PropTypes.any,
  marginTop: PropTypes.any,
  marginVertical: PropTypes.any,
  maxHeight: PropTypes.any,
  maxWidth: PropTypes.any,
  minHeight: PropTypes.any,
  minWidth: PropTypes.any,
  opacity: PropTypes.any,
  overflow: PropTypes.any,
  padding: PropTypes.any,
  paddingBottom: PropTypes.any,
  paddingHorizontal: PropTypes.any,
  paddingLeft: PropTypes.any,
  paddingRight: PropTypes.any,
  paddingTop: PropTypes.any,
  paddingVertical: PropTypes.any,
  position: PropTypes.any,
  right: PropTypes.any,
  rotation: PropTypes.any,
  scaleX: PropTypes.any,
  scaleY: PropTypes.any,
  shadowColor: PropTypes.any,
  shadowOffset: PropTypes.any,
  shadowOpacity: PropTypes.any,
  shadowRadius: PropTypes.any,
  textAlign: PropTypes.any,
  textAlignVertical: PropTypes.any,
  textDecorationColor: PropTypes.any,
  textDecorationLine: PropTypes.any,
  textDecorationStyle: PropTypes.any,
  textShadowColor: PropTypes.any,
  textShadowOffset: PropTypes.any,
  textShadowRadius: PropTypes.any,
  top: PropTypes.any,
  transform: PropTypes.any,
  transformMatrix: PropTypes.any,
  translateX: PropTypes.any,
  translateY: PropTypes.any,
  width: PropTypes.any,
  writingDirection: PropTypes.any,
  zIndex: PropTypes.any
};

function organize(combined) {
  var style = { };
  var props = { };

  for (var key in combined) {
    if (hasOwnProperty.call(combined, key)) {
      var value = combined[key];

      if (key === 'style') {
        // Do nothing, we handle this later
      }
      else if (key in stylePropTypes) {
        style[key] = value;
      }
      else {
        props[key] = value;
      }
    }
  }

  if (typeof combined.style === 'undefined') {
    props.style = style;
  }
  else {
    props.style = [].concat(combined.style, style);
  }

  return props;
}

function canInlineStyle(Component) {
  function InlineStyle(properties) {
    var props = organize(properties);
    return React.createElement(Component, props, props.children);
  }

  InlineStyle.propTypes = stylePropTypes;

  return InlineStyle;
}

module.exports = canInlineStyle;
