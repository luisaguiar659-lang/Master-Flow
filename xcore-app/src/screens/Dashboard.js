import React from 'react';
import { View, Text } from 'react-native';

export default function Dashboard(){
  return (
    <View style={{flex:1,backgroundColor:'#050505',padding:20}}>
      <Text style={{color:'#fff',fontSize:40,fontWeight:'bold'}}>XCORE</Text>
      <Text style={{color:'#ff1b1b'}}>Central de Automação</Text>

      <Text style={{color:'#fff',marginTop:30,fontSize:20}}>Olá, Admin</Text>

      <Text style={{color:'#fff',marginTop:20}}>📩 Mensagens Hoje</Text>
      <Text style={{color:'#fff'}}>⚡ Automações Ativas</Text>
      <Text style={{color:'#fff'}}>🎯 Testes Gerados</Text>
      <Text style={{color:'#fff'}}>🚀 Ações Executadas</Text>

      <Text style={{color:'#fff',marginTop:30,fontSize:22}}>Módulos</Text>
      <Text style={{color:'#fff'}}>Masterflix 🟢</Text>
      <Text style={{color:'#fff'}}>Automation Cloud 🟢</Text>
      <Text style={{color:'#fff'}}>Master IBO 🟢</Text>
    </View>
  );
}
