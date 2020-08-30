import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import ZoomPanView from './zoompanview'


function Piece(props) {
    return (
        <View  >
            <Image source={props.source} style={{ width: 30, height: 30, resizeMode: 'stretch'}}/>
        </View>
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
