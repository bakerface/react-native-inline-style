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

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { StyleSheet, Text } from 'react-native-web';
import canInlineStyle from '.';

const InlineStyleText = canInlineStyle(Text);

function create(component) {
  const renderer = new ShallowRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
}

test('should forward non-style properties', () => {
  const node = create(
    <InlineStyleText foo>
      Hello world
    </InlineStyleText>
  );
  
  expect(node.props).toEqual({
    children: 'Hello world',
    style: { },
    foo: true
  });
});

test('should combine style properties', () => {
  const node = create(
    <InlineStyleText fontSize={16}>
      Hello world
    </InlineStyleText>
  );

  expect(node.props).toEqual({
    children: 'Hello world',
    style: {
      fontSize: 16
    }
  });
});

test('should override styles with inlines', () => {
  const styles = StyleSheet.create({
    text: {
      color: 'green',
      fontSize: 16
    }
  });

  const node = create(
    <InlineStyleText style={styles.text} fontSize={18}>
      Hello world
    </InlineStyleText>
  );

  expect(node.props).toEqual({
    children: 'Hello world',
    style: [
      styles.text,
      {
        fontSize: 18
      }
    ]
  });
});

