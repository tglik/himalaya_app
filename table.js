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
    const panX = new Value();
    const panY = new Value(0);
    const panState = new Value(State.END);
    const prevX = new Value(0);
    const prevY = new Value(0); 
    const translationX = new Value(Math.floor(Math.random() * 100) - 50);
    const translationY = new Value(Math.floor(Math.random() * 100) - 50); 
    const tapState = new Value(State.UNDETERMINED);
    const tapRotate = new Value(0);
    const prevRotate = new Value(0)
    const shadowOpacity = new Value(0);
    const zIndex = new Value(0)
    const rotate = new Value(Math.floor(Math.random() * 4) * ROT_90)
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
                    set(rotate, add(prevRotate, tapRotate)),
                ]),
                cond(eq(panState, State.ACTIVE), [
                    set(translationX, add(prevX, panX)),
                    set(translationY, add(prevY, panY)),
                    set(shadowOpacity, 0.5),
                    set(zIndex, 100),
                ]),
                cond(eq(panState, State.END), [
                    set(prevX, translationX),
                    set(prevY, translationY),
                    set(shadowOpacity, 0),
                    set(zIndex, 10),
                ]),
            ]),
        [panState, tapState]
    );

    return (
        <PanGestureHandler onGestureEvent={panGestureHandler} onHandlerStateChange={panGestureHandler}>
            <Animated.View style={[styles.piece, {
                shadowOpacity: shadowOpacity,
                zIndex: zIndex,
                transform: [
                    {translateX: translationX},
                    {translateY: translationY},
                ]}]}>
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
    );
}

export default (props) => {
    
    return (
        <ZoomPanView style={styles.table}>
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
        );
}

const styles = StyleSheet.create({
    table: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'silver',
        borderWidth: 1,
        overflow: 'hidden',
    },
    backimage: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //resizeMode: 'stretch',
    },
    piece: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 1,
        // borderColor: 'red',
        // borderWidth: 1,
    }
  });
