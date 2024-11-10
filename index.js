
function saveContactsToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContactsFromLocalStorage() {
    const storedContacts = localStorage.getItem('contacts');
    contacts = storedContacts ? JSON.parse(storedContacts) : []; 
}


let contacts = [];
let editingIndex = null;


function renderContacts() {
    const contactsContainer = document.getElementById('contacts');
    contactsContainer.innerHTML = '';
    
    contacts.forEach((contact, index) => {
        const contactElement = document.createElement('div');
        contactElement.classList.add('contact-card');
        contactElement.innerHTML = `
            <div class="contact-info">
                <p><strong>Nombre:</strong> ${contact.name}</p>
                <p><strong>Teléfono:</strong> ${contact.phone}</p>
                <p><strong>Email:</strong> ${contact.email}</p> <!-- Mostrar el email -->
                <p><strong>Dirección:</strong> ${contact.address}</p> <!-- Mostrar la dirección -->
            </div>
            <div class="button-container">
                <button onclick="editContact(${index})">Editar</button>
                <button onclick="deleteContact(${index})">Eliminar</button>
            </div>
        `;
        contactsContainer.appendChild(contactElement);
    });
}


function validateContactForm(name, phone) {
    if (!name || !phone) {
        alert('Por favor, ingrese un nombre y un número de teléfono válidos.');
        return false;
    }
    return true;
}


function saveContact() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!validateContactForm(name, phone)) {
        return;
    }

    if (editingIndex !== null) {
        
        contacts[editingIndex] = { name, phone, email, address };
        editingIndex = null;
    } else {
     
        contacts.push({ name, phone, email, address });
    }

    saveContactsToLocalStorage(); 
    renderContacts(); 
    resetForm();
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('address').value = contact.address;
    editingIndex = index;
}


function deleteContact(index) {
    contacts.splice(index, 1);
    saveContactsToLocalStorage(); 
    renderContacts();
}


function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    editingIndex = null;
}


document.getElementById('saveContactButton').addEventListener('click', (e) => {
    e.preventDefault(); 
    saveContact();
});


window.addEventListener('load', () => {
    loadContactsFromLocalStorage();
    renderContacts();
});
