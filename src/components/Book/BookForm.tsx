import endpoints, { AddBookDto } from '@/src/endpoints';
import { Button } from 'flowbite-react';
import React from 'react';

const BookForm = () => {
  const data: AddBookDto = {
    name: 'Harry Potter',
    author: 'JK Rowling',
    retailPrice: 10.0
  };
  return (
    <>
      <Button
        onClick={async () => {
          try {
            await endpoints.books.create({ book: data });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Add Book
      </Button>

      <Button
        onClick={async () => {
          try {
            await endpoints.states.getStates();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Get States
      </Button>
    </>
  );
};

export default BookForm;
