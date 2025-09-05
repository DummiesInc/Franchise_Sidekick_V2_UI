import { CustomerQuestionnaireForm } from '../components/Questionnaire/QuestionnaireForm';

export default function Home() {
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm max-w-xl w-full">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 35,
          paddingRight: 35,
          paddingTop: 10
        }}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
          Franchise Questionnaire
        </h5>
        <p>
          Please complete the questionnaire so we could help you find the best
          investment options
        </p>
      </div>
      <CustomerQuestionnaireForm />
    </div>
  );
}
