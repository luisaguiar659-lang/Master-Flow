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
const RED_DARK = '#650909';
const BG = '#050505';
const PANEL = '#0c0d0e';
const MUTED = '#9a9a9f';
const GREEN = '#00ef78';
const TOP_INSET = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 12;
const ANDROID_BOTTOM_SAFE = Platform.OS === 'android' ? 38 : 16;

const stats = [
  ['▣', '1.248', 'Mensagens Hoje'],
  ['⚙', '12', 'Automações Ativas'],
  ['▤', '389', 'Testes Gerados'],
  ['ϟ', '2.756', 'Ações Executadas'],
];

const modules = [
  [require('./assets/logo-masterflix.png'), 'Masterflix', 'Streaming e Acessos'],
  [require('./assets/logo-xcloud.png'), 'Automation Cloud', 'Keys e Ativações'],
  [require('./assets/logo-ibo.png'), 'Master IBO', 'Resets e Gerenciamento'],
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
  return <View style={[s.dot, small && s.dotSmall]} />;
}

const CORNER_POS = {
  topLeft: {top: 6, left: 6},
  topRight: {top: 6, right: 6},
  bottomLeft: {bottom: 6, left: 6},
  bottomRight: {bottom: 6, right: 6},
};

function CornerBracket({pos}) {
  const isRight = pos.toLowerCase().includes('right');
  const isBottom = pos.toLowerCase().includes('bottom');
  return (
    <View pointerEvents="none" style={[s.corner, CORNER_POS[pos]]}>
      <View style={[s.cornerH, isRight && s.cornerHRight, isBottom && s.cornerHBottom]} />
      <View style={[s.cornerV, isRight && s.cornerVRight, isBottom && s.cornerVBottom]} />
    </View>
  );
}

function XcoreLogo() {
  return (
    <View style={s.brand}>
      <View style={s.brandIconWrap}>
        <Image source={require('./assets/icon.png')} style={s.brandIcon} resizeMode="cover" />
      </View>
      <View style={s.brandTextWrap}>
        <View style={s.brandRow}>
          <Text style={s.brandX}>X</Text>
          <Text style={s.brandCore}>CORE</Text>
        </View>
        <Text style={s.brandSub}>CENTRAL DE AUTOMAÇÃO</Text>
      </View>
    </View>
  );
}

function Section({title, right}) {
  return (
    <View style={s.section}>
      <View style={s.sectionLeft}>
        <View style={s.redBar} />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

function CloudMark() {
  return (
    <View style={s.cloudMark}>
      <View style={[s.cloudPart, s.cloudA]} />
      <View style={[s.cloudPart, s.cloudB]} />
      <View style={[s.cloudPart, s.cloudC]} />
      <View style={s.cloudBase} />
    </View>
  );
}

function Stat({item, width}) {
  return (
    <View style={[s.stat, {width}]}> 
      <View style={s.statCut} />
      <View style={s.statGlow} />
      <View style={s.iconBox}><Text style={s.icon}>{item[0]}</Text></View>
      <Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={0.62} style={s.value}>{item[1]}</Text>
      <Text numberOfLines={2} style={s.label}>{item[2]}</Text>
      <View style={s.track}><View style={s.trackOn} /></View>
    </View>
  );
}

function Module({item, width}) {
  const isImage = typeof item[0] !== 'string';
  return (
    <Pressable onPress={() => Soon(item[1])} style={({pressed}) => [s.module, {width}, pressed && s.pressed]}>
      <View style={s.moduleGlow} />
      <View style={s.moduleCut} />
      <View style={s.moduleTopAccent} />
      <View style={s.moduleBottomAccent} />
      <View style={s.moduleLogo}>
        {isImage
          ? <Image source={item[0]} style={s.moduleLogoImg} resizeMode="contain" />
          : <Text style={s.moduleLogoText}>{item[0]}</Text>}
      </View>
      <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.68} style={s.moduleTitle}>{item[1]}</Text>
      <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.64} style={s.moduleSub}>{item[2]}</Text>
      <View style={s.moduleBottom}>
        <View style={s.online}><Dot small /><Text style={s.onlineText}>Online</Text></View>
        <Text style={s.chev}>›</Text>
      </View>
    </Pressable>
  );
}

function Trigger({item, last}) {
  return (
    <>
      <View style={s.trigger}>
        <View style={s.triggerAccent} />
        <View style={s.triggerIcon}><Text style={s.triggerIconText}>{item[0]}</Text></View>
        <View style={s.triggerSide}><Text numberOfLines={1} style={s.main}>{item[1]}</Text><Text numberOfLines={1} style={s.meta}>{item[2]}</Text></View>
        <Text style={s.arrow}>→</Text>
        <View style={[s.triggerSide, {flex: 1.22}]}><Text numberOfLines={1} style={s.main}>{item[3]}</Text><Text numberOfLines={1} style={s.meta}>{item[4]}</Text></View>
        <Text style={s.time}>{item[5]}</Text>
        <Text style={s.dots}>⋮</Text>
      </View>
      {!last && <View style={s.divider} />}
    </>
  );
}

function Nav({icon, label, active, badge, onPress}) {
  return (
    <Pressable onPress={onPress} style={s.navItem}>
      <View>
        {active && <View pointerEvents="none" style={s.navGlow} />}
        <Text style={[s.navIcon, active && s.navActive]}>{icon}</Text>
        {badge && <View style={s.badge}><Text style={s.badgeText}>{badge}</Text></View>}
      </View>
      <Text numberOfLines={1} style={[s.navLabel, active && s.navLabelActive]}>{label}</Text>
      {active && <View style={s.navLine} />}
    </Pressable>
  );
}

export default function App() {
  const {width} = useWindowDimensions();
  const [tab, setTab] = useState('Início');
  const compact = width < 390;
  const pad = compact ? 16 : 20;
  const statGap = compact ? 7 : 9;
  const moduleGap = compact ? 8 : 10;
  const available = width - pad * 2;
  const statW = (available - statGap * 3) / 4;
  const moduleW = (available - moduleGap * 2) / 3;

  return (
    <View style={[s.safe, {paddingTop: TOP_INSET}]}> 
      <StatusBar barStyle="light-content" backgroundColor={BG} translucent={false} />
      <View style={s.root}>
        <View pointerEvents="none" style={s.sideRailLeft} />
        <View pointerEvents="none" style={s.sideRailRight} />
        <CornerBracket pos="topLeft" />
        <CornerBracket pos="topRight" />
        <CornerBracket pos="bottomLeft" />
        <CornerBracket pos="bottomRight" />

        <ScrollView
          style={s.scroll}
          contentContainerStyle={[s.content, {paddingHorizontal: pad}]}
          showsVerticalScrollIndicator={false}
        >
          <View style={s.header}>
            <View style={s.headerFrameTop} />
            <View style={s.headerFrameTopGlow} />
            <View style={[s.headerTick, s.headerTickL]} />
            <View style={[s.headerTick, s.headerTickR]} />
            <View style={s.headerFrameBottom} />
            <XcoreLogo />
            <Pressable onPress={() => Soon('Notificações')} style={s.bell}>
              <Text style={s.bellText}>◇</Text>
              <View style={s.notify} />
            </Pressable>
          </View>

          <View style={s.welcome}>
            <View style={s.welcomeText}>
              <Text style={s.hello}>Olá, <Text style={s.bold}>Admin</Text></Text>
              <Text style={s.subHello}>Tudo funcionando perfeitamente!</Text>
            </View>
            <View style={s.heroWrap}>
              <View style={s.heroTip} />
              <View style={s.hero}>
                <Text style={s.heroMark}>⌁</Text>
                <View><Text style={s.heroText}>AUTOMAÇÃO</Text><Text style={s.heroText}>SEM LIMITES</Text></View>
              </View>
            </View>
          </View>

          <View style={[s.stats, {gap: statGap}]}>{stats.map((x, i) => <Stat key={i} item={x} width={statW} />)}</View>

          <Section title="Módulos" right={<Pressable onPress={() => Soon('Status dos módulos')} style={s.allOnline}><Dot /><Text style={s.allOnlineText}>Todos online</Text><Text style={s.chevSmall}>›</Text></Pressable>} />
          <View style={[s.moduleRow, {gap: moduleGap}]}>{modules.map((x, i) => <Module key={i} item={x} width={moduleW} />)}</View>

          <Section title="Gatilhos Recentes" right={<Pressable onPress={() => Soon('Gatilhos')} style={s.allOnline}><Text style={s.allOnlineText}>Ver todos</Text><Text style={s.chevSmall}>›</Text></Pressable>} />
          <View style={s.recent}>{recent.map((x, i) => <Trigger key={i} item={x} last={i === recent.length - 1} />)}</View>

          <Pressable onPress={() => Soon('Criar automação')} style={({pressed}) => [s.create, pressed && s.pressed]}>
            <View style={s.createGlow} />
            <View style={s.createCornerL} />
            <View style={s.createCornerR} />
            <Text style={s.plus}>＋</Text>
            <Text style={s.createText}>Criar automação</Text>
            <Text style={s.createArrow}>›</Text>
          </Pressable>

          <View style={s.slogan}>
            <View style={s.sloganLine} />
            <Text style={s.sloganText}>MAIS AUTOMAÇÃO. MAIS RESULTADOS.</Text>
            <View style={s.sloganLine} />
          </View>
        </ScrollView>

        <View style={[s.nav, {paddingBottom: ANDROID_BOTTOM_SAFE, height: 66 + ANDROID_BOTTOM_SAFE}]}> 
          <View style={s.navTop} />
          <Nav icon="⌂" label="Início" active={tab === 'Início'} onPress={() => setTab('Início')} />
          <Nav icon="ϟ" label="Gatilhos" active={tab === 'Gatilhos'} onPress={() => {setTab('Gatilhos'); Soon('Gatilhos');}} />
          <Nav icon="▣" label="Mensagens" badge="3" active={tab === 'Mensagens'} onPress={() => {setTab('Mensagens'); Soon('Mensagens');}} />
          <Nav icon="⚙" label="Config" active={tab === 'Config'} onPress={() => {setTab('Config'); Soon('Configurações');}} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  safe: {flex: 1, backgroundColor: BG},
  root: {flex: 1, backgroundColor: BG},
  scroll: {flex: 1},
  content: {paddingTop: 0, paddingBottom: 22},
  bold: {fontWeight: '900'},
  pressed: {opacity: 0.76},

  sideRailLeft: {position: 'absolute', left: 0, top: 126, bottom: 88, width: 2, backgroundColor: RED, opacity: 0.72, zIndex: 5},
  sideRailRight: {position: 'absolute', right: 0, top: 126, bottom: 88, width: 2, backgroundColor: RED, opacity: 0.72, zIndex: 5},

  corner: {position: 'absolute', width: 22, height: 22, zIndex: 6},
  cornerH: {position: 'absolute', top: 0, left: 0, width: 22, height: 2.5, backgroundColor: RED, opacity: 0.85},
  cornerHRight: {left: undefined, right: 0},
  cornerHBottom: {top: undefined, bottom: 0},
  cornerV: {position: 'absolute', top: 0, left: 0, width: 2.5, height: 22, backgroundColor: RED, opacity: 0.85},
  cornerVRight: {left: undefined, right: 0},
  cornerVBottom: {top: undefined, bottom: 0},

  header: {height: 128, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative', paddingHorizontal: 2, overflow: 'hidden'},
  headerFrameTop: {position: 'absolute', top: 2, left: '32%', width: '36%', height: 3, backgroundColor: RED},
  headerFrameTopGlow: {position: 'absolute', top: 0, left: '38%', width: '24%', height: 8, backgroundColor: RED, opacity: 0.22},
  headerTick: {position: 'absolute', top: 1.5, width: 8, height: 6, borderColor: RED, borderWidth: 2, opacity: 0.85, transform: [{rotate: '45deg'}]},
  headerTickL: {left: '30%'},
  headerTickR: {right: '30%'},
  headerFrameBottom: {position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, backgroundColor: '#351010'},
  brand: {flex: 1, flexDirection: 'row', alignItems: 'center', minWidth: 0, paddingRight: 10},
  brandIconWrap: {width: 74, height: 74, borderRadius: 18, overflow: 'hidden', backgroundColor: '#090909', borderWidth: 1, borderColor: '#4a4a4a', shadowColor: RED, shadowOpacity: 0.75, shadowRadius: 11, elevation: 7},
  brandIcon: {width: '100%', height: '100%'},
  brandTextWrap: {marginLeft: 10, flexShrink: 1},
  brandRow: {flexDirection: 'row', alignItems: 'baseline'},
  brandX: {color: RED, fontSize: 35, lineHeight: 38, fontWeight: '900', fontStyle: 'italic', textShadowColor: '#7a0606', textShadowRadius: 8},
  brandCore: {color: '#f0f0f0', fontSize: 34, lineHeight: 38, fontWeight: '900', fontStyle: 'italic', letterSpacing: -1.2, textShadowColor: '#555', textShadowRadius: 2},
  brandSub: {color: '#d0d0d0', fontSize: 7.5, fontWeight: '700', letterSpacing: 2.2, marginTop: 1},

  bell: {width: 50, height: 50, borderRadius: 13, borderWidth: 1, borderColor: '#555', backgroundColor: '#111214', alignItems: 'center', justifyContent: 'center', position: 'relative', shadowColor: RED, shadowOpacity: 0.28, shadowRadius: 8, elevation: 4},
  bellText: {color: '#e7e7e7', fontSize: 29, lineHeight: 31},
  notify: {position: 'absolute', right: 6, top: 6, width: 9, height: 9, borderRadius: 5, backgroundColor: RED, shadowColor: RED, shadowOpacity: 1, shadowRadius: 5, elevation: 5},

  welcome: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 16, marginBottom: 15},
  welcomeText: {flex: 1, minWidth: 0},
  hello: {color: '#f5f5f5', fontSize: 24},
  subHello: {color: MUTED, fontSize: 12.5, marginTop: 3},
  heroWrap: {width: 148, minHeight: 63, flexDirection: 'row', alignItems: 'stretch'},
  heroTip: {width: 10, backgroundColor: '#100505', borderWidth: 1, borderColor: RED, borderRightWidth: 0, transform: [{skewX: '-18deg'}], marginRight: -5},
  hero: {flex: 1, borderWidth: 1, borderColor: RED, backgroundColor: '#100505', paddingHorizontal: 10, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, shadowColor: RED, shadowOpacity: 0.28, shadowRadius: 8, elevation: 4},
  heroMark: {color: RED, fontSize: 27, fontWeight: '900'},
  heroText: {color: '#eee', fontSize: 8.7, fontWeight: '900', letterSpacing: 1.8},

  stats: {flexDirection: 'row', marginBottom: 19},
  stat: {height: 128, backgroundColor: PANEL, borderWidth: 1, borderColor: '#626262', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 10, overflow: 'hidden', shadowColor: RED, shadowOpacity: 0.13, shadowRadius: 7, elevation: 3},
  statCut: {position: 'absolute', right: -8, top: -9, width: 31, height: 31, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#8f2222', backgroundColor: '#190707', transform: [{rotate: '45deg'}]},
  statGlow: {position: 'absolute', width: 80, height: 80, right: -26, bottom: -28, borderRadius: 44, backgroundColor: RED, opacity: 0.19},
  iconBox: {width: 35, height: 35, borderRadius: 9, borderWidth: 1, borderColor: '#9f1717', backgroundColor: '#140707', alignItems: 'center', justifyContent: 'center', marginBottom: 7, shadowColor: RED, shadowOpacity: 0.38, shadowRadius: 5, elevation: 2},
  icon: {color: '#ff4040', fontWeight: '900', fontSize: 17},
  value: {color: '#fff', fontSize: 22, lineHeight: 25, fontWeight: '900'},
  label: {color: '#ddd', fontSize: 9.5, lineHeight: 11.5, minHeight: 23, marginTop: 1},
  track: {height: 4, backgroundColor: '#242424', borderRadius: 4, marginTop: 6},
  trackOn: {width: '68%', height: '100%', backgroundColor: RED, borderRadius: 4},

  section: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10},
  sectionLeft: {flexDirection: 'row', alignItems: 'center', flexShrink: 1},
  redBar: {width: 5, height: 31, borderRadius: 3, backgroundColor: RED, marginRight: 9, shadowColor: RED, shadowOpacity: 0.85, shadowRadius: 6, elevation: 5},
  sectionTitle: {color: '#fff', fontSize: 22, fontWeight: '900'},
  allOnline: {flexDirection: 'row', alignItems: 'center', gap: 5},
  allOnlineText: {color: '#d8d8d8', fontSize: 12},
  dot: {width: 10, height: 10, borderRadius: 5, backgroundColor: GREEN, shadowColor: GREEN, shadowOpacity: 0.8, shadowRadius: 5, elevation: 4},
  dotSmall: {width: 7, height: 7, borderRadius: 4},
  chevSmall: {color: '#aaa', fontSize: 21, lineHeight: 22},

  moduleRow: {flexDirection: 'row', marginBottom: 19},
  module: {height: 158, backgroundColor: '#0c0c0d', borderWidth: 1, borderColor: '#666', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 9, overflow: 'hidden', shadowColor: RED, shadowOpacity: 0.12, shadowRadius: 7, elevation: 3},
  moduleGlow: {position: 'absolute', width: 90, height: 90, left: -30, bottom: -34, borderRadius: 48, backgroundColor: RED, opacity: 0.16},
  moduleCut: {position: 'absolute', right: -7, top: -8, width: 38, height: 38, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: RED, backgroundColor: '#180707', transform: [{rotate: '45deg'}]},
  moduleTopAccent: {position: 'absolute', left: 0, top: 0, width: 42, height: 2, backgroundColor: '#c9c9c9'},
  moduleBottomAccent: {position: 'absolute', left: 0, bottom: 0, width: 42, height: 2, backgroundColor: RED},
  moduleLogo: {height: 54, alignItems: 'center', justifyContent: 'center'},
  moduleLogoImg: {width: '92%', height: '100%'},
  moduleLogoText: {color: '#e72d2d', fontSize: 46, lineHeight: 49, fontWeight: '900', textShadowColor: '#6b0808', textShadowRadius: 7},
  ibo: {color: '#eee', fontSize: 29, fontStyle: 'italic'},
  moduleTitle: {color: '#fff', fontSize: 13.5, lineHeight: 16, fontWeight: '900', marginTop: 2},
  moduleSub: {color: '#9a9a9a', fontSize: 8.7, lineHeight: 10.5, marginTop: 2},
  moduleBottom: {flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'},
  online: {borderWidth: 1, borderColor: '#145331', backgroundColor: '#071a10', borderRadius: 15, paddingHorizontal: 7, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', gap: 5},
  onlineText: {color: GREEN, fontSize: 9.5},
  chev: {color: '#ddd', fontSize: 24, lineHeight: 23},

  cloudMark: {width: 54, height: 35, position: 'relative'},
  cloudPart: {position: 'absolute', borderWidth: 2, borderColor: '#ff3737', backgroundColor: '#0f0f0f'},
  cloudA: {width: 24, height: 24, borderRadius: 13, left: 4, top: 9},
  cloudB: {width: 29, height: 29, borderRadius: 16, left: 15, top: 1},
  cloudC: {width: 23, height: 23, borderRadius: 12, right: 2, top: 10},
  cloudBase: {position: 'absolute', left: 7, right: 4, bottom: 1, height: 13, borderWidth: 2, borderColor: '#ff3737', backgroundColor: '#0f0f0f', borderRadius: 8},

  recent: {borderWidth: 1, borderColor: '#4d4d4d', borderRadius: 12, backgroundColor: '#0b0b0b', overflow: 'hidden', marginBottom: 17},
  trigger: {minHeight: 62, paddingHorizontal: 9, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6, position: 'relative'},
  triggerAccent: {position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, backgroundColor: RED, opacity: 0.9},
  triggerIcon: {width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: RED, backgroundColor: '#100606', alignItems: 'center', justifyContent: 'center', shadowColor: RED, shadowOpacity: 0.35, shadowRadius: 5, elevation: 2},
  triggerIconText: {color: '#ff3c3c', fontSize: 15, fontWeight: '900'},
  triggerSide: {flex: 1, minWidth: 0},
  main: {color: '#f2f2f2', fontSize: 11.2, fontWeight: '800'},
  meta: {color: '#929292', fontSize: 9, marginTop: 2},
  arrow: {color: RED, fontSize: 19},
  time: {color: '#999', fontSize: 8.7, width: 32},
  dots: {color: '#bdbdbd', fontSize: 20},
  divider: {height: 1, backgroundColor: '#292929', marginLeft: 50},

  create: {minHeight: 72, borderWidth: 1.5, borderColor: '#ff3838', backgroundColor: '#470707', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 11, shadowColor: RED, shadowOpacity: 0.42, shadowRadius: 9, elevation: 5},
  createGlow: {position: 'absolute', width: '70%', height: 95, top: -27, left: '15%', borderRadius: 60, backgroundColor: RED, opacity: 0.28},
  createCornerL: {position: 'absolute', left: 8, top: 8, bottom: 8, width: 2, backgroundColor: '#ff6565'},
  createCornerR: {position: 'absolute', right: 8, top: 8, bottom: 8, width: 2, backgroundColor: '#ff6565'},
  plus: {color: '#fff', fontSize: 38, fontWeight: '300', marginRight: 11},
  createText: {color: '#fff', fontSize: 20, fontWeight: '900'},
  createArrow: {color: '#fff', fontSize: 29, marginLeft: 10},

  slogan: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginBottom: 2},
  sloganLine: {width: 28, height: 1.5, backgroundColor: RED},
  sloganText: {color: '#bdbdbd', fontSize: 7.2, fontWeight: '800', letterSpacing: 1.6},

  nav: {backgroundColor: '#080808', borderTopWidth: 1, borderTopColor: '#343434', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-around', paddingHorizontal: 4, position: 'relative'},
  navTop: {position: 'absolute', top: -1, left: '8%', width: '17%', height: 3, backgroundColor: RED, shadowColor: RED, shadowOpacity: 1, shadowRadius: 7, elevation: 5},
  navItem: {flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 9, position: 'relative'},
  navGlow: {position: 'absolute', width: 40, height: 40, left: '50%', top: -8, marginLeft: -20, borderRadius: 20, backgroundColor: RED, opacity: 0.22},
  navIcon: {color: '#9b9b9b', fontSize: 24, fontWeight: '700', lineHeight: 26},
  navActive: {color: '#fff', textShadowColor: RED, textShadowRadius: 10},
  navLabel: {color: '#999', fontSize: 9.5, marginTop: 2},
  navLabelActive: {color: '#fff', fontWeight: '800'},
  navLine: {position: 'absolute', top: 0, width: 42, height: 2, borderRadius: 2, backgroundColor: RED},
  badge: {position: 'absolute', right: -10, top: -7, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: RED, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3},
  badgeText: {color: '#fff', fontSize: 9, fontWeight: '900'},
});
