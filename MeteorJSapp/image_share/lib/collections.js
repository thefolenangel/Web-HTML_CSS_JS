// this is image_share.js
Images = new Mongo.Collection("images");

// set up security on Images collection
Images.allow({

	// we need to be able to update images for ratings.
	update:function(userId, doc){
		console.log("testing security on image update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image. 
			return false;
		}
	},

	insert:function(userId, doc){ 
    if (Meteor.isServer){ 
      console.log("insert on server"); 
    } 
    if (Meteor.isClient){ 
      console.log("insert on client"); 
    } 
    if (Meteor.user()){ 
      return true; 
    } else { 
      return false; 
    } 
  } , 
	remove:function(userId, doc){
		return true;
	}
})



