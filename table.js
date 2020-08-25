import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PinchGestureHandler, State} from 'react-native-gesture-handler';
import { onGestureEvent, pinchActive, pinchBegan, transformOrigin, timing, translate, vec} from "react-native-redash";
import Animated, { block, cond, eq,  multiply, set, useCode, Value } from 'react-native-reanimated';

function Piece(props) {
    return (
        <View style={{ backgroundColor: props.color, width: 30, height: 30 }} />
    );
}

const SIZE = 300;

export default (props) => {
    // gesture params
    const state = new Value(State.UNDETERMINED);
    const scale = new Value(1);
    const focal = vec.createValue(0, 0);
    const numberOfPointers = new Value(0);
    const pinchGestureHandler = onGestureEvent({numberOfPointers, state, scale, focalX: focal.x, focalY: focal.y});

    // translation
    const origin = vec.createValue(0, 0);
    const pinch = vec.createValue(0, 0);

    // pre state params
    const prevScale = new Value(1)
    const prevPinch = vec.createValue(0, 0)
    const prevOrigin = vec.createValue(0, 0)

    // final transform
    const finalScale =  multiply(scale, prevScale);
    const finalPinch = vec.add(pinch, prevPinch);
    
    //const adjustedFocal = vec.add(vec.multiply(vec.sub(focal, {x: SIZE / 2, y: SIZE / 2}), prevScale), prevPinch);
    const midPoint = {x: SIZE / 2, y: SIZE / 2}
    const adjustedFocal = vec.sub(focal, midPoint);
    // update on conditions
    useCode(
        () =>
          block([
            cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
            cond(pinchActive(state, numberOfPointers), [
                vec.set(pinch, vec.minus(vec.sub(origin, adjustedFocal))),
            ]),
            cond(eq(state, State.END), [
                set(prevScale, scale),
                vec.set(prevPinch, pinch),
                vec.set(prevOrigin, origin),
                // set(pinch.x, timing({ from: pinch.x, to: 0 })),
                // set(pinch.y, timing({ from: pinch.y, to: 0 })),
                // set(scale, timing({ from: scale, to: 1 })),
                // set(origin.x, timing({ from: origin.x, to: 0 })),
                // set(origin.y, timing({ from: origin.y, to: 0 })),
            ]),
          ]),
        [adjustedFocal, numberOfPointers, origin, pinch, scale, state]
      );

    return (
        <Animated.View style={{ width: SIZE, height: SIZE }}>
            <PinchGestureHandler {...pinchGestureHandler}>
                <Animated.View>
                    <Animated.View style={[
                                styles.table, 
                                {
                                    transform: [
                                        
                                        //...translate(finalPinch),
                                        //...transformOrigin(origin, {scale: finalScale}),
                                        
                                        ...translate(origin),
                                        {scale: scale},
                                        ...translate(vec.multiply(origin, -1)),
                                        ...translate(prevOrigin),
                                        {scale: prevScale},
                                        ...translate(vec.multiply(prevOrigin, -1)),
                                    ]
                                }
                            ]}>
                        <ImageBackground source={require('./assets/us-map.jpg')} style={{ width: SIZE, height: SIZE }} >
                            <Piece color="blue"/>
                            <Piece color="red"/>
                            <Text>Scale is {scale._value}</Text>
                            <Text>Focal is {focal.x._value},{focal.y._value}</Text>
                        </ImageBackground>
                    </Animated.View>
                </Animated.View>
            </PinchGestureHandler>
        </Animated.View>
        );
}

const styles = StyleSheet.create({
    table: {
      backgroundColor: 'yellow',
      height: SIZE,
      width: SIZE,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
