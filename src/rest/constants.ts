export enum Methods {
  Delete = 'Delete',
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
}

export type KeyAndValue = { index?: number; key: string; value: string };

export interface HeaderEditorProps {
  headers: KeyAndValue[];
  setHeaders: (headers: { key: string; value: string }[]) => void;
}

export interface VariablesEditorProps {
  setVariables: (variables: KeyAndValue[]) => void;
  variables: KeyAndValue[];
}
