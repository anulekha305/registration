 (function () {
    'use strict';
    const form = document.getElementById('suggestionForm');
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        getSuggestions(); // Custom function to handle logic
      }
      form.classList.add('was-validated');
    }, false);
  })();



  function getSuggestions() {
    // Get form values
    const class10Physical = document.getElementById('class10Physical').value;
    const class10Life = document.getElementById('class10Life').value;
    const class12Physics = document.getElementById('class12Physics').value;
    const class12Biology = document.getElementById('class12Biology').value;

    // Example logic to suggest courses (you can modify this logic)
    let suggestions = `<h4>Suggested Courses:</h4><ul>`;
    if (class12Physics >= 80 && class12Biology >= 80) {
      suggestions += `<li>MBBS</li><li>BSc (Biology)</li><li>Biotechnology</li>`;
    } else if (class10Physical >= 70 && class12Physics >= 70) {
      suggestions += `<li>BSc (Physics)</li><li>Engineering Diploma</li>`;
    } else {
      suggestions += `<li>General B.Sc. / Arts / Commerce Courses</li>`;
    }
    suggestions += `</ul>`;

    // Display the result
    document.getElementById('suggestions').innerHTML = suggestions;
  }
//recomendation

document.addEventListener("DOMContentLoaded", function () {
    // Suggestion functionality
    const suggestionInput = document.getElementById('suggestionInput');
    const suggestionList = document.getElementById('suggestionList');
    const submitSuggestionBtn = document.getElementById('submitSuggestion');

    submitSuggestionBtn.addEventListener('click', () => {
        const value = suggestionInput.value.trim();
        if (value) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.innerText = value;
            suggestionList.appendChild(li);
            suggestionInput.value = '';
        } else {
            alert("Please enter a suggestion.");
        }
    });

    // Student Advice functionality
    const adviceInput = document.getElementById('adviceInput');
    const adviceList = document.getElementById('adviceList');
    const submitAdviceBtn = document.getElementById('submitAdvice');

    submitAdviceBtn.addEventListener('click', () => {
        const value = adviceInput.value.trim();
        if (value) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.innerText = value;
            adviceList.appendChild(li);
            adviceInput.value = '';
        } else {
            alert("Please enter your advice.");
        }
    });

    // Teacher Review functionality
    const reviewInput = document.getElementById('reviewInput');
    const reviewList = document.getElementById('reviewList');
    const submitReviewBtn = document.getElementById('submitReview');

    submitReviewBtn.addEventListener('click', () => {
        const value = reviewInput.value.trim();
        if (value) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.innerText = value;
            reviewList.appendChild(li);
            reviewInput.value = '';
        } else {
            alert("Please enter a review.");
        }
    });
});



// notification
const teacherUsername = "teacher";
const teacherPassword = "password123";

// Function to validate teacher login
function validateLogin(username, password) {
  return username === teacherUsername && password === teacherPassword;
}

// Function to show notification creation section
function showNotificationForm() {
  document.querySelector('.create-notification').style.display = 'block';
  document.querySelector('.teacher-login').style.display = 'none';
}

// Function to create and add a new notification to the list
function addNotification(text) {
  const list = document.getElementById('notificationList');
  const newNotification = document.createElement('li');
  newNotification.className = "list-group-item";
  newNotification.textContent = "🔔 " + text;
  list.insertBefore(newNotification, list.firstChild);
}

// Handle login form submit
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (validateLogin(username, password)) {
    alert("Login Successful! Welcome Teacher.");
    showNotificationForm();
  } else {
    alert("Invalid Credentials. Only teachers can log in.");
  }
}

// Handle notification form submit
function handleNotificationPost(event) {
  event.preventDefault();
  const notificationText = document.getElementById('notificationText').value;
  addNotification(notificationText);
  document.getElementById('notificationText').value = ''; // clear input
}

// Add event listeners
function setupEventListeners() {
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('notificationForm').addEventListener('submit', handleNotificationPost);
}

// Initialize the page
function init() {
  setupEventListeners();
}

// Run when page loads
window.onload = init;
// ******allnotification
function showLoginPage() {
    document.getElementById('allNotificationsPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

// Back to all notifications
function backToNotifications() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('allNotificationsPage').style.display = 'block';
}

// Perform login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Set correct credentials
    const correctUsername = "teacher";
    const correctPassword = "12345";

    if (username === correctUsername && password === correctPassword) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('createNotificationPage').style.display = 'block';
    } else {
        alert("Invalid credentials!");
    }
}

// Create a new notification
function createNotification() {
    const newNotificationText = document.getElementById('newNotification').value;
    if (newNotificationText.trim() !== "") {
        // Create new list item
        const newNotification = document.createElement('div');
        newNotification.className = 'list-group-item';
        newNotification.textContent = newNotificationText;

        // Append to the notifications list
        document.getElementById('notificationsList').appendChild(newNotification);

        // Clear the textarea
        document.getElementById('newNotification').value = "";

        // Redirect back to all notifications page
        document.getElementById('createNotificationPage').style.display = 'none';
        document.getElementById('allNotificationsPage').style.display = 'block';
    } else {
        alert("Please enter notification text!");
    }
}








// fees
function proceedToPayment() {
    const studentName = document.getElementById('studentName').value.trim();
    const email = document.getElementById('email').value.trim();
    const courseName = document.getElementById('courseName').value.trim();
    const amount = document.getElementById('amount').value.trim();
    
    if(studentName === '' || email === '' || courseName === '' || amount === '') {
      alert('Please fill all fields before proceeding.');
    } else {
      document.getElementById('initial-form').style.display = 'none';
      document.getElementById('payment-form').style.display = 'block';
    }
  }

  function completePayment() {
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiryDate = document.getElementById('expiryDate').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const messageDiv = document.getElementById('message');

    if(cardNumber.length !== 12 || expiryDate === 4 || cvv.length !== 3) {
      messageDiv.innerHTML = '<div class="alert alert-danger">Payment Failed! Please check your card details.</div>';
    } else {
      messageDiv.innerHTML = '<div class="alert alert-success">Payment Successful! Thank you.</div>';
    }
  }




  (() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()