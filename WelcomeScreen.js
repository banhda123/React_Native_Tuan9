import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,TextInput } from 'react-native';

const WelcomeScreen = ({navigation}) => {
  const [name, setName] = useState('')
 
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require('./images/note.png')} style={styles.headerImg} />
      </View>

      <View style={styles.body}>
        <Text style={styles.bodyText}>MANAGE YOUR TASK</Text>
      </View>

      <View style={styles.searchInput}>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your name'
          placeholderTextColor={'#999'}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn}
          onPress={() => navigation.navigate('TaskList', {name})}
        
        >GET STARTED</TouchableOpacity>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal:10,
  },

  header: {
    flex: 2,
  },

  headerImg: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginTop:100,
  },


  body: {
    flex:1,
  },

  bodyText: {
    fontWeight: "bold",
    fontSize: 29,
    color: "#8353E2",
    alignSelf: "center",
    marginTop:50,
  },

  searchInput: {
    flex:1,
  },

  TextInput: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal:10,
  },

  footer: {
    flex:1,
  },

  footerBtn: {
    color: 'white',
    width: "35%",
    alignSelf: "center",
    backgroundColor: '#00BDD6',
    textAlign: "center",
    padding: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth:1,
  }

});

export default WelcomeScreen