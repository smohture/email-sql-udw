const showUsersButton = document.querySelector('#show-users');
const userList = document.querySelector('#user-list');

const uploadForm = document.querySelector('#upload-form');
const fileInput = document.querySelector('#file-input');

const generateEmailsButton = document.querySelector('#generate-emails');
const generateEmails = document.getElementById('generate-email');
const emailButtons = document.getElementById('generate-email-buttons');
const prodUrl ="https://agreeable-planes-production.up.railway.app/";
//showUsersButton.addEventListener('click', function() {
//document.getElementById('search-form-container').style.display = 'none';
//document.getElementById('result-container').style.display = 'none';
//document.getElementById('insert-form-container').style.display = 'none';
// document.getElementById('generate-email-buttons').style.display = 'none';
// document.getElementById('generate-emails').style.display = 'none';
// document.getElementById('update').style.display = 'none';
// document.getElementById('user-list').style.display = 'block';
//  if (table) {
//    userList.removeChild(table);
//    table = null;
//  } else {
//    fetch('http://localhost:8080/students/getAll')
//      .then(response => response.json())
//      .then(data => {
//      console.log("Data: "+data);
//        table = document.createElement('table');
//        const headerRow = document.createElement('tr');
//        const idHeader = document.createElement('th');
//        idHeader.innerText = 'Id';
//        headerRow.appendChild(idHeader);
//        const nameHeader = document.createElement('th');
//        nameHeader.innerText = 'Name';
//        headerRow.appendChild(nameHeader);
//        const emailHeader = document.createElement('th');
//        emailHeader.innerText = 'Email';
//        headerRow.appendChild(emailHeader);
//        const amountRemainingHeader = document.createElement('th');
//        amountRemainingHeader.innerText = 'Amount Remaining';
//        headerRow.appendChild(amountRemainingHeader);
//         const registeredHeader = document.createElement('th');
//         registeredHeader.innerText = 'Registered';
//         headerRow.appendChild(registeredHeader);
//         const taggedHeader = document.createElement('th');
//         taggedHeader.innerText = 'Tagged';
//         headerRow.appendChild(taggedHeader);
//        table.appendChild(headerRow);
//
//
//        data.forEach(user => {
//          const userRow = document.createElement('tr');
//           const idCell = document.createElement('td');
//           idCell.innerText = user.id;
//           userRow.appendChild(idCell);
//          const nameCell = document.createElement('td');
//          nameCell.innerText = user.name;
//          userRow.appendChild(nameCell);
//          const emailCell = document.createElement('td');
//          emailCell.innerText = user.email;
//          userRow.appendChild(emailCell);
//          const amountRemainingCell = document.createElement('td');
//          amountRemainingCell.innerText = user.amountRemaining;
//          userRow.appendChild(amountRemainingCell);
//          //
//          const registeredCell = document.createElement('td');
//          registeredCell.innerText = user.isRegistered.toString();
//          userRow.appendChild(registeredCell);
//                    //
//          const tagCell = document.createElement('td');
//          tagCell.innerText = user.isBandProvided.toString();
//          userRow.appendChild(tagCell);
//          table.appendChild(userRow);
//        });
//
//        userList.appendChild(table);
//      })
//      .catch(error => {
//      console.error("Error occurred: "+error);
//      });
//  }
//});

////Get All users(Pagination)
//showUsersButton.addEventListener('click', function() {
//  const page = 1; // set the page number
//  const limit = 10; // set the number of records per page
//
//
//  //fetch(`http://localhost:8080/students?page=${page}&limit=${limit}`)
//  fetch(`http://localhost:8080/students/getAll`)
//    .then(response => response.json())
//    .then(data => {
//      // create the table
//      const table = document.createElement('table');
//
//      // create the table headers
//      const headers = ['Name', 'Email', 'Amount Remaining'];
//      const headerRow = document.createElement('tr');
//      headers.forEach(header => {
//        const th = document.createElement('th');
//        th.textContent = header;
//        headerRow.appendChild(th);
//      });
//      table.appendChild(headerRow);
//
//      // create the table rows
//      data.forEach(user => {
//        const tr = document.createElement('tr');
//        const tdName = document.createElement('td');
//        tdName.textContent = user.name;
//        tr.appendChild(tdName);
//        const tdEmail = document.createElement('td');
//        tdEmail.textContent = user.email;
//        tr.appendChild(tdEmail);
//        const tdAmountRemaining = document.createElement('td');
//        tdAmountRemaining.textContent = user.amountRemaining;
//        tr.appendChild(tdAmountRemaining);
//        table.appendChild(tr);
//      });
//
//      // display the table
//      userList.innerHTML = '';
//      userList.appendChild(table);
//    })
//    .catch(error => console.error(error));
//
//});
//

//GetAllUsers
const pageSize = 10;
let currentPage = 1;
let totalPages = 0;
let userData = [];
let table = null;

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function renderTableData() {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const users = userData.slice(start, end);
  console.log("Start: "+start+" end:"+end+" users: "+users);

  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  users.forEach(user => {
    const row = tbody.insertRow();
    row.insertCell().innerText = user.id;
    row.insertCell().innerText = user.name;
    row.insertCell().innerText = user.email;
    row.insertCell().innerText = user.amountRemaining;
    row.insertCell().innerText = user.isRegistered;
    row.insertCell().innerText = user.isBandProvided;
  });

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

showUsersButton.addEventListener('click', function() {
  document.getElementById('search-form-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'none';
  document.getElementById('insert-form-container').style.display = 'none';
  document.getElementById('generate-email-buttons').style.display = 'none';
  //document.getElementById('generate-emails').style.display = 'none';
  document.getElementById('update').style.display = 'none';
  document.getElementById('user-list').style.display = 'block';
  document.getElementById('result-container').innerHTML = null;
             document.getElementById('delete-result-container').innerHTML = null;
  document.getElementById('delete-form-container').style.display = 'none';
      document.getElementById('delete-result-container').style.display = 'none';
      document.getElementById('delete').style.display = 'none';
        document.getElementById('upload-container').style.display = 'none';



    fetch(prodUrl+'students/getAll')
      .then(response => response.json())
      .then(data => {
        table = document.getElementById('user-table');
        userData = data;
        console.log("userData: "+userData);
        totalPages = Math.ceil(userData.length /pageSize);
        currentPage = 1;
        renderTableData();
      })
      .catch(error => {
        console.error("Error occurred: " + error);
      });
});

prevBtn.addEventListener('click', () => {
  currentPage--;
  renderTableData();
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  renderTableData();
});

document.getElementById('cancel-list').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('user-list').style.display = 'none';
});



//Upload data using excel
 uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch(prodUrl+'students/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert("File Uploaded Successfully");
    })
    .catch(error => alert('Error uploading file'));
  });


let buttonsDisplayed = false;
  //Generate emails
  document.getElementById('generate-email').addEventListener('click', function() {
           document.getElementById('user-list').style.display = 'none';
           document.getElementById('search-form-container').style.display = 'none';
           document.getElementById('result-container').style.display = 'none';
           document.getElementById('insert-form-container').style.display = 'none';
           document.getElementById('update').style.display = 'none';
            document.getElementById('result-container').innerHTML = null;
                       document.getElementById('delete-result-container').innerHTML = null;
                document.getElementById('generate-email-buttons').style.display = 'block';
                //document.getElementById('generate-emails').style.display = 'block';
                document.getElementById('delete-form-container').style.display = 'none';
                    document.getElementById('delete-result-container').style.display = 'none';
                    document.getElementById('delete').style.display = 'none';
                      document.getElementById('upload-container').style.display = 'none';


  });

  document.getElementById('generate-email-for-ids').addEventListener('click', function(event) {
    event.preventDefault();
    const emailIds = document.getElementById('email-ids').value;
    // your logic for submitting email ids to the backend
    const options = {
      method: 'POST',
      body: (emailIds)
    };
    fetch(prodUrl+'students/email', options)
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        alert("Email sent Successfully");
        // do something with the response data, e.g. show a success message
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Something went wrong. Email not sent");
        // show an error message to the user
      });
  });


document.getElementById('cancel-email').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('generate-email-buttons').style.display = 'none';
     //document.getElementById('generate-emails').style.display = 'none';

});


//  generateEmailsButton.addEventListener('click', function() {
//
//  alert("Emails Generated");
//    fetch('http://localhost:8080/students/emails')
//      .then(response => response.json())
//      .then(data => {
//        // Do something with the data
//        console.log(data);
//      })
//      .catch(error => console.error(error));
//  });

document.getElementById('insert-user').addEventListener('click', function() {
    document.getElementById('user-list').style.display = 'none';
      document.getElementById('search-form-container').style.display = 'none';
      document.getElementById('result-container').style.display = 'none';
    document.getElementById('insert-form-container').style.display = 'block';
     document.getElementById('generate-email-buttons').style.display = 'none';
     //document.getElementById('generate-emails').style.display = 'none';
     document.getElementById('update').style.display = 'none';
     document.getElementById('delete-form-container').style.display = 'none';
         document.getElementById('delete-result-container').style.display = 'none';
         document.getElementById('delete').style.display = 'none';
         document.getElementById('result-container').innerHTML = null;
                    document.getElementById('delete-result-container').innerHTML = null;
                      document.getElementById('upload-container').style.display = 'none';
});

document.getElementById('cancel-insert').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('insert-form-container').style.display = 'none';
});

document.getElementById('insert').addEventListener('click', function() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const amountRemaining = document.getElementById('amount').value;

    const payload = {
        name: name,
        email: email,
        amountRemaining: amountRemaining
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

    fetch(prodUrl+'students/add', options)
        .then(response => response.json())
        .then(data => {
            alert("Record Inserted Successfully");
            // do something with the response data, e.g. show a success message
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Something went wrong. Record not inserted.");
            // show an error message to the user
        });
});




//test
function createInputField(value) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  return input;
}

//Search
document.getElementById('search').addEventListener('click', function(event) {
    event.preventDefault();

    const emailList = document.getElementById('searchEmail').value;
    //const url = "http://localhost:8080/students/search/"+emailList;

   fetch(prodUrl+'students/search?email='+emailList)
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(data => {
       console.log('Response:', data);
            // display the response data on the UI and make it editable
            const student = data;

            let output = '<table class="table"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Amount Remaining</th><th>Is Registered?</th><th>Is Tagged?</th></tr></thead><tbody>';


            output += "<tr data-id="+student.id+"><td>"+student.id+"</td><td contenteditable='true'>"+student.name+"</td><td contenteditable='true'>"+student.email+"</td><td contenteditable='true'>"+student.amountRemaining+"</td><td contenteditable='true'>"+student.isRegistered+"</td><td contenteditable='true'>"+student.isBandProvided+"</td></tr>";


            output += '</tbody></table>';


            document.getElementById('result-container').innerHTML = output;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Record not found");
            // show an error message to the user
        });
});


document.getElementById('search-email').addEventListener('click', function() {
document.getElementById('user-list').style.display = 'none';
  document.getElementById('search-form-container').style.display = 'block';
  document.getElementById('result-container').style.display = 'block';
  document.getElementById('update').style.display = 'block';
  document.getElementById('insert-form-container').style.display = 'none';
   document.getElementById('generate-email-buttons').style.display = 'none';
   //document.getElementById('generate-emails').style.display = 'none';
   document.getElementById('delete-form-container').style.display = 'none';
       document.getElementById('delete-result-container').style.display = 'none';
       document.getElementById('delete').style.display = 'none';
         document.getElementById('result-container').innerHTML = null;
           document.getElementById('delete-result-container').innerHTML = null;
             document.getElementById('upload-container').style.display = 'none';
});

document.getElementById('cancel-search').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('search-form-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'none';
  document.getElementById('update').style.display = 'none';
  document.getElementById('result-container').innerHTML = null;
});

document.getElementById('update').addEventListener('click', function() {
    const rows = document.getElementsByTagName('tr');
    const student = {};

    // Get the edited values from the table rows
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        if (row.dataset.id) {
            student.id = row.getElementsByTagName('td')[0].innerText;
            student.name = row.getElementsByTagName('td')[1].innerText;
            student.email = row.getElementsByTagName('td')[2].innerText;
            student.amountRemaining = row.getElementsByTagName('td')[3].innerText;
            student.isRegistered = row.getElementsByTagName('td')[4].innerText;
            student.isBandProvided = row.getElementsByTagName('td')[5].innerText;
            break;
        }
    }

    console.log("Update data: "+JSON.stringify(student)+ "data: "+student);
    // Make a PUT request to the server with the updated data
    fetch(prodUrl+'students/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
        .then(response => {
            return response;
        })
        .then(data => {
            console.log('Success:', data);
            alert("Record Updated Successfully");
            location.reload();
            // show a success message to the user
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Something went wrong. Record not updated.");
                                               // show an error message to the user
     });
});

//Delete
document.getElementById('delete-user').addEventListener('click', function() {
document.getElementById('user-list').style.display = 'none';
  document.getElementById('delete-form-container').style.display = 'block';
  document.getElementById('delete-result-container').style.display = 'block';
  document.getElementById('delete').style.display = 'block';
  document.getElementById('search-form-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('update').style.display = 'none';
  document.getElementById('insert-form-container').style.display = 'none';
   document.getElementById('generate-email-buttons').style.display = 'none';
   //document.getElementById('generate-emails').style.display = 'none';
   document.getElementById('result-container').innerHTML = null;
   document.getElementById('delete-result-container').innerHTML = null;
     document.getElementById('upload-container').style.display = 'none';
});

document.getElementById('cancel-delete').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('delete-form-container').style.display = 'none';
    document.getElementById('delete-result-container').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
    document.getElementById('delete-result-container').innerHTML = null;
});

document.getElementById('search-delete').addEventListener('click', function(event) {
    event.preventDefault();

    const emailList = document.getElementById('emailId').value;
    //const url = "http://localhost:8080/students/search/"+emailList;

   fetch(prodUrl+'students/search?email='+emailList)
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(data => {
       console.log('Response:', data);
            // display the response data on the UI and make it editable
            const student = data;

            let output = '<table class="table"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Amount Remaining</th><th>Is Registered?</th><th>Is Tagged?</th></tr></thead><tbody>';


            output += "<tr data-id="+student.id+"><td>"+student.id+"</td><td>"+student.name+"</td><td>"+student.email+"</td><td>"+student.amountRemaining+"</td><td>"+student.isRegistered+"</td><td>"+student.isBandProvided+"</td></tr>";


            output += '</tbody></table>';


            document.getElementById('delete-result-container').innerHTML = output;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Record not found");
            // show an error message to the user
        });
});

document.getElementById('delete').addEventListener('click', function() {
    const rows = document.getElementsByTagName('tr');
    var id;

    // Get the edited values from the table rows
 for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.dataset.id){
            id = row.getElementsByTagName('td')[0].innerText;
            break;
        }

}

    console.log("Delete data Id: "+id);
    // Make a PUT request to the server with the updated data
    fetch(prodUrl+'students/delete/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/text'
        }
    })
        .then(response => {
            return response;
        })
        .then(data => {
            console.log('Success:', data);
            alert("Record is Deleted");
            location.reload();
            // show a success message to the user
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Something went wrong. Record not deleted.');
                                               // show an error message to the user
     });
});

document.getElementById('cancel-upload').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('upload-container').style.display = 'none';
});

document.getElementById('upload').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('upload-container').style.display = 'block';
    document.getElementById('search-form-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('insert-form-container').style.display = 'none';
    document.getElementById('generate-email-buttons').style.display = 'none';
    //document.getElementById('generate-emails').style.display = 'none';
    document.getElementById('update').style.display = 'none';
    document.getElementById('user-list').style.display = 'none';
    document.getElementById('result-container').innerHTML = null;
               document.getElementById('delete-result-container').innerHTML = null;
    document.getElementById('delete-form-container').style.display = 'none';
        document.getElementById('delete-result-container').style.display = 'none';
        document.getElementById('delete').style.display = 'none';
});