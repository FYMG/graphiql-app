export interface MethodsTypes {
  Delete: string;
  Get: string;
  Head: string;
  Options: string;
  Patch: string;
  Post: string;
  Put: string;
}

export const Methods: MethodsTypes = {
  Delete: 'DELETE',
  Get: 'GET',
  Head: 'HEAD',
  Options: 'OPTIONS',
  Patch: 'PATCH',
  Post: 'POST',
  Put: 'PUT',
};

export type KeyAndValue = { index?: number; key: string; value: string };

export interface HeaderEditorProps {
  headers: KeyAndValue[];
  setHeaders: (headers: { key: string; value: string }[]) => void;
}

export interface VariablesEditorProps {
  setVariables: (variables: KeyAndValue[]) => void;
  variables: KeyAndValue[];
}

export interface DropDownBtnProps {
  isHidden: boolean;
  onClick: () => void;
  text: string;
}
