import { expect } from '../../settings/config';
import { extractNumber, formatTaskNote, inValidNote } from '../../../src/js/helpers/helper';

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


describe('unitTest - Format Note', function() {

    it('should return truncate the word to 30 character', () => {
    	const note = formatTaskNote("abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc");
    	expect(note).to.eql("abcabcabcabcabcabcabcabcabcabc");
    });

    it('should return given word without any change 30 character', () => {
    	const note = formatTaskNote("abcabcabcabcabcabcabcabcabcabc");
    	expect(note).to.eql("abcabcabcabcabcabcabcabcabcabc");
    });

    it('should remove the extra whitespaces on the given note', () => {
    	const note = formatTaskNote("abcabcabcabcabcabcabcabcabcabc   abcabcabcabcabcabcabcabcabcabc");
    	expect(note).to.eql("abcabcabcabcabcabcabcabcabcabc abcabcabcabcabcabcabcabcabcabc");
    });
});



describe('unitTest - Note Validation', function() {

    it('should return regexp error for note with not allowed characters', () => {
    	const note = inValidNote("abc 012");
    	expect(note).to.eql("Only 1-9, a-z, A-Z are allowed");
    });

     it('should return lenghth error for note with more than 140 characters', () => {
    	const note = inValidNote("abcabcabcabcabcabcabcabcabcabc   abcabcabcabcabcabcabcabcabcabc abcabcabcabcabcabcabcabcabcabc   abcabcabcabcabcabcabcabcabcabc abcabcabcabcabcabcabcabcabcabc   abcabcabcabcabcabcabcabcabcabc abcabcabcabcabcabcabcabcabcabc   abcabcabcabcabcabcabcabcabcabc");
    	expect(note).to.eql("Only 140 alphanumeric characters are allowed");
    });

    it('should return false for valid note', () => {
    	const note = inValidNote("abcabcabcabcabcabcabcabcabcabc");
    	expect(note).to.eql(false);
    });
});