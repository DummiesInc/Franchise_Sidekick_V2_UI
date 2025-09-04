import { CustomerQuestionnaireForm } from '../components/Questionnaire/QuestionnaireForm';

export default function Home() {
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm max-w-xl w-full">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
        Franchise Questionnaire
      </h5>
      <CustomerQuestionnaireForm />
    </div>
  );
}
