import RadioButtonsGroup, { RadioOptions } from '../form/RadioGroup';

export interface QuestionModuleProps {
  question: string;
  options: RadioOptions[];
}

const QuestionModule = ({ question, options }: QuestionModuleProps) => {
  return (
    <>
      <RadioButtonsGroup options={options} label={question} />
    </>
  );
};

export default QuestionModule;
