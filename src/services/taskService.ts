import AV from './storage';
import type { Task } from '../types';

const TaskClass = AV.Object.extend('Task');

export const saveTasks = async (tasks: Task[], pairId?: string): Promise<boolean> => {
    try {
        const pairCode = localStorage.getItem('pairCode');
        if (!pairCode && !pairId) return false;

        // 获取配对ID
        let actualPairId = pairId;
        if (!actualPairId) {
            const pairQuery = new AV.Query('Pair');
            pairQuery.equalTo('code', pairCode);
            const pair = await pairQuery.first();
            if (!pair) return false;
            actualPairId = pair.id;
        }

        const savePromises = tasks.map(task => {
            let avTask;
            if (task.id && task.id.length > 10) {
                avTask = AV.Object.createWithoutData('Task', task.id);
            } else {
                avTask = new TaskClass();
            }

            avTask.set('title', task.title);
            avTask.set('time', task.time);
            avTask.set('coins', task.coins);
            avTask.set('urgent', task.urgent);
            avTask.set('claimed', task.claimed);
            avTask.set('claimedBy', task.claimedBy);
            avTask.set('completed', task.completed);
            avTask.set('createdBy', task.createdBy);
            avTask.set('pairId', actualPairId);

            return avTask.save();
        });

        await Promise.all(savePromises);
        console.log('任务同步成功');
        return true;
    } catch (error) {
        console.error('任务保存失败:', error);
        return false;
    }
};

export const loadTasks = async (): Promise<Task[]> => {
    try {
        const pairCode = localStorage.getItem('pairCode');
        if (!pairCode) return [];

        // 先获取配对ID
        const pairQuery = new AV.Query('Pair');
        pairQuery.equalTo('code', pairCode);
        const pair = await pairQuery.first();

        if (!pair) return [];

        const query = new AV.Query('Task');
        query.equalTo('pairId', pair.id);
        query.descending('createdAt');
        query.limit(100);
        const results = await query.find();

        return results.map(item => ({
            id: item.id,
            title: item.get('title'),
            time: item.get('time'),
            coins: item.get('coins'),
            urgent: item.get('urgent'),
            claimed: item.get('claimed'),
            claimedBy: item.get('claimedBy'),
            completed: item.get('completed'),
            createdBy: item.get('createdBy'),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));
    } catch (error) {
        console.error('任务加载失败:', error);
        return [];
    }
};

export const deleteTask = async (id: string): Promise<boolean> => {
    try {
        const task = AV.Object.createWithoutData('Task', id);
        await task.destroy();
        return true;
    } catch (error) {
        console.error('任务删除失败:', error);
        return false;
    }
};
