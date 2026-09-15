import React, {useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const RED = '#ff1717';
const BG = '#050505';
const PANEL = '#101010';
const MUTED = '#9b9b9b';
const GREEN = '#00ef78';
const TOP_INSET = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 10;
const BOTTOM_INSET = Platform.OS === 'android' ? 28 : 10;

const stats = [
  ['▣', '1.248', 'Mensagens Hoje'],
  ['⚙', '12', 'Automações Ativas'],
  ['▤', '389', 'Testes Gerados'],
  ['ϟ', '2.756', 'Ações Executadas'],
];

const modules = [
  ['M', 'Masterflix', 'Streaming e Acessos'],
  ['CLOUD', 'Automation Cloud', 'Keys e Ativações'],
  ['IBO', 'Master IBO', 'Resets e Gerenciamento'],
];

const recent = [
  ['▣', 'Cliente pediu teste', 'Via WhatsApp', 'Masterflix gerou acesso', 'Acesso enviado com sucesso', '14:26'],
  ['↻', 'Solicitou reset', 'Via Painel', 'IBO resetado', 'Dados atualizados', '14:12'],
  ['☁', 'Ativação XCloud', 'Via WhatsApp', 'Key cadastrada', 'Ativação concluída', '13:58'],
];

function Soon(name) {
  Alert.alert(name, 'Essa função será conectada ao backend na próxima etapa.');
}

function Dot({small = false}) {
  return <View style={[styles.dot, small && styles.dotSmall]} />;
}

function Brand() {
  return (
    <View style={styles.brand}>
      <Image source={require('./assets/icon.png')} style={styles.brandImage} resizeMode="cover" />
      <View style={styles.brandText}>
        <View style={styles.brandRow}>
          <Text style={styles.brandX}>X</Text>
          <Text style={styles.brandCore}>CORE</Text>
        </View>
        <Text style={styles.brandSub}>CENTRAL DE AUTOMAÇÃO</Text>
      </View>
    </View>
  );
}

function Section({title, right}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionLeft}>
        <View style={styles.redBar} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

function CloudMark() {
  return (
    <View style={styles.cloudMark}>
      <View style={[styles.cloudPart, styles.cloudA]} />
      <View style={[styles.cloudPart, styles.cloudB]} />
      <View style={[styles.cloudPart, styles.cloudC]} />
      <View style={styles.cloudBase} />
    </View>
  );
}

function Stat({item, width}) {
  return (
    <View style={[styles.stat, {width}]}>
      <View style={styles.statCorner} />
      <View style={styles.statGlow} />
      <View style={styles.iconBox}><Text style={styles.icon}>{item[0]}</Text></View>
      <Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={0.72} style={styles.value}>{item[1]}</Text>
      <Text numberOfLines={2} style={styles.label}>{item[2]}</Text>
      <View style={styles.track}><View style={styles.trackOn} /></View>
    </View>
  );
}

function Module({item, width}) {
  return (
    <Pressable onPress={() => Soon(item[1])} style={({pressed}) => [styles.module, {width}, pressed && styles.pressed]}>
      <View style={styles.moduleCut} />
      <View style={styles.moduleTopAccent} />
      <View style={styles.moduleBottomAccent} />
      <View style={styles.moduleLogo}>
        {item[0] === 'CLOUD' ? <CloudMark /> : <Text style={[styles.moduleLogoText, item[0] === 'IBO' && styles.ibo]}>{item[0]}</Text>}
      </View>
      <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.72} style={styles.moduleTitle}>{item[1]}</Text>
      <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7} style={styles.moduleSub}>{item[2]}</Text>
      <View style={styles.moduleBottom}>
        <View style={styles.online}><Dot small /><Text style={styles.onlineText}>Online</Text></View>
        <Text style={styles.chev}>›</Text>
      </View>
    </Pressable>
  );
}

function Trigger({item, last}) {
  return (
    <>
      <View style={styles.trigger}>
        <View style={styles.triggerAccent} />
        <View style={styles.triggerIcon}><Text style={styles.triggerIconText}>{item[0]}</Text></View>
        <View style={styles.triggerSide}><Text numberOfLines={1} style={styles.main}>{item[1]}</Text><Text numberOfLines={1} style={styles.meta}>{item[2]}</Text></View>
        <Text style={styles.arrow}>→</Text>
        <View style={[styles.triggerSide, {flex: 1.18}]}><Text numberOfLines={1} style={styles.main}>{item[3]}</Text><Text numberOfLines={1} style={styles.meta}>{item[4]}</Text></View>
        <Text style={styles.time}>{item[5]}</Text>
        <Text style={styles.dots}>⋮</Text>
      </View>
      {!last && <View style={styles.divider} />}
    </>
  );
}

function Nav({icon, label, active, badge, onPress}) {
  return (
    <Pressable onPress={onPress} style={styles.navItem}>
      <View>
        <Text style={[styles.navIcon, active && styles.navActive]}>{icon}</Text>
        {!!badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
      </View>
      <Text numberOfLines={1} style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
      {active && <View style={styles.navLine} />}
    </Pressable>
  );
}

export default function App() {
  const {width} = useWindowDimensions();
  const [tab, setTab] = useState('Início');
  const compact = width < 390;
  const pad = compact ? 12 : 16;
  const statGap = compact ? 6 : 8;
  const moduleGap = compact ? 7 : 9;
  const available = width - pad * 2;
  const statW = (available - statGap * 3) / 4;
  const moduleW = (available - moduleGap * 2) / 3;

  return (
    <View style={[styles.safe, {paddingTop: TOP_INSET}]}>
      <StatusBar barStyle="light-content" backgroundColor={BG} translucent={false} />
      <View style={styles.root}>
        <View pointerEvents="none" style={styles.sideRailLeft} />
        <View pointerEvents="none" style={styles.sideRailRight} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, {paddingHorizontal: pad}]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.topLine} />
            <Brand />
            <Pressable onPress={() => Soon('Notificações')} style={styles.bell}>
              <Text style={styles.bellText}>♢</Text>
              <View style={styles.notify} />
            </Pressable>
          </View>

          <View style={styles.welcome}>
            <View style={styles.welcomeText}>
              <Text style={styles.hello}>Olá, <Text style={styles.bold}>Admin</Text></Text>
              <Text style={styles.subHello}>Tudo funcionando perfeitamente!</Text>
            </View>
            <View style={styles.hero}>
              <Text style={styles.heroMark}>⌁</Text>
              <View><Text style={styles.heroText}>AUTOMAÇÃO</Text><Text style={styles.heroText}>SEM LIMITES</Text></View>
            </View>
          </View>

          <View style={[styles.stats, {gap: statGap}]}>
            {stats.map((item, index) => <Stat key={index} item={item} width={statW} />)}
          </View>

          <Section title="Módulos" right={<Pressable onPress={() => Soon('Status dos módulos')} style={styles.allOnline}><Dot /><Text style={styles.allOnlineText}>Todos online</Text><Text style={styles.chevSmall}>›</Text></Pressable>} />
          <View style={[styles.moduleRow, {gap: moduleGap}]}>{modules.map((item, index) => <Module key={index} item={item} width={moduleW} />)}</View>

          <Section title="Gatilhos Recentes" right={<Pressable onPress={() => Soon('Gatilhos')} style={styles.allOnline}><Text style={styles.allOnlineText}>Ver todos</Text><Text style={styles.chevSmall}>›</Text></Pressable>} />
          <View style={styles.recent}>{recent.map((item, index) => <Trigger key={index} item={item} last={index === recent.length - 1} />)}</View>

          <Pressable onPress={() => Soon('Criar automação')} style={({pressed}) => [styles.create, pressed && styles.pressed]}>
            <View style={styles.createGlow} /><View style={styles.createCornerL} /><View style={styles.createCornerR} />
            <Text style={styles.plus}>＋</Text><Text style={styles.createText}>Criar automação</Text><Text style={styles.createArrow}>›</Text>
          </Pressable>

          <View style={styles.slogan}><View style={styles.sloganLine} /><Text style={styles.sloganText}>MAIS AUTOMAÇÃO. MAIS RESULTADOS.</Text><View style={styles.sloganLine} /></View>
        </ScrollView>

        <View style={[styles.nav, {height: 70 + BOTTOM_INSET, paddingBottom: BOTTOM_INSET}]}>
          <View style={styles.navTop} />
          <Nav icon="⌂" label="Início" active={tab === 'Início'} onPress={() => setTab('Início')} />
          <Nav icon="ϟ" label="Gatilhos" active={tab === 'Gatilhos'} onPress={() => {setTab('Gatilhos'); Soon('Gatilhos');}} />
          <Nav icon="▣" label="Mensagens" badge="3" active={tab === 'Mensagens'} onPress={() => {setTab('Mensagens'); Soon('Mensagens');}} />
          <Nav icon="⚙" label="Config" active={tab === 'Config'} onPress={() => {setTab('Config'); Soon('Configurações');}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: BG},
  root: {flex: 1, backgroundColor: BG},
  scroll: {flex: 1},
  content: {paddingTop: 4, paddingBottom: 10},
  bold: {fontWeight: '900'},
  pressed: {opacity: 0.76},

  sideRailLeft: {position: 'absolute', left: 0, top: 105, bottom: 80, width: 2, backgroundColor: RED, opacity: 0.58, zIndex: 5},
  sideRailRight: {position: 'absolute', right: 0, top: 105, bottom: 80, width: 2, backgroundColor: RED, opacity: 0.58, zIndex: 5},

  header: {height: 92, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#2d1010', position: 'relative'},
  topLine: {position: 'absolute', top: 0, left: '35%', width: '30%', height: 3, backgroundColor: RED, shadowColor: RED, shadowOpacity: 1, shadowRadius: 10, elevation: 8},
  brand: {flexDirection: 'row', alignItems: 'center', flex: 1, maxWidth: 285},
  brandImage: {width: 62, height: 62, borderRadius: 15, marginRight: 8, borderWidth: 1, borderColor: '#8a1b1b'},
  brandText: {justifyContent: 'center'},
  brandRow: {flexDirection: 'row', alignItems: 'center'},
  brandX: {fontSize: 31, lineHeight: 34, fontWeight: '900', fontStyle: 'italic', color: RED, textShadowColor: '#850000', textShadowRadius: 7},
  brandCore: {fontSize: 31, lineHeight: 34, fontWeight: '900', fontStyle: 'italic', color: '#f0f0f0', letterSpacing: -1.4},
  brandSub: {color: '#d8d8d8', fontSize: 6.5, fontWeight: '800', letterSpacing: 2.3, marginTop: -2},
  bell: {width: 46, height: 46, borderRadius: 11, borderWidth: 1, borderColor: '#545454', backgroundColor: '#111', alignItems: 'center', justifyContent: 'center'},
  bellText: {color: '#ddd', fontSize: 27, lineHeight: 29},
  notify: {position: 'absolute', right: 6, top: 6, width: 9, height: 9, borderRadius: 5, backgroundColor: RED},

  welcome: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 14, marginBottom: 14},
  welcomeText: {flex: 1, minWidth: 0},
  hello: {color: '#f5f5f5', fontSize: 25},
  subHello: {color: MUTED, fontSize: 12.5, marginTop: 2},
  hero: {width: 132, minHeight: 62, borderWidth: 1, borderColor: RED, backgroundColor: '#100505', paddingHorizontal: 9, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, transform: [{skewX: '-7deg'}]},
  heroMark: {color: RED, fontSize: 24, fontWeight: '800', transform: [{skewX: '7deg'}]},
  heroText: {color: '#eee', fontSize: 8.2, fontWeight: '900', letterSpacing: 1.8, transform: [{skewX: '7deg'}]},

  stats: {flexDirection: 'row', marginBottom: 18},
  stat: {height: 126, backgroundColor: PANEL, borderWidth: 1, borderColor: '#565656', borderRadius: 11, paddingHorizontal: 8, paddingVertical: 9, overflow: 'hidden'},
  statCorner: {position: 'absolute', right: -6, top: -6, width: 30, height: 30, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#8a1b1b', transform: [{rotate: '45deg'}]},
  statGlow: {position: 'absolute', width: 62, height: 62, right: -22, bottom: -18, borderRadius: 36, backgroundColor: RED, opacity: 0.14},
  iconBox: {width: 34, height: 34, borderRadius: 8, borderWidth: 1, borderColor: '#941818', backgroundColor: '#160707', alignItems: 'center', justifyContent: 'center', marginBottom: 7},
  icon: {color: '#ff3b3b', fontWeight: '900', fontSize: 17},
  value: {color: '#fff', fontSize: 20, lineHeight: 23, fontWeight: '900'},
  label: {color: '#ddd', fontSize: 8.8, lineHeight: 11, minHeight: 22, marginTop: 2},
  track: {height: 4, backgroundColor: '#242424', borderRadius: 3, marginTop: 6},
  trackOn: {width: '68%', height: '100%', backgroundColor: RED, borderRadius: 3},

  section: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9},
  sectionLeft: {flexDirection: 'row', alignItems: 'center', flexShrink: 1},
  redBar: {width: 5, height: 30, borderRadius: 2, backgroundColor: RED, marginRight: 9},
  sectionTitle: {color: '#fff', fontSize: 21, fontWeight: '900'},
  allOnline: {flexDirection: 'row', alignItems: 'center', gap: 5},
  allOnlineText: {color: '#d8d8d8', fontSize: 11.2},
  dot: {width: 10, height: 10, borderRadius: 5, backgroundColor: GREEN},
  dotSmall: {width: 7, height: 7, borderRadius: 4},
  chevSmall: {color: '#aaa', fontSize: 21, lineHeight: 22},

  moduleRow: {flexDirection: 'row', marginBottom: 18},
  module: {height: 151, backgroundColor: '#0c0c0c', borderWidth: 1, borderColor: '#5b5b5b', borderRadius: 11, paddingHorizontal: 9, paddingVertical: 10, overflow: 'hidden'},
  moduleCut: {position: 'absolute', right: -9, top: -9, width: 37, height: 37, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: RED, backgroundColor: '#180707', transform: [{rotate: '45deg'}]},
  moduleTopAccent: {position: 'absolute', left: 0, top: 0, width: 34, height: 2, backgroundColor: '#909090'},
  moduleBottomAccent: {position: 'absolute', left: 0, bottom: 0, width: 36, height: 2, backgroundColor: RED, opacity: 0.9},
  moduleLogo: {height: 48, alignItems: 'center', justifyContent: 'center'},
  moduleLogoText: {color: '#e72d2d', fontSize: 40, lineHeight: 43, fontWeight: '900', textShadowColor: '#6b0808', textShadowRadius: 6},
  ibo: {color: '#eee', fontSize: 27, fontStyle: 'italic'},
  moduleTitle: {color: '#fff', fontSize: 12.2, lineHeight: 14, fontWeight: '900', marginTop: 2},
  moduleSub: {color: '#979797', fontSize: 8.1, lineHeight: 10, marginTop: 3},
  moduleBottom: {flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'},
  online: {borderWidth: 1, borderColor: '#12462d', backgroundColor: '#071a10', borderRadius: 14, paddingHorizontal: 7, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', gap: 4},
  onlineText: {color: GREEN, fontSize: 9},
  chev: {color: '#ddd', fontSize: 23, lineHeight: 22},

  cloudMark: {width: 49, height: 32, position: 'relative'},
  cloudPart: {position: 'absolute', borderWidth: 1.8, borderColor: '#ff3737', backgroundColor: '#0f0f0f'},
  cloudA: {width: 22, height: 22, borderRadius: 12, left: 3, top: 9},
  cloudB: {width: 27, height: 27, borderRadius: 15, left: 13, top: 2},
  cloudC: {width: 21, height: 21, borderRadius: 11, right: 2, top: 10},
  cloudBase: {position: 'absolute', left: 6, right: 4, bottom: 0, height: 12, borderWidth: 1.8, borderColor: '#ff3737', backgroundColor: '#0f0f0f', borderRadius: 7},

  recent: {borderWidth: 1, borderColor: '#464646', borderRadius: 11, backgroundColor: '#0b0b0b', overflow: 'hidden', marginBottom: 15},
  trigger: {minHeight: 61, paddingHorizontal: 8, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 5, position: 'relative'},
  triggerAccent: {position: 'absolute', left: 0, top: 9, bottom: 9, width: 2, backgroundColor: RED, opacity: 0.9},
  triggerIcon: {width: 34, height: 34, borderRadius: 17, borderWidth: 1, borderColor: RED, backgroundColor: '#100606', alignItems: 'center', justifyContent: 'center'},
  triggerIconText: {color: '#ff3c3c', fontSize: 13.5, fontWeight: '900'},
  triggerSide: {flex: 1, minWidth: 0},
  main: {color: '#f2f2f2', fontSize: 10.3, fontWeight: '800'},
  meta: {color: '#929292', fontSize: 8.2, marginTop: 2},
  arrow: {color: RED, fontSize: 17},
  time: {color: '#999', fontSize: 8.2, width: 30},
  dots: {color: '#bdbdbd', fontSize: 18},
  divider: {height: 1, backgroundColor: '#292929', marginLeft: 45},

  create: {minHeight: 68, borderWidth: 1.7, borderColor: '#ff3838', backgroundColor: '#370606', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 11},
  createGlow: {position: 'absolute', width: '66%', height: 88, top: -25, left: '17%', borderRadius: 55, backgroundColor: RED, opacity: 0.22},
  createCornerL: {position: 'absolute', left: 7, top: 7, bottom: 7, width: 2, backgroundColor: '#ff6060'},
  createCornerR: {position: 'absolute', right: 7, top: 7, bottom: 7, width: 2, backgroundColor: '#ff6060'},
  plus: {color: '#fff', fontSize: 34, fontWeight: '300', marginRight: 9},
  createText: {color: '#fff', fontSize: 18.5, fontWeight: '900'},
  createArrow: {color: '#fff', fontSize: 27, marginLeft: 10},

  slogan: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4},
  sloganLine: {width: 22, height: 1.5, backgroundColor: RED},
  sloganText: {color: '#bdbdbd', fontSize: 6.8, fontWeight: '800', letterSpacing: 1.45},

  nav: {backgroundColor: '#080808', borderTopWidth: 1, borderTopColor: '#3b3b3b', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-around', paddingHorizontal: 3, position: 'relative'},
  navTop: {position: 'absolute', top: -1, left: '8%', width: '17%', height: 2, backgroundColor: RED},
  navItem: {flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative'},
  navIcon: {color: '#9b9b9b', fontSize: 22, fontWeight: '700', lineHeight: 24},
  navActive: {color: '#fff', textShadowColor: RED, textShadowRadius: 8},
  navLabel: {color: '#999', fontSize: 8.7, marginTop: 2},
  navLabelActive: {color: '#fff', fontWeight: '800'},
  navLine: {position: 'absolute', bottom: 4, width: 36, height: 2, borderRadius: 2, backgroundColor: RED},
  badge: {position: 'absolute', right: -9, top: -7, minWidth: 17, height: 17, borderRadius: 9, backgroundColor: RED, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3},
  badgeText: {color: '#fff', fontSize: 9, fontWeight: '900'},
});
