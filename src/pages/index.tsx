import { CustomerQuestionnaireForm } from '../components/Questionnaire/QuestionnaireForm';
import useIsMobile from '../components/utils/hooks/useIsMobile';

export default function Home() {
  const isMobile = useIsMobile();
  console.log(isMobile);
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm max-w-xl w-full">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: isMobile ? 10 : 35,
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
