// Function to calculate and update the total amount
function updateTotalAmount() {
    const amountElements = document.querySelectorAll('.amount');
    let total = 0;

    amountElements.forEach(element => {
        const amount = parseFloat(element.textContent.replace('$', ''));
        total += amount;
    });

    document.getElementById('total-amount').textContent = total.toFixed(2);
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateTotalAmount);

// Add event listener for form submission
document.getElementById('expense-form').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form values
    const description = this.elements.description.value;
    const amount = parseFloat(this.elements.amount.value);
    const date = this.elements.date.value;

    // Create new expense item
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="description">${description}</span>
        <span class="amount">$${amount.toFixed(2)}</span>
        <span class="date">${date}</span>
    `;

    // Add new expense to the list
    document.querySelector('#expense-list ul').appendChild(li);

    // Update total amount
    updateTotalAmount();

    // Clear form fields
    this.reset();

    // Submit the form data to the server
    fetch('/add-expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(this))
    }).then(response => {
        if (!response.ok) {
            console.error('Failed to add expense');
        }
    });
});