import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import 'notiflix';
import { notiflix } from 'components/FormContact/FormContact';
import { deleteContact } from 'redux/operations';
import {
  ListItem,
  Name,
  Number,
  Button,
  TrashIcon,
} from './ContactItem.styled';
import { useDispatch } from 'react-redux';

export function ContactItem({ contact: { id, name, phone } }) {
  const dispatch = useDispatch();
  const removeContact = (id, name) => {
    dispatch(deleteContact(id));
    Notiflix.Notify.info(`Contact ${name} deleted`, notiflix);
  };

  return (
    <ListItem>
      <p>
        <Name>{name}:&nbsp;</Name>
        <Number>{phone}</Number>
      </p>
      <Button type="button" onClick={() => removeContact(id, name)}>
        <TrashIcon />
      </Button>
    </ListItem>
  );
}
ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
