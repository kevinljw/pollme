// attach events to our poll template
Template.poll.events({

  // event to handle clicking a choice
  'click .vote': function(event) {

    // prevent the default behavior
    event.preventDefault();
    var pollID = $(event.currentTarget).parent('.poll').data('id');
    var voteID = $(event.currentTarget).data('id');
    // console.log(voteID);
    Meteor.call('givePoints', pollID, voteID, function(err) {
        if (err)
          alert(err.reason);
    });
    // // get the parent (poll) id
    // var pollID = $(event.currentTarget).parent('.poll').data('id');
    // var voteID = $(event.currentTarget).data('id');

    // // create the incrementing object so we can add to the corresponding vote
    // var voteString = 'choices.' + voteID + '.votes';
    // var action = {};
    // action[voteString] = 1;
    
    // // increment the number of votes for this choice
    // Polls.update(
    //   { _id: pollID }, 
    //   { $inc: action }
    // );

  }

});
Template.poll.helpers({
  isNow: function (thisNow) {
    return thisNow === true;
  }
});