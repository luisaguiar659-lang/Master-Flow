import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function DashboardScreen(){
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>XCORE</Text>
      <Text style={styles.subtitle}>CENTRAL DE AUTOMAÇÃO</Text>

      <Text style={styles.welcome}>Olá, Admin 👋</Text>
      <Text style={styles.status}>Tudo funcionando perfeitamente!</Text>

      <View style={styles.grid}>
        {[
          ['1.248','Mensagens Hoje'],
          ['12','Automações Ativas'],
          ['389','Testes Gerados'],
          ['2.756','Ações Executadas']
        ].map((item,index)=>(
          <View key={index} style={styles.card}>
            <Text style={styles.number}>{item[0]}</Text>
            <Text style={styles.label}>{item[1]}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.title}>Módulos</Text>

      {['Masterflix','Automation Cloud','Master IBO'].map((name)=>(
        <View style={styles.module} key={name}>
          <Text style={styles.moduleTitle}>{name}</Text>
          <Text style={styles.online}>🟢 Online</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+ Criar automação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 container:{flex:1,backgroundColor:'#050505',padding:20},
 logo:{fontSize:42,color:'#fff',fontWeight:'900'},
 subtitle:{color:'#ff1b1b',letterSpacing:3,marginBottom:25},
 welcome:{color:'#fff',fontSize:24,fontWeight:'bold'},
 status:{color:'#999',marginBottom:20},
 grid:{flexDirection:'row',flexWrap:'wrap',gap:10},
 card:{backgroundColor:'#111',borderColor:'#ff1b1b',borderWidth:1,borderRadius:15,padding:15,width:'48%'},
 number:{color:'#fff',fontSize:28,fontWeight:'bold'},
 label:{color:'#aaa'},
 title:{color:'#fff',fontSize:24,marginVertical:20},
 module:{backgroundColor:'#111',padding:18,borderRadius:15,marginBottom:12},
 moduleTitle:{color:'#fff',fontSize:18,fontWeight:'bold'},
 online:{color:'#00ff88',marginTop:5},
 button:{backgroundColor:'#ff1b1b',padding:18,borderRadius:15,marginTop:20,marginBottom:30},
 buttonText:{color:'#fff',textAlign:'center',fontWeight:'bold',fontSize:18}
});
