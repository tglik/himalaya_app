import React from 'react';
import { Image, ImageBackground,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Table from './table'


function BarButton(props) {
  return (
    <TouchableOpacity>
      <Image source={props.source} style={styles.barButton}/>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

function Bar(props) {
  return (
    <ImageBackground source={require('./assets/green_tex.jpg')} style={styles.bar}>
      <BarButton title='Scan' source={require('./assets/qr-code.png')}/>
      <BarButton title='Pause' source={require('./assets/pause.png')}/>
      <BarButton title='Reset' source={require('./assets/reset.png')}/>
    </ImageBackground>
  );
}


export default function App() {
  return (
    <View style={styles.container}>
      <Table style={{height:'100%'}}></Table>
      <Bar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
  },
  barButton: {
    width: 40,
    height: 40,
  },
});
