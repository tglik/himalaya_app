import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import ZoomPanView from './myzoompanview'


function Piece(props) {
    return (
        <View style={{ backgroundColor: props.color, width: 30, height: 30 }} />
    );
}

const { width, height } = Dimensions.get("window");
const SIZE = width;

export default (props) => {
    
    return (
        <Animated.View style={styles.table}>
            <ZoomPanView>
                <ImageBackground source={require('./assets/us-map.jpg')} style={styles.backimage}>
                    <Piece color="red"/>
                    <Piece color="blue"/>
                </ImageBackground>
            </ZoomPanView>
        </Animated.View>
        );
}

const styles = StyleSheet.create({
    table: {
        backgroundColor: '#fff',
        height: 650,
        width: 415,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'silver',
        borderWidth: 2,
        overflow: 'hidden',
    },
    backimage: {
        height: 650,
        width: 415,
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
