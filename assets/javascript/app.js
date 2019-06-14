// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDfObf_B4hlXa1Z5MicNb5lXf5YQZlPAcg",
    authDomain: "traintimes-761c3.firebaseapp.com",
    databaseURL: "https://traintimes-761c3.firebaseio.com",
    projectId: "traintimes-761c3",
    storageBucket: "traintimes-761c3.appspot.com",
    messagingSenderId: "506079282946",
    appId: "1:506079282946:web:0f951286e6298de8"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
   
    var trainName = $("#employee-name-input").val().trim();
   
    var destino = $("#role-input").val().trim();
   
    
    var initialTime = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
  
    var frequencia = $("#rate-input").val().trim();
  
    
    var newTrain = {
        trainname: trainName,
        destination: destino,
        initialtime: initialTime,
        frequency: frequencia

    };
  //puish data to data base
    database.ref().push(newTrain);
  
    //console.log variables

    console.log(JSON.stringify(newTrain.trainName));
    console.log(newTrain.destino);
    console.log(newTrain.initialTime);
    console.log(newTrain.frequencia);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var sc = childSnapshot.val();

    var trainName = sc.trainname;
    var destino = sc.destination;
    var initialTime = sc.initialtime;
    var frequencia = sc.frequency;

  
  //console info train
    console.log(trainName);
    console.log(destino);
    console.log(initialTime);
    console.log(frequencia);
  

    var tFrequency = frequencia;
    var firstTime = initialTime;
    console.log(firstTime);
    console.log(tFrequency);
    // var firstTime = initialTime;
    // console.log(JSON.stringify(firstTime));

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(initialTime, "HH:mm").subtract(1, "years");
    var firstTimeConverted = moment(initialTime, "HH:mm").subtract(1, "years");

    console.log(firstTimeConverted);

    // Current Time
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Create the new row
    var newRow = $("<tr>").append(
   
      $("<td>").text(trainName),
      $("<td>").text(destino),
      $("<td>").text(tFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  