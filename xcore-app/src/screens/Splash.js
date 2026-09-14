import React from 'react';
import { View, Text } from 'react-native';

export default function Splash(){
  return (
    <View style={{flex:1,backgroundColor:'#050505',alignItems:'center',justifyContent:'center'}}>
      <Text style={{color:'#fff',fontSize:48,fontWeight:'900'}}>XCORE</Text>
      <Text style={{color:'#ff1b1b',marginTop:10}}>CENTRAL DE AUTOMAÇÃO</Text>
    </View>
  );
}
