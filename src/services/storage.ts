import AV from 'leancloud-storage';

const APP_ID = 'fNJb5kxiG5JACBivlXAuGqly-gzGzoHsz';
const APP_KEY = '0DF5TPnflU45HnbyFvVNPLxq';
const SERVER_URL = 'https://fnjb5kxi.lc-cn-n1-shared.com';

// 初始化 LeanCloud
if (APP_ID) {
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY,
        serverURL: SERVER_URL
    });
    console.log('%c✅ LeanCloud 已初始化，云同步模式开启', 'color: #007aff; font-weight: bold;');
}

export default AV;
