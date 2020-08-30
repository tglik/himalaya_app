import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  State,
  PinchGestureHandler,
} from 'react-native-gesture-handler';

import Animated, { and, add, block, cond, divide, event, eq, max, min, or, sub, Value, set, multiply, useCode} from 'react-native-reanimated';

const MIN_SCALE = 1
const MAX_SCALE = 5

export default (props) => {
    // Content dimentions
    const contentWidth = new Value(0)
    const contentHeight = new Value(0)
    
    const set_dimesions = (layout) => {
        const {x, y, width, height} = layout;
        contentWidth.setValue(width);
        contentHeight.setValue(height);
    }

    // PINCH
    const pinchScale = new Value(1);
    const pinchFocalX = new Value(0);
    const pinchFocalY = new Value(0);
    const pinchState = new Value(State.END);

    const pinchGestureHandler = event ([{ nativeEvent: {
        state: pinchState,
        scale: pinchScale,
        focalX: pinchFocalX,
        focalY: pinchFocalY,
    }}])

    // PAN
    const panX = new Value(0);
    const panY = new Value(0);
    const panState = new Value(State.END);


    const panGestureHandler = event ([{ nativeEvent: {
        translationX: panX,
        translationY: panY,
        state: panState,
    }}])

    // Prev state
    const prevScale = new Value(2)
    const prevX = new Value(100)
    const prevY = new Value(50)

    // final state
    const scale = new Value(1)
    const translationX = new Value(0)
    const translationY = new Value(0)
    const origFocalX = new Value(0)
    const origFocalY = new Value(0)

    // Distance of scaled coord to real coord frame
    const adjustedFocalX = sub(pinchFocalX, divide(contentWidth, 2))
    const adjustedFocalY = sub(pinchFocalY, divide(contentHeight, 2))
    const xInset = divide(multiply(contentWidth, add(scale, -1)), 2)
    const yInset = divide(multiply(contentHeight, add(scale, -1)), 2)

    // Set code hooks to gesture state changes
    useCode(
        () =>
            block([
                cond(eq(pinchState, State.BEGAN), [
                    set(origFocalX, adjustedFocalX),
                    set(origFocalY, adjustedFocalY),
                ]),
                cond(eq(panState, State.ACTIVE), [
                    set(translationX, add(prevX, panX)),
                    set(translationY, add(prevY, panY)),
                ]),
                cond(eq(pinchState, State.ACTIVE), [
                    set(scale, multiply(prevScale, pinchScale)),
                    set(scale, min(max(scale, MIN_SCALE), MAX_SCALE)),
                    set(translationX, sub(prevX, multiply(origFocalX, sub(scale, prevScale)))),
                    set(translationY, sub(prevY, multiply(origFocalY, sub(scale, prevScale)))),
                ]),
                set(translationX, min(max(translationX, multiply(xInset, -1)), xInset)),
                set(translationY, min(max(translationY, multiply(yInset, -1)), yInset)),
                cond(and(eq(pinchState, State.END),eq(panState, State.END)), [
                    set(prevScale, scale),
                    set(prevX, translationX),
                    set(prevY, translationY),
                ]),
            ]),
        [pinchState, panState]
    );
    
    return (
        <View  onLayout={(event) => { set_dimesions(event.nativeEvent.layout) }} style={styles.wrapper}>
            <PanGestureHandler
            onGestureEvent={panGestureHandler}
            onHandlerStateChange={panGestureHandler}
            >
                <Animated.View>
                    <PinchGestureHandler
                    onHandlerStateChange={pinchGestureHandler}
                    onGestureEvent={pinchGestureHandler}
                    >
                        <Animated.View 
                        style={{
                            transform: [
                                {translateX: translationX},
                                {translateY: translationY},
                                {scale: scale},

                                // {translateX: panX},
                                // {translateY: panY},
                                // {translateX: prevX},
                                // {translateY: prevY},
                                // {scale: prevScale},
                                // {translateX: origFocalX},
                                // {translateY: origFocalY},
                                // {scale: pinchScale},
                                // {translateX: multiply(origFocalX, -1)},
                                // {translateY: multiply(origFocalY, -1)},
                                                              
                            ]
                        }}
                        >
                            {props.children}
                        </Animated.View>
                    </PinchGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
      //borderColor: 'green',
      //borderWidth: 2,
      overflow: 'hidden',
    },
  
  });