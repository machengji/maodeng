import AV from './storage';
import type { ChoreRecord } from '../types';

const ChoreRecordClass = AV.Object.extend('ChoreRecord');

export const saveChoreRecord = async (record: Omit<ChoreRecord, 'id'>, pairId?: string): Promise<string | null> => {
    try {
        const pairCode = localStorage.getItem('pairCode');
        if (!pairCode && !pairId) return null;

        // 获取配对ID
        let actualPairId = pairId;
        if (!actualPairId) {
            const pairQuery = new AV.Query('Pair');
            pairQuery.equalTo('code', pairCode);
            const pair = await pairQuery.first();
            if (!pair) return null;
            actualPairId = pair.id;
        }

        const avRecord = new ChoreRecordClass();
        avRecord.set('person', record.person);
        avRecord.set('task', record.task);
        avRecord.set('duration', record.duration);
        avRecord.set('date', record.date);
        avRecord.set('category', record.category);
        avRecord.set('pairId', actualPairId);

        const saved = await avRecord.save();
        console.log('家务记录保存成功');
        return saved.id;
    } catch (error) {
        console.error('家务记录保存失败:', error);
        return null;
    }
};

export const loadChoreRecords = async (limit = 100): Promise<ChoreRecord[]> => {
    try {
        const pairCode = localStorage.getItem('pairCode');
        if (!pairCode) return [];

        // 先获取配对ID
        const pairQuery = new AV.Query('Pair');
        pairQuery.equalTo('code', pairCode);
        const pair = await pairQuery.first();

        if (!pair) return [];

        const query = new AV.Query('ChoreRecord');
        query.equalTo('pairId', pair.id);
        query.descending('createdAt');
        query.limit(limit);
        const results = await query.find();

        return results.map(item => ({
            id: item.id,
            person: item.get('person'),
            task: item.get('task'),
            duration: item.get('duration'),
            date: item.get('date'),
            category: item.get('category'),
            createdAt: item.createdAt,
        }));
    } catch (error) {
        console.error('家务记录加载失败:', error);
        return [];
    }
};
