import Task from '../scripts/taskModel';

describe('taskModel', () => {
    let task;
    beforeEach(function() {
        task = new Task();
    });

    it('Should initialize with no friends items', function() {
        var all = task.index();
        expect(all).toEqual([]);
    });
}); 
