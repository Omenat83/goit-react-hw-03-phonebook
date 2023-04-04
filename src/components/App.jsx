import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container, Title, TitleContact } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps :>> ', prevProps);
    // console.log('prevState :>> ', prevState);
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  createContact = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  filterChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  filterData = () => {
    const filteredArray = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return filteredArray;
  };

  deleteContact = deleteID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== deleteID),
    }));
  };

  render() {
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm
          createContact={this.createContact}
          contacts={this.state.contacts}
        />
        <TitleContact>Contacts</TitleContact>
        <Filter
          filterChange={this.filterChange}
          filterValue={this.state.filter}
        />
        <ContactList
          contacts={this.filterData()}
          filter={this.state.filter}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
