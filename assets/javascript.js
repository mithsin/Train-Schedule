$(Document).ready(function(){
var config = {
    apiKey: "AIzaSyDBsNPAtqd7fx7WQpS-onEunFcqV1JuTTM",
    authDomain: "train-7b8bd.firebaseapp.com",
    databaseURL: "https://train-7b8bd.firebaseio.com",
    projectId: "train-7b8bd",
    storageBucket: "train-7b8bd.appspot.com",
    messagingSenderId: "769885606063"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
    
/*    set var for data*/
    var train_name = "";
    var destination = "";
    var trains_time = 0;
    var frequency = 0;
    
    $("#button").on("click", function(event) {
      event.preventDefault();
     /*   give var value and trim extra space*/
      train_name = $("#train_names").val().trim();
      destination = $("#destinations").val().trim();
      trains_time = $("#train_time").val().trim();
      frequency = $("#frequencys").val().trim();
        
       /* push var's value to firebase/ file train_test*/
      database.ref('/train_test').push({
        train_name: train_name,
        destination: destination,
        trains_time: trains_time,
        frequency: frequency
      });
        $("input").val("");
    });


     database.ref('/train_test').on("child_added", function(snapshot) {
     
        var ss = snapshot.val();
        var start = moment().format("HHmm");
        var end = moment(ss.trains_time, "hhmm").format("HHmm"); 
         
       /*grab data from firebase*/
        var name_dis = ss.train_name;
        var destination_dis = ss.destination;
        var frequency_dis = ss.frequency;
        var next_arrival_dis = moment(ss.trains_time, "hhmm").format("HH:mm"); 
        var min_away_dis = end-start;
        
        if(min_away_dis === 0 || min_away_dis < 0){
            tr.hide();
        }

         
       /*Set var for new tr and td*/     
        var newTr = $("<tr>");
        var td0 = $("<td>" + name_dis + "</td>").attr("class", "name_display");
        var td1 = $("<td>" + destination_dis + "</td>").attr("class", "destination_display");
        var td2 = $("<td>" + frequency_dis + "</td>").attr("class", "frequency_display");
        var td3 = $("<td>" + next_arrival_dis + "</td>").attr("class", "next_arrival_display");
        var td4 = $("<td>" + min_away_dis + "</td>").attr("class", "min_away_display");
         
        /*attach td to tr*/
        newTr.append(td0);
        newTr.append(td1);
        newTr.append(td2);
        newTr.append(td3);
        newTr.append(td4);
       
        /*display on DOM*/
       $("tbody").append(newTr);
         
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
    
});