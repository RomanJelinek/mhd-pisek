import { ModalModule, modulesMap } from '@/components/modalModules';
import React from 'react';

export const resolveModules = (modules: ModalModule[]) => {
  return modules.map(({ module, moduleProps }, index) => {
    const Component = modulesMap[module];
    if (!Component) {
      console.warn(`The component for "${module}" is not defined.`);
      return null;
    }
    return <Component key={index} {...(moduleProps as any)} />;
  });
};
