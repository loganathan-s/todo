import { expect } from '../../settings/config';
import { extractNumber } from '../../../src/js/helpers/helper';

describe('unitTest - Extract Number', function() {

    it('should return number for string with number', () => {
    	const number = extractNumber("test1");
    	expect(number).to.eql(1);
    });

    it('should return zero for string without number', () => {
    	const number = extractNumber("test");
    	expect(number).to.eql(0);
    });

 });