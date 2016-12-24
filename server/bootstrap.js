Meteor.startup(function() {

  // if there are no polls available
  // if (Polls.find().count() === 0) {

  //   // create sample polls
  //   var samplePolls = [
  //     {
  //       question: 'Is Meteor awesome?',
  //       choices: [
  //         { text: 'Of course!', votes: 0 },
  //         { text: 'Eh', votes: 0 },
  //         { text: 'No. I like plain JS', votes: 0 }
  //       ]
  //     },
  //     {
  //       question: 'Is CSS3 Flexbox the greatest thing since array_slice(bread)?',
  //       choices: [
  //         { text: '100% yes', votes: 0 },
  //         { text: '200% yes', votes: 0 },
  //         { text: '300% yes', votes: 0 }
  //       ]
  //     }
  //   ];

  //   // loop over each sample poll and insert into database
  //   _.each(samplePolls, function(poll) {
  //     Polls.insert(poll);
  //   });
  // }

});

if (Meteor.isServer) {

  Meteor.methods({
    showOrder: function() {
      
    },
    givePoints: function(pollID, voteID, userId) {
   
      var voteString = 'choices.' + voteID + '.votes';
      var scoreString = 'score';
      var peopleString = 'people';
      var action = {};
      action[voteString] = 1;
      action[scoreString] = 3-voteID;
      action[peopleString] = 1;
      // the IP address of the caller
      ip = this.connection.clientAddress;

      if(ip.indexOf("140.112")>-1){

        // check by ip and date (these should be indexed)
        if (Polls.findOne({_id: pollID, ip: {$elemMatch:{$eq:userId}}})) {
          throw new Meteor.Error(403, '你已經投過這組票囉!');
        } else {
          // the player has not voted yet
          // Polls.update(playerId, {$inc: {score: 5}});
        
          // make sure she cannot vote again today
          Polls.update({_id: pollID},{ $push: { ip: userId } , $inc: action});
          
          // var voteString = 'choices.' + voteID + '.votes';
      // var action = {};
      // action[voteString] = 1;
      
      // // increment the number of votes for this choice
      // Polls.update(
      //   { _id: pollID }, 
      //   { $inc: action }
      // );
        }
      }
      else{
        throw new Meteor.Error(403, '只能在教室裡投票喔！');
      }
    }
  });
}