// shared code
Websites = new Mongo.Collection("websites");

// client only code
if (Meteor.isClient){
    // event listeners on the addSiteForm template
    Template.addSiteForm.events({
        // this runs when they click the add button... you need to compete it
     'click .js-add-site':function(event){
         var url = $('#url_input').val();// get the form value using jquery...
         var  user = "";
         //test if there is a logged user that submits the data
         if(Meteor.user()){
             //if there is push his email to the DB
             user = Meteor.user().emails[0].address;
         } else{
             //else push that its anonnymous
             user = "anon";
         }

         var site = {"url":url,
                     "createdOn":new Date(),
                     "createdBy":user};
         Websites.insert(site);
         return false;
     }
    });

    // this helper gets the data from the collection for the site-list Template
    Template.siteList.helpers({
        'all_websites':function(){
            return Websites.find({});
        },
        'safer_email':function(email){
            if (email.indexOf('@')!=-1){// we have an email
                return email.split('@')[0];
            }
            else{// probably anonymouse.
                return email;
            }
        }
    });

}
