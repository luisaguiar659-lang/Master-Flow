import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App(){
 return (
  <View style={styles.container}>
   <Text style={styles.logo}>XCORE</Text>
   <Text style={styles.subtitle}>Central de Automação</Text>
   <View style={styles.card}><Text style={styles.text}>Mensagens Hoje: 1.248</Text></View>
   <View style={styles.card}><Text style={styles.text}>Automações Ativas: 12</Text></View>
   <View style={styles.card}><Text style={styles.text}>Módulos Online</Text></View>
  </View>
 );
}

const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:'#050505',padding:25,justifyContent:'center'},
 logo:{color:'#fff',fontSize:48,fontWeight:'900'},
 subtitle:{color:'#ff1b1b',fontSize:18,marginBottom:30},
 card:{backgroundColor:'#151515',borderColor:'#ff1b1b',borderWidth:1,borderRadius:16,padding:20,marginBottom:15},
 text:{color:'#fff',fontSize:18}
});
