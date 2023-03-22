//make an input box which verfies a password and then loads the team data
 var pass = prompt("Enter the password to load the team data");
    if (pass === "AHMOV_OCL_25"){

      const table =  document.querySelector(".container");
      table.style.display = "block";

        

    }
    else{
        alert("Incorrect password");
        location.reload();
    }
    