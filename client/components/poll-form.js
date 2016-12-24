Template.pollForm.events({

  // handle the form submission
   'submit form': function(event) {

     // stop the form from submitting
     event.preventDefault();

     // get the data we need from the form
     var newPoll = {
       presenter: event.target.presenter.value,
       project:  event.target.project.value,
       demo: event.target.demo.value,
       choices:[
         { text: "有神快拜", votes: 0 },
         { text: "好棒棒", votes: 0 },
         { text: "還不錯", votes: 0 },
         { text: "已閱畢", votes: 0 }
       ],
       ips: [],
       score: 0,
       people: 0,
       now: false,
       showed: false
     };
     
     // create the new poll
     Polls.insert(newPoll);
    
     $(event.currentTarget).fadeOut(400);
   }

});
