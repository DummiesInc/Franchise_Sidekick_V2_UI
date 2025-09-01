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
            const book = await endpoints.books.getBook({ id: 2 });
            console.log(book);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Get Book
      </Button>
    </>
  );
};

export default BookForm;
