import React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Animated, {add, and, block, Clock, clockRunning, cond, eq, event, not, set, Value, useCode} from 'react-native-reanimated';
import ZoomPanView from './zoompanview'
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import {timing} from 'react-native-redash';


const ROT_90 = 1.5708
const ROT_360 = 6.28319

function Piece(props) {
    // PAN
    const panX = new Value(0);
    const panY = new Value(0);
    const panState = new Value(State.END);
    const prevX = new Value(0);
    const prevY = new Value(0); 
    const translationX = new Value(0);
    const translationY = new Value(0); 
    const tapState = new Value(State.UNDETERMINED);
    const tapRotate = new Value(0);
    const prevRotate = new Value(0)
    const shadowOpacity = new Value(0);
    const zIndex = new Value(0)
    const rotate = new Value(0)
    const clock = new Clock()


    const panGestureHandler = event ([{ nativeEvent: {
        translationX: panX,
        translationY: panY,
        state: panState,
    }}])

    const tapGestureHandler = event ([{ nativeEvent: {
        state: tapState,
    }}])

    useCode(
        () =>
            block([
                cond(and(eq(tapState, State.BEGAN), not(clockRunning(clock))), [
                    set(prevRotate, rotate)
                ]),
                cond(eq(tapState, State.END), [
                    set(tapRotate, timing( {clock,  from:0, to: ROT_90 , duration: 250})),
                    set(rotate, add(prevRotate, tapRotate), ROT_360),
                ]),
                cond(eq(panState, State.ACTIVE), [
                    set(translationX, add(prevX, panX)),
                    set(translationY, add(prevY, panY)),
                    set(shadowOpacity, 0.5),
                    set(zIndex, 10),
                ]),
                cond(eq(panState, State.END), [
                    set(prevX, translationX),
                    set(prevY, translationY),
                    set(shadowOpacity, 0),
                    set(zIndex, 0),
                ]),
            ]),
        [panState, tapState]
    );

    return (
        <Animated.View  style={{
            shadowColor: 'black',
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: shadowOpacity,
            shadowRadius: 1,
            zIndex: zIndex,
        }}>
            <PanGestureHandler onGestureEvent={panGestureHandler} onHandlerStateChange={panGestureHandler}>
                <Animated.View style={{
                    transform: [
                        {translateX: translationX},
                        {translateY: translationY},
                    ]}}>
                    <TapGestureHandler onGestureEvent={tapGestureHandler} onHandlerStateChange={tapGestureHandler} numberOfTaps={1}>
                        <Animated.Image source={props.source} style={
                            { width: 30, 
                            height: 30, 
                            resizeMode: 'stretch',
                            transform: [
                                {rotate: rotate},
                            ]}}/>
                    </TapGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    );
}

const { width, height } = Dimensions.get("window");
const SIZE = width;

export default (props) => {
    
    return (
        <Animated.View style={styles.table}>
            <ZoomPanView>
                <ImageBackground source={require('./assets/green_tex.jpg')} style={styles.backimage}>
                    <Piece source={require('./assets/piece1.jpg')}/>
                    <Piece source={require('./assets/piece2.jpg')}/>
                    <Piece source={require('./assets/piece3.jpg')}/>
                    <Piece source={require('./assets/piece4.jpg')}/>
                    <Piece source={require('./assets/piece5.jpg')}/>
                    <Piece source={require('./assets/piece6.jpg')}/>
                    <Piece source={require('./assets/piece7.jpg')}/>
                    <Piece source={require('./assets/piece8.jpg')}/>
                    <Piece source={require('./assets/piece9.jpg')}/>
                </ImageBackground>
            </ZoomPanView>
        </Animated.View>
        );
}

const styles = StyleSheet.create({
    table: {
        backgroundColor: '#fff',
        // height: 650,
        // width: 415,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'silver',
        borderWidth: 2,
        overflow: 'hidden',
    },
    backimage: {
        height: 750,
        width: 415,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'stretch',
    }
  });
