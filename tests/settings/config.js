/*Test Configurations*/
import chai from 'chai';
import Nightmare from 'nightmare';
import realMouse from 'nightmare-real-mouse';

realMouse(Nightmare)

export const Browser =  new Nightmare({
            show: true, //Change it to false for headles test
            typeInterval: 20,
            pollInterval: 50
        });
export const BASE_URL = "http://localhost:3000";
export const onError = ( err ) => console.error( "Test-runner failed:", err );
export const expect = chai.expect;
