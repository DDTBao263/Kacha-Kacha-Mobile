const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Sử dụng NativeWind
const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

// Thêm phần mở rộng 'cjs' để Firebase hoạt động
nativeWindConfig.resolver.sourceExts.push("cjs");

module.exports = nativeWindConfig;
