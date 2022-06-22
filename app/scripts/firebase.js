
// Initialize Firebase (ADD YOUR OWN DATA)
const config = {
    apiKey: "AIzaSyBW6o_w7gMFFZWvoacsRZhrMlpFMp_RbPo",
    authDomain: "coding-path.firebaseapp.com",
    databaseURL: "https://coding-path-default-rtdb.firebaseio.com",
    projectId: "coding-path",
    storageBucket: "coding-path.appspot.com",
    appId: "1:915298452988:web:1b040c7a32f786d0295e79",
    messagingSenderId: "915298452988"
  };
  firebase.initializeApp(config);
  
  // Reference messages collection
  const messagesRef = firebase.database().ref('messages');
  
  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    const name = getInputVal('name');
    const mail = getInputVal('mail');
    const phone = getInputVal('phone');
    const message = getInputVal('message');
  
    // Save message
    saveMessage(name, mail, phone,  message);
  
  
    // Clear form
    document.getElementById('contactForm').reset();
  }
  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(name,  mail, phone,  message){
    const newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      mail: mail,
      phone:phone,
      message:message
    });
  }