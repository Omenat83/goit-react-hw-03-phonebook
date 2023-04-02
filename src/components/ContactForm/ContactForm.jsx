import { Component } from 'react';
import {
  Form,
  FormItem,
  FormLabel,
  FormInput,
  FormButton,
} from './ContactForm.styled';
import PropTypes from 'prop-types';
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  inputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newName = this.state.name.toLocaleLowerCase();

    if (
      this.props.contacts.some(contact => {
        return contact.name.toLowerCase() === newName;
      })
    ) {
      alert(`${newName} is already in contact`);
    } else {
      this.props.createContact({
        name: this.state.name,
        number: this.state.number,
      });
      this.setState({
        name: '',
        number: '',
      });
    }
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem>
          <FormLabel htmlFor="inputName">Name</FormLabel>
          <FormInput
            id="inputName"
            type="text"
            name="name"
            onChange={this.inputChange}
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="inputPhone">Phone number</FormLabel>
          <FormInput
            id="inputPhone"
            type="tel"
            name="number"
            onChange={this.inputChange}
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </FormItem>
        <FormButton type="submit">Add contact</FormButton>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  createContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};
