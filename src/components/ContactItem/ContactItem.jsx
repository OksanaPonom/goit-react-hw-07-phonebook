import PropTypes from 'prop-types';
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

  return (
    <ListItem>
      <p>
        <Name>{name}:&nbsp;</Name>
        <Number>{phone}</Number>
      </p>
      <Button type="button" onClick={() => dispatch(deleteContact(id))}>
        <TrashIcon />
      </Button>
    </ListItem>
  );
}
ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
