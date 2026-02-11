import AV from './storage';

const PairClass = AV.Object.extend('Pair');

// 生成6位配对码
export const generatePairCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// 创建配对关系
export const createPair = async (userName: string): Promise<{ pairCode: string; userId: string } | null> => {
  try {
    const pairCode = generatePairCode();

    // 创建配对记录
    const pair = new PairClass();
    pair.set('code', pairCode);
    pair.set('createdBy', userName);
    const savedPair = await pair.save();

    // 创建用户配置记录（使用普通对象而不是 User 类）
    const UserConfigClass = AV.Object.extend('UserConfig');
    const userConfig = new UserConfigClass();
    userConfig.set('name', userName);
    userConfig.set('coins', 150);
    userConfig.set('pairId', savedPair.id);
    const savedUserConfig = await userConfig.save();

    // 保存到本地
    localStorage.setItem('userId', savedUserConfig.id || '');
    localStorage.setItem('userName', userName);
    localStorage.setItem('pairCode', pairCode);

    return { pairCode, userId: savedUserConfig.id || '' };
  } catch (error) {
    console.error('创建配对失败:', error);
    return null;
  }
};

// 加入配对
export const joinPair = async (pairCode: string, userName: string): Promise<string | null> => {
  try {
    // 查找配对码
    const query = new AV.Query('Pair');
    query.equalTo('code', pairCode);
    const pair = await query.first();

    if (!pair) {
      throw new Error('配对码不存在');
    }

    // 创建用户配置记录
    const UserConfigClass = AV.Object.extend('UserConfig');
    const userConfig = new UserConfigClass();
    userConfig.set('name', userName);
    userConfig.set('coins', 120);
    userConfig.set('pairId', pair.id);
    const savedUserConfig = await userConfig.save();

    // 保存到本地
    localStorage.setItem('userId', savedUserConfig.id || '');
    localStorage.setItem('userName', userName);
    localStorage.setItem('pairCode', pairCode);

    return savedUserConfig.id || null;
  } catch (error) {
    console.error('加入配对失败:', error);
    return null;
  }
};

// 获取配对信息
export const getPairInfo = async (): Promise<{ pairCode: string; users: any[] } | null> => {
  try {
    const pairCode = localStorage.getItem('pairCode');
    if (!pairCode) return null;

    const query = new AV.Query('Pair');
    query.equalTo('code', pairCode);
    const pair = await query.first();

    if (!pair) return null;

    // 获取配对的所有用户
    const userQuery = new AV.Query('UserConfig');
    userQuery.equalTo('pairId', pair.id);
    const users = await userQuery.find();

    return {
      pairCode,
      users: users.map(u => ({
        id: u.id,
        name: u.get('name'),
        coins: u.get('coins'),
      })),
    };
  } catch (error) {
    console.error('获取配对信息失败:', error);
    return null;
  }
};

// 更新用户币数
export const updateUserCoins = async (userId: string, coins: number): Promise<boolean> => {
  try {
    const userConfig = AV.Object.createWithoutData('UserConfig', userId);
    userConfig.set('coins', coins);
    await userConfig.save();
    return true;
  } catch (error) {
    console.error('更新币数失败:', error);
    return false;
  }
};
