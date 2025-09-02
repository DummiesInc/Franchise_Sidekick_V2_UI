import Image from 'next/image';
import { Button } from 'flowbite-react';
import endpoints, { GetStateDto } from '../endpoints';
import BookForm from '../components/Book/BookForm';
import { CustomerQuestionnaireForm } from '../components/Questionnaire/QuestionnaireForm';

export default function Home() {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-xl w-full">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
        Create Book
      </h5>
      {/* <BookForm /> */}
      <CustomerQuestionnaireForm />
    </div>
  );
}
