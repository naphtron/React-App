import React from "react";
import { Typography, Button } from "@mui/material";

const ContactList =  ({contacts, updateContact, updateCallback}) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status == 200) {
                updateCallback
            } else {
                console.error("Failed to delete")
            } 
        } catch(error){
            alert(error)
        }
    }
    return <div>
        <Typography variant="h4" 
        sx={{
            width: 'fit-content',
            color:'#FFF9', 
            ':hover':
                 {bgcolor:"",
                  color: "#8644A2"},
            p:1}}
        >Contacts
        </Typography>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {contacts.map ((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                            <Button variant="contained" onClick={() => updateContact(contact)}>Update</Button>                                <Button variant="contained" 
                            sx={{backgroundColor:'red'}} onClick={()=>onDelete(contact.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ) )}
                </tbody>
        </table>
    </div>
}

export default ContactList