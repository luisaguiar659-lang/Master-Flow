import React, {useState} from 'react';
import {Alert, Image, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, View, useWindowDimensions} from 'react-native';

const RED='#ff1717', BG='#050505', PANEL='#111111', MUTED='#9d9d9d', GREEN='#00ef78';
const TOP_INSET=Platform.OS==='android' ? (StatusBar.currentHeight || 24) : 10;
const BOTTOM_INSET=Platform.OS==='android' ? 28 : 10;

const stats=[
  ['▣','1.248','Mensagens Hoje'],
  ['⚙','12','Automações Ativas'],
  ['▤','389','Testes Gerados'],
  ['ϟ','2.756','Ações Executadas'],
];
const modules=[
  ['M','Masterflix','Streaming e Acessos'],
  ['CLOUD','Automation Cloud','Keys e Ativações'],
  ['IBO','Master IBO','Resets e Gerenciamento'],
];
const recent=[
  ['▣','Cliente pediu teste','Via WhatsApp','Masterflix gerou acesso','Acesso enviado com sucesso','14:26'],
  ['↻','Solicitou reset','Via Painel','IBO resetado','Dados atualizados','14:12'],
  ['☁︎','Ativação XCloud','Via WhatsApp','Key cadastrada','Ativação concluída','13:58'],
];

function Soon(name){Alert.alert(name,'A interface já está pronta. Essa função será conectada ao backend na próxima etapa.');}
function Dot({small=false}){return <View style={[s.dot,small&&s.dotSmall]}/>}
function Section({title,right}){return <View style={s.section}><View style={s.sectionLeft}><View style={s.redBar}/><Text style={s.sectionTitle}>{title}</Text></View>{right}</View>}
function CloudMark(){return <View style={s.cloudMark}><View style={[s.cloudPart,s.cloudA]}/><View style={[s.cloudPart,s.cloudB]}/><View style={[s.cloudPart,s.cloudC]}/><View style={s.cloudBase}/></View>}
function Stat({item,width}){return <View style={[s.stat,{width}]}><View style={s.statGlow}/><View style={s.iconBox}><Text style={s.icon}>{item[0]}</Text></View><Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={0.72} style={s.value}>{item[1]}</Text><Text numberOfLines={2} style={s.label}>{item[2]}</Text><View style={s.track}><View style={s.trackOn}/></View></View>}
function Module({item,width}){return <Pressable onPress={()=>Soon(item[1])} style={({pressed})=>[s.module,{width},pressed&&s.pressed]}><View style={s.cornerA}/><View style={s.cornerB}/><View style={s.moduleLogo}>{item[0]==='CLOUD'?<CloudMark/>:<Text style={[s.moduleLogoText,item[0]==='IBO'&&s.ibo]}>{item[0]}</Text>}</View><Text numberOfLines={2} style={s.moduleTitle}>{item[1]}</Text><Text numberOfLines={2} style={s.moduleSub}>{item[2]}</Text><View style={s.moduleBottom}><View style={s.online}><Dot small/><Text style={s.onlineText}>Online</Text></View><Text style={s.chev}>›</Text></View></Pressable>}
function Trigger({item,last}){return <><View style={s.trigger}><View style={s.triggerIcon}><Text style={s.triggerIconText}>{item[0]}</Text></View><View style={s.triggerSide}><Text numberOfLines={1} style={s.main}>{item[1]}</Text><Text numberOfLines={1} style={s.meta}>{item[2]}</Text></View><Text style={s.arrow}>→</Text><View style={[s.triggerSide,{flex:1.16}]}><Text numberOfLines={1} style={s.main}>{item[3]}</Text><Text numberOfLines={1} style={s.meta}>{item[4]}</Text></View><Text style={s.time}>{item[5]}</Text><Text style={s.dots}>⋮</Text></View>{!last&&<View style={s.divider}/>}</>}
function Nav({icon,label,active,badge,onPress}){return <Pressable onPress={onPress} style={s.navItem}><View><Text style={[s.navIcon,active&&s.navActive]}>{icon}</Text>{badge&&<View style={s.badge}><Text style={s.badgeText}>{badge}</Text></View>}</View><Text numberOfLines={1} style={[s.navLabel,active&&s.navLabelActive]}>{label}</Text>{active&&<View style={s.navLine}/>}</Pressable>}

export default function App(){
  const {width}=useWindowDimensions();
  const [tab,setTab]=useState('Início');
  const pad=width<390?12:16;
  const statGap=width<390?7:9;
  const moduleGap=8;
  const available=width-pad*2;
  const statW=(available-statGap*3)/4;
  const moduleW=(available-moduleGap*2)/3;

  return <View style={[s.safe,{paddingTop:TOP_INSET}]}>
    <StatusBar barStyle="light-content" backgroundColor={BG} translucent={false}/>
    <View style={s.root}>
      <ScrollView style={s.scroll} contentContainerStyle={[s.content,{paddingHorizontal:pad}]} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <View style={s.topLine}/>
          <Image source={require('./assets/xcore-header.jpg')} resizeMode="contain" style={s.logo}/>
          <Pressable onPress={()=>Soon('Notificações')} style={s.bell}><Text style={s.bellText}>♢</Text><View style={s.notify}/></Pressable>
        </View>

        <View style={s.welcome}>
          <View style={s.welcomeText}><Text style={s.hello}>Olá, <Text style={s.bold}>Admin</Text></Text><Text style={s.subHello}>Tudo funcionando perfeitamente!</Text></View>
          <View style={s.hero}><Text style={s.heroMark}>⌁</Text><View><Text style={s.heroText}>AUTOMAÇÃO</Text><Text style={s.heroText}>SEM LIMITES</Text></View></View>
        </View>

        <View style={[s.stats,{gap:statGap}]}>{stats.map((x,i)=><Stat key={i} item={x} width={statW}/>)}</View>

        <Section title="Módulos" right={<Pressable onPress={()=>Soon('Status dos módulos')} style={s.allOnline}><Dot/><Text style={s.allOnlineText}>Todos online</Text><Text style={s.chevSmall}>›</Text></Pressable>}/>
        <View style={[s.moduleRow,{gap:moduleGap}]}>{modules.map((x,i)=><Module key={i} item={x} width={moduleW}/>)}</View>

        <Section title="Gatilhos Recentes" right={<Pressable onPress={()=>Soon('Gatilhos')} style={s.allOnline}><Text style={s.allOnlineText}>Ver todos</Text><Text style={s.chevSmall}>›</Text></Pressable>}/>
        <View style={s.recent}>{recent.map((x,i)=><Trigger key={i} item={x} last={i===recent.length-1}/>)}</View>

        <Pressable onPress={()=>Soon('Criar automação')} style={({pressed})=>[s.create,pressed&&s.pressed]}><View style={s.createGlow}/><Text style={s.plus}>＋</Text><Text style={s.createText}>Criar automação</Text><Text style={s.createArrow}>›</Text></Pressable>
        <View style={s.slogan}><View style={s.sloganLine}/><Text style={s.sloganText}>MAIS AUTOMAÇÃO. MAIS RESULTADOS.</Text><View style={s.sloganLine}/></View>
      </ScrollView>

      <View style={[s.nav,{height:66+BOTTOM_INSET,paddingBottom:BOTTOM_INSET}]}><View style={s.navTop}/><Nav icon="⌂" label="Início" active={tab==='Início'} onPress={()=>setTab('Início')}/><Nav icon="ϟ" label="Gatilhos" active={tab==='Gatilhos'} onPress={()=>{setTab('Gatilhos');Soon('Gatilhos')}}/><Nav icon="▣" label="Mensagens" badge="3" active={tab==='Mensagens'} onPress={()=>{setTab('Mensagens');Soon('Mensagens')}}/><Nav icon="⚙" label="Config" active={tab==='Config'} onPress={()=>{setTab('Config');Soon('Configurações')}}/></View>
    </View>
  </View>
}

const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:BG},root:{flex:1,backgroundColor:BG},scroll:{flex:1},content:{paddingTop:4,paddingBottom:20},bold:{fontWeight:'900'},
 header:{height:74,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#261010',position:'relative',overflow:'hidden'},topLine:{position:'absolute',top:0,left:'35%',width:'30%',height:2,backgroundColor:RED,shadowColor:RED,shadowOpacity:1,shadowRadius:10,elevation:8},logo:{width:225,height:63,marginLeft:-5},bell:{width:42,height:42,borderRadius:11,borderWidth:1,borderColor:'#464646',backgroundColor:'#111',alignItems:'center',justifyContent:'center',position:'relative'},bellText:{color:'#ddd',fontSize:25,lineHeight:28},notify:{position:'absolute',right:6,top:6,width:8,height:8,borderRadius:4,backgroundColor:RED},
 welcome:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:8,marginTop:14,marginBottom:14},welcomeText:{flex:1,minWidth:0},hello:{color:'#f5f5f5',fontSize:25},subHello:{color:MUTED,fontSize:12,marginTop:2},hero:{width:126,minHeight:64,borderWidth:1,borderColor:RED,backgroundColor:'#100505',paddingHorizontal:9,paddingVertical:9,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:6,transform:[{skewX:'-7deg'}]},heroMark:{color:RED,fontSize:24,fontWeight:'800',transform:[{skewX:'7deg'}]},heroText:{color:'#eee',fontSize:8,fontWeight:'900',letterSpacing:1.7,transform:[{skewX:'7deg'}]},
 stats:{flexDirection:'row',marginBottom:19},stat:{height:126,backgroundColor:PANEL,borderWidth:1,borderColor:'#4b4b4b',borderRadius:12,paddingHorizontal:8,paddingVertical:9,overflow:'hidden'},statGlow:{position:'absolute',width:62,height:62,right:-24,bottom:-20,borderRadius:40,backgroundColor:RED,opacity:.12},iconBox:{width:32,height:32,borderRadius:8,borderWidth:1,borderColor:'#841414',backgroundColor:'#130707',alignItems:'center',justifyContent:'center',marginBottom:7},icon:{color:'#ff3b3b',fontWeight:'900',fontSize:16},value:{color:'#fff',fontSize:20,lineHeight:23,fontWeight:'900'},label:{color:'#ddd',fontSize:8.7,lineHeight:11,minHeight:22,marginTop:2},track:{height:3,backgroundColor:'#242424',borderRadius:3,marginTop:6},trackOn:{width:'68%',height:'100%',backgroundColor:RED,borderRadius:3},
 section:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:1,marginBottom:10},sectionLeft:{flexDirection:'row',alignItems:'center',flexShrink:1},redBar:{width:4,height:28,borderRadius:2,backgroundColor:RED,marginRight:9},sectionTitle:{color:'#fff',fontSize:21,fontWeight:'900'},allOnline:{flexDirection:'row',alignItems:'center',gap:5},allOnlineText:{color:'#d8d8d8',fontSize:11},dot:{width:9,height:9,borderRadius:5,backgroundColor:GREEN},dotSmall:{width:7,height:7,borderRadius:4},chevSmall:{color:'#aaa',fontSize:21,lineHeight:22},
 moduleRow:{flexDirection:'row',marginBottom:20},module:{height:176,backgroundColor:'#0d0d0d',borderWidth:1,borderColor:'#505050',borderRadius:12,paddingHorizontal:9,paddingVertical:10,overflow:'hidden'},cornerA:{position:'absolute',right:-8,top:13,width:39,height:2,backgroundColor:RED,transform:[{rotate:'45deg'}]},cornerB:{position:'absolute',right:9,top:-5,width:2,height:39,backgroundColor:RED,transform:[{rotate:'45deg'}]},moduleLogo:{height:52,alignItems:'center',justifyContent:'center',marginBottom:4},moduleLogoText:{color:'#e72d2d',fontSize:43,lineHeight:50,fontWeight:'900',textShadowColor:'#6b0808',textShadowRadius:6},ibo:{color:'#eee',fontSize:27,fontStyle:'italic'},moduleTitle:{color:'#fff',fontSize:12.8,lineHeight:15,fontWeight:'900',minHeight:30},moduleSub:{color:'#979797',fontSize:8.8,lineHeight:11,marginTop:1,minHeight:23},moduleBottom:{flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'},online:{borderWidth:1,borderColor:'#12462d',backgroundColor:'#071a10',borderRadius:16,paddingHorizontal:7,paddingVertical:4,flexDirection:'row',alignItems:'center',gap:4},onlineText:{color:GREEN,fontSize:9.5},chev:{color:'#ddd',fontSize:24,lineHeight:23},
 cloudMark:{width:54,height:36,position:'relative'},cloudPart:{position:'absolute',borderWidth:2,borderColor:'#ff3737',backgroundColor:'#0f0f0f'},cloudA:{width:25,height:25,borderRadius:14,left:4,top:10},cloudB:{width:30,height:30,borderRadius:16,left:15,top:3},cloudC:{width:23,height:23,borderRadius:13,right:2,top:11},cloudBase:{position:'absolute',left:7,right:5,bottom:1,height:14,borderWidth:2,borderColor:'#ff3737',backgroundColor:'#0f0f0f',borderRadius:8},
 recent:{borderWidth:1,borderColor:'#414141',borderRadius:12,backgroundColor:'#0b0b0b',overflow:'hidden',marginBottom:17},trigger:{minHeight:67,paddingHorizontal:7,paddingVertical:9,flexDirection:'row',alignItems:'center',gap:5},triggerIcon:{width:34,height:34,borderRadius:18,borderWidth:1,borderColor:RED,backgroundColor:'#100606',alignItems:'center',justifyContent:'center'},triggerIconText:{color:'#ff3c3c',fontSize:14,fontWeight:'900'},triggerSide:{flex:1,minWidth:0},main:{color:'#f2f2f2',fontSize:10.5,fontWeight:'800'},meta:{color:'#929292',fontSize:8.7,marginTop:2},arrow:{color:RED,fontSize:18},time:{color:'#999',fontSize:8.5,width:31},dots:{color:'#bdbdbd',fontSize:19},divider:{height:1,backgroundColor:'#292929',marginLeft:47},
 create:{minHeight:66,borderWidth:1.5,borderColor:'#ff3838',backgroundColor:'#360606',borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'center',overflow:'hidden',marginBottom:15},createGlow:{position:'absolute',width:'66%',height:90,top:-25,left:'17%',borderRadius:60,backgroundColor:RED,opacity:.17},plus:{color:'#fff',fontSize:34,fontWeight:'300',marginRight:9},createText:{color:'#fff',fontSize:18,fontWeight:'900'},createArrow:{color:'#fff',fontSize:29,marginLeft:10},pressed:{opacity:.76},
 slogan:{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8,marginBottom:2},sloganLine:{width:22,height:2,backgroundColor:RED},sloganText:{color:'#bdbdbd',fontSize:7.2,fontWeight:'800',letterSpacing:1.6},
 nav:{backgroundColor:'#090909',borderTopWidth:1,borderTopColor:'#3b3b3b',flexDirection:'row',alignItems:'stretch',justifyContent:'space-around',paddingHorizontal:3,position:'relative'},navTop:{position:'absolute',top:-1,left:'8%',width:'17%',height:2,backgroundColor:RED},navItem:{flex:1,alignItems:'center',justifyContent:'center',position:'relative',paddingTop:5},navIcon:{color:'#989898',fontSize:23,fontWeight:'700',lineHeight:25},navActive:{color:'#fff',textShadowColor:RED,textShadowRadius:7},navLabel:{color:'#a1a1a1',fontSize:9.5,marginTop:1},navLabelActive:{color:'#fff',fontWeight:'800'},navLine:{position:'absolute',bottom:4,width:34,height:2,borderRadius:2,backgroundColor:RED},badge:{position:'absolute',right:-10,top:-7,minWidth:17,height:17,borderRadius:9,backgroundColor:RED,alignItems:'center',justifyContent:'center',paddingHorizontal:3},badgeText:{color:'#fff',fontSize:9,fontWeight:'900'}
});
