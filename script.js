
function showDetails(element, businessName, category, location = '', phone = '', email = '', hours = '') {
    const li = element.parentElement;
    const oldContent = li.innerHTML;
    
    li.innerHTML = `
        <div style="display: grid; gap: 10px; margin-bottom: 10px;">
            <input type="text" value="${businessName}" id="editName" placeholder="Business Name">
            <input type="text" value="${category}" id="editCategory" placeholder="Category">
            <input type="text" value="${location}" id="editLocation" placeholder="Full Address">
            <input type="tel" value="${phone}" id="editPhone" placeholder="Phone Number">
            <input type="email" value="${email}" id="editEmail" placeholder="Email Address">
            <input type="text" value="${hours}" id="editHours" placeholder="Business Hours">
        </div>
        <button onclick="saveDetails(this)" style="padding: 5px 10px;">Save</button>
        <button onclick="cancelEdit(this, '${oldContent}')" style="padding: 5px 10px;">Cancel</button>
    `;
}

function saveDetails(button) {
    const li = button.parentElement;
    const newName = li.querySelector('#editName').value;
    const newCategory = li.querySelector('#editCategory').value;
    const newLocation = li.querySelector('#editLocation').value;
    const newPhone = li.querySelector('#editPhone').value;
    const newEmail = li.querySelector('#editEmail').value;
    const newHours = li.querySelector('#editHours').value;
    
    li.innerHTML = `${newName} - ${newLocation} - <a href="#" onclick="showDetails(this, '${newName}', '${newCategory}', '${newLocation}', '${newPhone}', '${newEmail}', '${newHours}')">View Details</a>`;
}

function cancelEdit(button, oldContent) {
    const li = button.parentElement;
    li.innerHTML = oldContent;
}

function addBusiness() {
    const businessName = prompt("Enter business name:");
    const category = prompt("Enter business category:");
    const location = prompt("Enter business location:");
    const phone = prompt("Enter phone number:");
    const email = prompt("Enter email address:");
    const hours = prompt("Enter business hours:");
    
    if (businessName && category) {
        const list = document.querySelector('#business-list ul');
        const newBusiness = document.createElement('li');
        newBusiness.innerHTML = `${businessName} - ${location} - <a href="#" onclick="showDetails(this, '${businessName}', '${category}', '${location}', '${phone}', '${email}', '${hours}')">View Details</a>`;
        list.appendChild(newBusiness);
    }
}
