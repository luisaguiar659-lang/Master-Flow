import React, {useState} from 'react';
import {Alert, Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, useWindowDimensions} from 'react-native';

const RED='#ff1717', BG='#050505', PANEL='#151515', MUTED='#9d9d9d', GREEN='#00ef78';

const stats=[
  ['▣','1.248','Mensagens Hoje'],
  ['⚙','12','Automações Ativas'],
  ['▤','389','Testes Gerados'],
  ['ϟ','2.756','Ações Executadas'],
];
const modules=[
  ['M','Masterflix','Streaming e Acessos'],
  ['☁','Automation Cloud','Keys e Ativações'],
  ['IBO','Master IBO','Resets e Gerenciamento'],
];
const recent=[
  ['▣','Cliente pediu teste','Via WhatsApp','Masterflix gerou acesso','Acesso enviado com sucesso','14:26'],
  ['↻','Solicitou reset','Via Painel','IBO resetado','Dados atualizados','14:12'],
  ['☁','Ativação XCloud','Via WhatsApp','Key cadastrada','Ativação concluída','13:58'],
];

function Soon(name){Alert.alert(name,'A interface já está pronta. Essa função será conectada ao backend na próxima etapa.');}
function Dot(){return <View style={s.dot}/>}
function Section({title,right}){return <View style={s.section}><View style={s.sectionLeft}><View style={s.redBar}/><Text style={s.sectionTitle}>{title}</Text></View>{right}</View>}
function Stat({item,width}){return <View style={[s.stat,{width}]}><View style={s.statGlow}/><View style={s.iconBox}><Text style={s.icon}>{item[0]}</Text></View><Text style={s.value}>{item[1]}</Text><Text numberOfLines={1} style={s.label}>{item[2]}</Text><View style={s.track}><View style={s.trackOn}/></View></View>}
function Module({item}){return <Pressable onPress={()=>Soon(item[1])} style={({pressed})=>[s.module,pressed&&s.pressed]}><View style={s.corner}/><View style={s.moduleLogo}><Text style={[s.moduleLogoText,item[0]==='IBO'&&s.ibo]}>{item[0]}</Text></View><Text style={s.moduleTitle}>{item[1]}</Text><Text style={s.moduleSub}>{item[2]}</Text><View style={s.moduleBottom}><View style={s.online}><Dot/><Text style={s.onlineText}>Online</Text></View><Text style={s.chev}>›</Text></View></Pressable>}
function Trigger({item,last}){return <><View style={s.trigger}><View style={s.triggerIcon}><Text style={s.triggerIconText}>{item[0]}</Text></View><View style={s.side}><Text numberOfLines={1} style={s.main}>{item[1]}</Text><Text numberOfLines={1} style={s.meta}>{item[2]}</Text></View><Text style={s.arrow}>→</Text><View style={s.side}><Text numberOfLines={1} style={s.main}>{item[3]}</Text><Text numberOfLines={1} style={s.meta}>{item[4]}</Text></View><Text style={s.time}>{item[5]}</Text><Text style={s.dots}>⋮</Text></View>{!last&&<View style={s.divider}/>}</>}
function Nav({icon,label,active,badge,onPress}){return <Pressable onPress={onPress} style={s.navItem}><View><Text style={[s.navIcon,active&&s.navActive]}>{icon}</Text>{badge&&<View style={s.badge}><Text style={s.badgeText}>{badge}</Text></View>}</View><Text style={[s.navLabel,active&&s.navLabelActive]}>{label}</Text>{active&&<View style={s.navLine}/>}</Pressable>}

export default function App(){
  const {width}=useWindowDimensions();
  const [tab,setTab]=useState('Início');
  const pad=width>=700?30:16, gap=10, perRow=width>=700?4:2;
  const statW=(width-pad*2-gap*(perRow-1))/perRow;
  return <SafeAreaView style={s.safe}>
    <StatusBar barStyle="light-content" backgroundColor={BG}/>
    <View style={s.root}>
      <ScrollView style={s.scroll} contentContainerStyle={[s.content,{paddingHorizontal:pad}]} showsVerticalScrollIndicator={false}>
        <View style={s.top}><View style={s.topLine}/><View style={s.logoRow}><Image source={require('./assets/xcore-header.jpg')} resizeMode="contain" style={[s.logo,{width:Math.min(width-pad*2-58,520)}]}/><Pressable onPress={()=>Soon('Notificações')} style={s.bell}><Text style={s.bellText}>♢</Text><View style={s.notify}/></Pressable></View></View>

        <View style={s.welcome}><View style={{flex:1}}><Text style={s.hello}>Olá, <Text style={{fontWeight:'900'}}>Admin</Text></Text><Text style={s.subHello}>Tudo funcionando perfeitamente!</Text></View><View style={s.hero}><Text style={s.heroMark}>⌁</Text><View><Text style={s.heroText}>AUTOMAÇÃO</Text><Text style={s.heroText}>SEM LIMITES</Text></View></View></View>

        <View style={[s.stats,{gap}]}>{stats.map((x,i)=><Stat key={i} item={x} width={statW}/>)}</View>

        <Section title="Módulos" right={<Pressable onPress={()=>Soon('Status dos módulos')} style={s.allOnline}><Dot/><Text style={s.allOnlineText}>Todos online</Text><Text style={s.chevSmall}>›</Text></Pressable>}/>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.moduleRow}>{modules.map((x,i)=><Module key={i} item={x}/>)}</ScrollView>

        <Section title="Gatilhos Recentes" right={<Pressable onPress={()=>Soon('Gatilhos')} style={s.allOnline}><Text style={s.allOnlineText}>Ver todos</Text><Text style={s.chevSmall}>›</Text></Pressable>}/>
        <View style={s.recent}>{recent.map((x,i)=><Trigger key={i} item={x} last={i===recent.length-1}/>)}</View>

        <Pressable onPress={()=>Soon('Criar automação')} style={({pressed})=>[s.create,pressed&&s.pressed]}><View style={s.createGlow}/><Text style={s.plus}>＋</Text><Text style={s.createText}>Criar automação</Text><Text style={s.createArrow}>›</Text></Pressable>
        <View style={s.slogan}><View style={s.sloganLine}/><Text style={s.sloganText}>MAIS AUTOMAÇÃO. MAIS RESULTADOS.</Text><View style={s.sloganLine}/></View>
      </ScrollView>

      <View style={s.nav}><View style={s.navTop}/><Nav icon="⌂" label="Início" active={tab==='Início'} onPress={()=>setTab('Início')}/><Nav icon="ϟ" label="Gatilhos" active={tab==='Gatilhos'} onPress={()=>{setTab('Gatilhos');Soon('Gatilhos')}}/><Nav icon="▣" label="Mensagens" badge="3" active={tab==='Mensagens'} onPress={()=>{setTab('Mensagens');Soon('Mensagens')}}/><Nav icon="⚙" label="Config" active={tab==='Config'} onPress={()=>{setTab('Config');Soon('Configurações')}}/></View>
    </View>
  </SafeAreaView>
}

const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:BG},root:{flex:1,backgroundColor:BG},scroll:{flex:1},content:{paddingTop:8,paddingBottom:22},
 top:{backgroundColor:'#070707',borderBottomWidth:1,borderBottomColor:'#2b1010',marginHorizontal:-30,paddingHorizontal:30,paddingBottom:8,overflow:'hidden'},topLine:{position:'absolute',top:0,left:'33%',width:'34%',height:3,backgroundColor:RED,shadowColor:RED,shadowOpacity:1,shadowRadius:12,elevation:8},logoRow:{minHeight:94,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},logo:{aspectRatio:535/150,maxHeight:92},bell:{width:48,height:48,borderRadius:12,borderWidth:1,borderColor:'#444',backgroundColor:'#121212',alignItems:'center',justifyContent:'center',position:'relative',elevation:4},bellText:{color:'#ddd',fontSize:29,marginTop:-3},notify:{position:'absolute',right:8,top:7,width:9,height:9,borderRadius:5,backgroundColor:RED,borderWidth:2,borderColor:'#4d0000'},
 welcome:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12,marginTop:18,marginBottom:16},hello:{color:'#f3f3f3',fontSize:26},subHello:{color:MUTED,fontSize:14,marginTop:3},hero:{minWidth:138,borderWidth:1,borderColor:RED,backgroundColor:'#100505',paddingHorizontal:12,paddingVertical:10,flexDirection:'row',alignItems:'center',gap:8,transform:[{skewX:'-8deg'}],elevation:6},heroMark:{color:RED,fontSize:28,fontWeight:'800',transform:[{skewX:'8deg'}]},heroText:{color:'#eee',fontSize:9,fontWeight:'900',letterSpacing:2.1,transform:[{skewX:'8deg'}]},
 stats:{flexDirection:'row',flexWrap:'wrap',marginBottom:22},stat:{minHeight:154,backgroundColor:PANEL,borderWidth:1,borderColor:'#555',borderRadius:14,padding:14,overflow:'hidden',elevation:5},statGlow:{position:'absolute',width:85,height:85,right:-30,bottom:-30,borderRadius:50,backgroundColor:RED,opacity:.13},iconBox:{width:42,height:42,borderRadius:10,borderWidth:1,borderColor:'#8a1111',backgroundColor:'#120707',alignItems:'center',justifyContent:'center',marginBottom:9,elevation:4},icon:{color:'#ff3b3b',fontWeight:'900',fontSize:20},value:{color:'#fff',fontSize:29,lineHeight:32,fontWeight:'900'},label:{color:'#ddd',fontSize:12,marginTop:3},track:{width:'78%',height:4,backgroundColor:'#242424',borderRadius:3,marginTop:12},trackOn:{width:'68%',height:'100%',backgroundColor:RED,borderRadius:3},
 section:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:4,marginBottom:12},sectionLeft:{flexDirection:'row',alignItems:'center'},redBar:{width:5,height:31,borderRadius:2,backgroundColor:RED,marginRight:10,elevation:5},sectionTitle:{color:'#fff',fontSize:25,fontWeight:'900'},allOnline:{flexDirection:'row',alignItems:'center',gap:7},allOnlineText:{color:'#d8d8d8',fontSize:13},dot:{width:10,height:10,borderRadius:5,backgroundColor:GREEN,elevation:4},chevSmall:{color:'#aaa',fontSize:25,lineHeight:25},
 moduleRow:{gap:12,paddingBottom:25},module:{width:218,height:215,backgroundColor:'#0d0d0d',borderWidth:1,borderColor:'#595959',borderRadius:14,padding:15,overflow:'hidden',elevation:5},corner:{position:'absolute',right:-12,top:-12,width:54,height:54,borderLeftWidth:3,borderBottomWidth:3,borderColor:RED,backgroundColor:'#210707',transform:[{rotate:'45deg'}]},moduleLogo:{height:86,alignItems:'center',justifyContent:'center'},moduleLogoText:{color:'#e62b2b',fontSize:64,lineHeight:74,fontWeight:'900',textShadowColor:RED,textShadowRadius:12},ibo:{color:'#eee',fontSize:41,fontStyle:'italic'},moduleTitle:{color:'#fff',fontSize:19,fontWeight:'800'},moduleSub:{color:'#aaa',fontSize:12,marginTop:2},moduleBottom:{flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'},online:{borderWidth:1,borderColor:'#12462d',backgroundColor:'#071a10',borderRadius:20,paddingHorizontal:11,paddingVertical:5,flexDirection:'row',alignItems:'center',gap:7},onlineText:{color:GREEN,fontSize:12},chev:{color:'#ddd',fontSize:29,lineHeight:27},
 recent:{borderWidth:1,borderColor:'#484848',borderRadius:14,backgroundColor:'#0c0c0c',overflow:'hidden',marginBottom:22},trigger:{minHeight:84,paddingHorizontal:10,paddingVertical:12,flexDirection:'row',alignItems:'center',gap:7},triggerIcon:{width:42,height:42,borderRadius:21,borderWidth:1,borderColor:RED,backgroundColor:'#100606',alignItems:'center',justifyContent:'center',elevation:3},triggerIconText:{color:'#ff3c3c',fontSize:18,fontWeight:'900'},side:{flex:1,minWidth:0},main:{color:'#f2f2f2',fontSize:13,fontWeight:'800'},meta:{color:'#929292',fontSize:11,marginTop:2},arrow:{color:RED,fontSize:24,fontWeight:'300'},time:{color:'#999',fontSize:11},dots:{color:'#bdbdbd',fontSize:23},divider:{height:1,backgroundColor:'#2b2b2b',marginLeft:60},
 create:{minHeight:78,borderWidth:2,borderColor:'#ff3838',backgroundColor:'#3c0707',borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'center',overflow:'hidden',elevation:10,marginBottom:21},createGlow:{position:'absolute',width:'72%',height:120,top:-32,left:'14%',borderRadius:70,backgroundColor:RED,opacity:.18},plus:{color:'#fff',fontSize:41,fontWeight:'300',marginRight:12},createText:{color:'#fff',fontSize:21,fontWeight:'900'},createArrow:{color:'#fff',fontSize:34,marginLeft:14},pressed:{opacity:.78},
 slogan:{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10},sloganLine:{width:26,height:2,backgroundColor:RED},sloganText:{color:'#bdbdbd',fontSize:8,fontWeight:'800',letterSpacing:2.1},
 nav:{height:82,backgroundColor:'#0b0b0b',borderTopWidth:1,borderTopColor:'#4b4b4b',flexDirection:'row',alignItems:'stretch',justifyContent:'space-around',paddingHorizontal:4,paddingBottom:4,position:'relative'},navTop:{position:'absolute',top:-1,left:'14%',width:'18%',height:2,backgroundColor:RED,elevation:4},navItem:{flex:1,alignItems:'center',justifyContent:'center',position:'relative'},navIcon:{color:'#a1a1a1',fontSize:26,fontWeight:'700',lineHeight:29},navActive:{color:'#fff',textShadowColor:RED,textShadowRadius:9},navLabel:{color:'#a1a1a1',fontSize:11,marginTop:2},navLabelActive:{color:'#fff',fontWeight:'800'},navLine:{position:'absolute',bottom:1,width:42,height:3,borderRadius:2,backgroundColor:RED},badge:{position:'absolute',right:-11,top:-7,minWidth:18,height:18,borderRadius:9,backgroundColor:RED,alignItems:'center',justifyContent:'center',paddingHorizontal:4},badgeText:{color:'#fff',fontSize:10,fontWeight:'900'}
});
