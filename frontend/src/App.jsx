import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";
import { Container } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';


import '@fontsource/roboto'; 


const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto', 
      'Arial',
      '-apple-system',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})


  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };
  
const closeModal = () => {
  setIsModalOpen(false)
  setCurrentContact({})
}

const openCreateModal = () => {
  if (!isModalOpen) setIsModalOpen(true)
}

const openEditModal = (contact) => {
  if (isModalOpen) return
  setCurrentContact(contact)
  setIsModalOpen(true)
}

const onUpdate = () => {
  closeModal()
  fetchContacts()
}
  return ( 
  <>
 <ThemeProvider theme={theme}>
  < Container sx={{
    bgcolor: '#003135', 
    height: '50vh', 
    borderRadius: '5px'}}>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
        <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
        
        </div>
      </div>
      
      }
      </Container>
    </ThemeProvider>
    </>
  );
  
}

export default App;
