import { useDispatch, useSelector } from 'react-redux';

import { List, Message, Notification } from './Contacts.styled';
import { selectContacts, selectFilter } from 'redux/selector';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { selectError, selectIsLoading } from 'redux/selector';
import { fetchAll } from 'redux/operations';
import { useEffect } from 'react';

export function Contacts() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const visibleContacts = () => {
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes((filter || '').toLowerCase())
    );
  };

  return (
    <>
      {isLoading && !error && <Notification>Loading...</Notification>}
      {error && !isLoading && (
        <Notification>
          Sorry, there was an error. Try again later...
        </Notification>
      )}
      {visibleContacts().length === 0 &&
        contacts.length === 0 &&
        !isLoading && <Message>No contacts available.</Message>}
      {visibleContacts().length === 0 && contacts.length !== 0 && (
        <Message>Contact not found</Message>
      )}

      {visibleContacts().length !== 0 && (
        <List>
          {visibleContacts().map(contact => {
            return <ContactItem key={contact.id} contact={contact} />;
          })}
        </List>
      )}
    </>
  );
}
