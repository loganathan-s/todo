import sinon from 'sinon';
import Request from '../../../src/js/dataApi/httpRequest';
import {BASE_URL, onError, expect, assert } from '../../settings/config';

describe('HTTP Request', function() {
    beforeEach(() => {
      [Request.get, Request.post, Request.put, Request.delete] = [sinon.stub(), sinon.stub(), sinon.stub(), sinon.stub()];
    });

    it('should return all tasks', () => {
        const tasks =  {
                        "1": { "id": '1', "text": "Read description of programming challenge" },
                        "2": { "id": "2", "text": "Implement an awesome web app" },
                        "3": { "id": "3", "text": "Polish project" },
                        "9": { "id": "9", "text": "Send solution to LogMeIn" }
                      };
        Request.get.withArgs("/api/tasks").returns(Promise.resolve(tasks));
        return Request.get("/api/tasks").then(result => {
            expect(result).to.equal(tasks);
        }).catch(error => {
            expect(error).to.be.undefined;
        });
    });

    it('should create new task', () => {
        const task =  {"id": "001", "text":"my great task"};
        Request.post.withArgs("/api/tasks", task).returns(Promise.resolve(true));
        return Request.post("/api/tasks", task).then(result => {
            expect(result).to.equal(true);
        }).catch(error => {
            expect(error).to.be.undefined;
        });
    });

    it('should update existing task', () => {
        const task =  {"text":"I've updated the task"}
        Request.put.withArgs("/api/tasks/1", task).returns(Promise.resolve(true));
        return Request.put("/api/tasks/1", task).then(result => {
            expect(result).to.equal(true);
        }).catch(error => {
            expect(error).to.be.undefined;
        });
    });


    it('should delete an task', () => {
        const task =  {"id": "1", "text":"my great task"};
        Request.delete.withArgs("/api/tasks/1").returns(Promise.resolve(true));
        return Request.delete("/api/tasks/1").then(result => {
            expect(result).to.equal(true);
        }).catch(error => {
            expect(error).to.be.undefined;
        });
    });

 });