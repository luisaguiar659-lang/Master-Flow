import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BottomNavigation(){
 return (
  <View style={styles.bar}>
   <Text style={styles.active}>⌂\nInício</Text>
   <Text style={styles.item}>⚡\nGatilhos</Text>
   <Text style={styles.item}>💬\nMensagens</Text>
   <Text style={styles.item}>⚙\nConfig</Text>
  </View>
 );
}

const styles=StyleSheet.create({
 bar:{position:'absolute',bottom:0,left:0,right:0,height:75,backgroundColor:'#101010',flexDirection:'row',justifyContent:'space-around',alignItems:'center',borderTopWidth:1,borderColor:'#ff1b1b'},
 item:{color:'#888',textAlign:'center',fontSize:12},
 active:{color:'#ff1b1b',textAlign:'center',fontSize:12}
});
