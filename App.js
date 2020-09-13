import React, {useState} from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Table from './table';


function BarButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image source={props.source} style={styles.barButton}/>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

function Bar(props) {
  return (
    <ImageBackground source={require('./assets/green_tex.jpg')} style={styles.bar}>
      <BarButton title='Scan' source={require('./assets/qr-code.png')} onPress={props.onScanPress}/>
      <BarButton title='Pause' source={require('./assets/pause.png')} onPress={props.onPausePress}/>
      <BarButton title='Reset' source={require('./assets/reset.png')} onPress={props.onResetPress}/>
    </ImageBackground>
  );
}

function ResetModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Reset will clean up the table and let you start over.</Text>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={props.onPress}
          >
            <Text style={styles.textStyle}>Reset and continue</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

function PauseModal(props) {
  return (
    <Modal
      backdropColor="#B4B3DB"
      backdropOpacity={0.8}
      animationIn="zoomOutUp"
      animationOut="zoomInDown"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Clock paused.</Text>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={props.onPress}
          >
            <Text style={styles.textStyle}>Continue</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}


export default function App() {
  const [modalResetVisible, setModalResetVisible] = useState(false);
  const [modalPauseVisible, setModalPauseVisible] = useState(false);
  const [modalScanVisible, setModalScanVisible] = useState(false);
  return (
    <View style={styles.container}>
      <ResetModal
        visible = {modalResetVisible}
        onPress={() => {
          setModalResetVisible(!modalResetVisible);
        }}
      />
      <PauseModal
        visible = {modalPauseVisible}
        onPress={() => {
          setModalPauseVisible(!modalPauseVisible);
        }}
      />
      <Table style={{height:'100%'}}></Table>
      <Bar
        onResetPress={() => {
          setModalResetVisible(!modalResetVisible);
        }}
        onPausePress={() => {
          setModalPauseVisible(!modalPauseVisible);
        }}
        onScanPress={() => {
          Alert.alert("Scan has been pressed");
        }}
      />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
