import PerexModule, { PerexModuleProps } from './PerexModule';
import QuestionModule, { QuestionModuleProps } from './QuestionModule';

export type ModalModule = {
  [K in keyof ModulePropsMap]: {
    module: K;
    moduleProps: ModulePropsMap[K];
  };
}[keyof ModulePropsMap];

interface ModulePropsMap {
  question: QuestionModuleProps;
  perex: PerexModuleProps;
}

export const modulesMap: {
  [K in keyof ModulePropsMap]: React.ComponentType<ModulePropsMap[K]>;
} = {
  question: QuestionModule,
  perex: PerexModule,
};
