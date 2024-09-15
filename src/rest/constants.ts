// export interface MethodsTypes {
//   Delete: string;
//   Get: string;
//   Head: string;
//   Options: string;
//   Patch: string;
//   Post: string;
//   Put: string;
// }

export const Methods = {
  DELETE: 'DELETE',
  GET: 'GET',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
};

export type MethodsType = keyof typeof Methods;

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
