import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default function ModulesScreen(){
 return <View style={styles.container}>
  <Text style={styles.title}>Módulos</Text>
  <Text style={styles.card}>🟢 Masterflix\nStreaming e Acessos</Text>
  <Text style={styles.card}>🟢 Automation Cloud\nKeys e Ativações</Text>
  <Text style={styles.card}>🟢 Master IBO\nResets e Gerenciamento</Text>
 </View>
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:'#050505',padding:20},
 title:{color:'#fff',fontSize:28,fontWeight:'bold'},
 card:{color:'#fff',backgroundColor:'#111',padding:20,marginTop:15,borderRadius:15,borderWidth:1,borderColor:'#ff1b1b'}
});
