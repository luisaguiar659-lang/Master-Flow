const { withAndroidStyles } = require('@expo/config-plugins');

function upsertItem(style, name, value) {
  style.item = style.item || [];
  const found = style.item.find((item) => item?.$?.name === name);
  if (found) {
    found._ = value;
    return;
  }
  style.item.push({ $: { name }, _: value });
}

module.exports = function withAndroidSystemBars(config) {
  return withAndroidStyles(config, (configWithStyles) => {
    const styles = configWithStyles.modResults?.resources?.style || [];

    styles.forEach((style) => {
      const styleName = style?.$?.name || '';
      if (styleName === 'AppTheme' || styleName.includes('AppTheme') || styleName.includes('Theme.App')) {
        upsertItem(style, 'android:windowDrawsSystemBarBackgrounds', 'true');
        upsertItem(style, 'android:statusBarColor', '#050505');
        upsertItem(style, 'android:navigationBarColor', '#050505');
        upsertItem(style, 'android:windowLightStatusBar', 'false');
        upsertItem(style, 'android:windowLightNavigationBar', 'false');
      }
    });

    return configWithStyles;
  });
};
