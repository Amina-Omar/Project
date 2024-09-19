// Toggle User Details
function toggleUserDetails() {
    const userDetails = document.getElementById('user-details');
    userDetails.style.display = userDetails.style.display === 'none' ? 'block' : 'none';
}

// Toggle Loan Request Form
function toggleLoanRequestForm() {
    const loanRequestForm = document.getElementById('loan-request-form');
    loanRequestForm.style.display = loanRequestForm.style.display === 'none' ? 'block' : 'none';
}

// Submit Loan Request
function submitLoanRequest(event) {
    event.preventDefault(); // Prevent page reload
    const loanAmount = document.getElementById('loan-amount').value;
    const repayPeriod = document.getElementById('repay-period').value;
    alert(`Loan request submitted for Ksh ${loanAmount} to be repaid over ${repayPeriod} months.`);
    document.getElementById('loan-request-form').style.display = 'none'; // Close the form
}

// Save User Details
function saveUserDetails(event) {
    event.preventDefault(); // Prevent page reload
    const fullName = document.getElementById('full-name').value;
    const idNumber = document.getElementById('id-number').value;
    const location = document.getElementById('location').value;
    alert(`User details saved:\nName: ${fullName}\nID: ${idNumber}\nLocation: ${location}`);
    document.getElementById('user-details').style.display = 'none'; // Close user details
}

// Logout Function
function logout() {
    alert('Logging out...');
    // Implement logout logic here (e.g., redirect to login page)
    window.location.href = 'index.html'; // Redirect to home page
}

// Generate PDF Statement (Placeholder)
function generatePDF() {
    alert('Generating PDF statement...');
    // Implement PDF generation logic here
}

// Toggle Signup Form
function toggleSignupForm() {
    const signupForm = document.getElementById('signup-form');
    signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
}

// Hide Signup Form
function hideSignupForm() {
    document.getElementById('signup-form').style.display = 'none';
}

// Populate User Table (Example)
function populateUserTable() {
    const userTableBody = document.getElementById('user-table-body');
    // Example data
    const users = [
        { id: 1, name: 'Alice', savings: 500, loans: 2 },
        { id: 2, name: 'Bob', savings: 300, loans: 1 },
    ];

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>Ksh ${user.savings}</td>
            <td>${user.loans}</td>
            <td><button onclick="viewUserDetails(${user.id})">View</button></td>
        `;
        userTableBody.appendChild(row);
    });
}

// Example Function to View User Details
function viewUserDetails(userId) {
    // Simulated user data retrieval
    alert(`Viewing details for user ID: ${userId}`);
    // Display user details logic
}

// Download SACCO Statements (Placeholder)
function downloadSaccoStatements() {
    alert('Downloading SACCO statements...');
    // Implement download logic here
}

// Load User Table on Page Load
window.onload = function() {
    populateUserTable();
    // Additional initialization if needed
};
// Example user data (for demonstration purposes)
const userData = {
    1: { fullName: 'Alice Johnson', idNumber: '12345678', location: 'Nairobi', savings: 500, loans: 2 },
    2: { fullName: 'Bob Smith', idNumber: '87654321', location: 'Mombasa', savings: 300, loans: 1 },
};

// Function to view user details
function viewUserDetails(userId) {
    const userDetails = document.getElementById('user-info');
    const user = userData[userId];

    // Populate user details
    userDetails.innerHTML = `
        <p><strong>Full Name:</strong> ${user.fullName}</p>
        <p><strong>ID Number:</strong> ${user.idNumber}</p>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>Savings:</strong> Ksh ${user.savings}</p>
        <p><strong>Loans:</strong> ${user.loans}</p>
    `;

    // Show the user details section
    document.getElementById('user-details').style.display = 'block';
}

