import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  State,
  PinchGestureHandler,
} from 'react-native-gesture-handler';

import Animated, { add, block, cond, divide, event, eq, max, min, Value, set, multiply, useCode} from 'react-native-reanimated';

const MIN_SCALE = 1
const MAX_SCALE = 5

export default (props) => {
    const contentWidth = new Value(0)
    const contentHeight = new Value(650)
    
    // PINCH
    const pinchScale = new Value(1);
    const pinchFocalX = new Value(0);
    const pinchFocalY = new Value(0);
    const pinchState = new Value(State.UNDETERMINED);

    const pinchGestureHandler = event ([{ nativeEvent: {
        state: pinchState,
        scale: pinchScale,
        focalX: pinchFocalX,
        focalY: pinchFocalY,
    }}])

    // PAN
    const panX = new Value(0);
    const panY = new Value(0);
    const panState = new Value(State.UNDETERMINED);


    const panGestureHandler = event ([{ nativeEvent: {
        translationX: panX,
        translationY: panY,
        state: panState,
    }}])

    // Prev state
    const prevScale = new Value(1)
    const prevX = new Value(0)
    const prevY = new Value(0)

    // final state
    const scale = new Value(1)
    const translationX = new Value(0)
    const translationY = new Value(0)

    // Set dimention changes
    const find_dimesions = (layout) => {
        const {x, y, width, height} = layout;
        contentWidth.setValue(width);
        contentHeight.setValue(height);
    }

    const xInset = divide(multiply(contentWidth, add(scale, -1)), 2)
    const yInset = divide(multiply(contentHeight, add(scale, -1)), 2)

    useCode(
        () =>
            block([
                cond(eq(pinchState, State.ACTIVE), [
                    set(scale, min(max(multiply(prevScale, pinchScale), MIN_SCALE), MAX_SCALE)),
                ]),
                cond(eq(pinchState, State.END), [
                    set(prevScale, scale),
                ]),
                cond(eq(panState, State.ACTIVE), [
                    set(translationX, min(max(add(prevX, panX), multiply(xInset, -1)), xInset)),
                    set(translationY, min(max(add(prevY, panY), multiply(yInset, -1)), yInset)),
                ]),
                cond(eq(panState, State.END), [
                    set(prevX, translationX),
                    set(prevY, translationY),
                ]),
            ]),
        [pinchState, panState]
    );
    
    return (
        <View  onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }} style={styles.wrapper}>
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
                            transform: [{ 
                                translateX: translationX,
                                translateY: translationY,
                                scale: scale 
                            }]
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