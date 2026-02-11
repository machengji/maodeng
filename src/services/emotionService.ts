import AV from './storage';
import type { Rating } from '../types';

const RatingClass = AV.Object.extend('Rating');

export const saveRating = async (rating: Omit<Rating, 'id'>, pairId?: string): Promise<string | null> => {
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

        const avRating = new RatingClass();
        avRating.set('taskTitle', rating.taskTitle);
        avRating.set('taskId', rating.taskId);
        avRating.set('date', rating.date);
        avRating.set('speed', rating.speed);
        avRating.set('quality', rating.quality);
        avRating.set('attitude', rating.attitude);
        avRating.set('ratedBy', rating.ratedBy);
        avRating.set('pairId', actualPairId);

        const saved = await avRating.save();
        console.log('评价保存成功');
        return saved.id || null;
    } catch (error) {
        console.error('评价保存失败:', error);
        return null;
    }
};

export const loadRatings = async (limit = 50): Promise<Rating[]> => {
    try {
        const pairCode = localStorage.getItem('pairCode');
        if (!pairCode) return [];

        // 先获取配对ID
        const pairQuery = new AV.Query('Pair');
        pairQuery.equalTo('code', pairCode);
        const pair = await pairQuery.first();

        if (!pair) return [];

        const query = new AV.Query('Rating');
        query.equalTo('pairId', pair.id);
        query.descending('createdAt');
        query.limit(limit);
        const results = await query.find();

        return results.map(item => ({
            id: item.id || '',
            taskTitle: item.get('taskTitle'),
            taskId: item.get('taskId'),
            date: item.get('date'),
            speed: item.get('speed'),
            quality: item.get('quality'),
            attitude: item.get('attitude'),
            ratedBy: item.get('ratedBy'),
            createdAt: item.createdAt,
        }));
    } catch (error) {
        console.error('评价加载失败:', error);
        return [];
    }
};
