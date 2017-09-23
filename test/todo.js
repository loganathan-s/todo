
const Browser = require('./testConfig').browser;
const BASE_URL = require('./testConfig').url;
const onError = ( err ) => {console.error( "Test-runner failed:", err );}
const expect = require( "chai" ).expect

describe( "TODO", function(){
  this.timeout( 15000 );
  // start up with the blank list
  before(( done ) => {
    
    Browser
        .goto( BASE_URL )
        .evaluate(() => {
          return localStorage.clear();
        })
        .then(() => {
          done();
        });
  });

  it( "should add new task to the list", ( done ) => {
    const taskDescription = "#taskDescription";
    Browser
      .refresh()
      .wait( taskDescription )
      .type( taskDescription, " MyNewTask ")
      .click("#createTask")
      .wait( ".editTask" )
      .evaluate(() => {
        return document.querySelector( ".editTask" ).innerText;;
      })
      .then(( res ) => {
        expect(res).to.eql( "MyNewTask" );
        done();
      }).catch( onError );
  });

  it( "should list the tasks", ( done ) => {
    Browser
      .refresh()
      .wait( ".taskItem" )
      .evaluate(() => {
        return document.querySelectorAll( ".taskItem" ).length;
      })
      .then(( taskCount ) => {
        expect(taskCount).to.not.equal(0);
        done();
      }).catch( onError );
  });


  it( "should update an existing task", ( done ) => {
    Browser
      .refresh()
      .wait("#todoPanel")
      .wait(".taskText")
      .evaluate(() => {
        let text = document.querySelector(".taskText")
        return [text.id.match(/\d+$/)[0], text.innerText]
      })
      .then((task) => {
        return Browser
          .wait(`#taskText${task[0]}`)
          .realClick(`#taskEdit-${task[0]}`)
          .wait(`#UpdatedContent-${task[0]}`)
          .type(`#UpdatedContent-${task[0]}`, `UPDATEDTASk`)
          .click(`#taskUpdate-${task[0]}`)
          .evaluate(function(task) {
              return [document.querySelector(`#taskEdit-${task[0]}`).innerText, task[1]]
          },task)
      })
      .then((text) => {
        const oldText = text[1]
        const updatedText = text[0]
        expect(updatedText).to.eql("UPDATEDTASk");
        done();
      }).catch( onError );
  });

  it( "should mark the task as complete/redo", ( done ) => {
   Browser
      .refresh()
      .wait("#todoPanel")
      .wait(".taskText")
      .evaluate(() => {
        let taskText= document.querySelector(".taskText");
        return  [taskText.id.match(/\d+$/)[0],taskText.innerText] 
      })
      .then((taskDetail) => {
        return Browser
          .wait(`#task-${taskDetail[0]}`)
          .click(`#task-${taskDetail[0]}`)
          .evaluate(function(task) {
            let link = document.querySelector(`#taskText${task[0]}`)
              return [task[1], document.querySelector(`#task-${task[0]}`).innerText]
          },taskDetail)
      })
      .then((status) => {
        expect(status[0]).to.not.equal(status[1]);
        done();
      }).catch( onError );
  });

  it( "should delete the task", ( done ) => {
     Browser
        .refresh()
        .wait("#todoPanel")
        .wait(".taskText")
        .evaluate(() => {
          let taskText= document.querySelector(".taskText");
          return taskText.id.match(/\d+$/)[0]
        })
        .then((taskId) => {
          return Browser
            .wait(`#taskDelete-${taskId}`)
            .click(`#taskDelete-${taskId}`)
            .evaluate(function(taskId) {
              let link = document.querySelector(`#taskDetail-${taskId}`)
                return [document.querySelector(`#taskDetail-${taskId}`), document.querySelector(`#taskUpdateForm-${taskId}`)]
            },taskId)
        })
        .then((element) => {
          expect(element).to.eql([null, null]);
          done();
        }).catch( onError );
  });

  // disconnect and close Electron process
  after(() => {
    Browser
      .end();
  });
});