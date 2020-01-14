import * as React from 'react';
import { useState } from 'react';
import { IonItem, IonInput, IonIcon } from '@ionic/react';
import { alarm } from 'ionicons/icons';
import { InputChangeEventDetail } from '@ionic/core';

// ****************************************
// Styles
// ****************************************

export interface CSStyling { [key: string]: string; };

const inlineItem = (hasText, isDirty) => ({
  ['--min-height' as string]: '20px',
  ['--border-radius' as string]: '5px',
  ['--background' as string]: hasText ? '#a8f9d2' : (isDirty ? 'pink' : 'white')
}) as CSStyling;

const addForm = {
  marginTop: '13px', 
  width: '40vw', 
  paddingLeft: '15px'
} as CSStyling;

const iconGap = (hasText) => ({
  marginRight: '10px', 
  marginTop: '3px',
  ['color'  as string]: hasText ? 'green' : 'gray'  
}) as CSStyling;

// ****************************************
// AddTodo Functional Component
// ****************************************

export interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({onAdd}) => {
  const [text, isDirty, updateText, reset] = useTextField('');
  const hasText = !!text.length;
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    onAdd(text);
    reset();
    ev.preventDefault();
  };

  return (
    <div style={addForm}>
      <IonItem style={inlineItem(hasText, isDirty)}>
        <IonIcon icon={alarm} style={iconGap(hasText)}/>
        <form onSubmit={onSubmit}>
          <IonInput value={text} 
                    placeholder="Add a todo:" 
                    onIonChange={updateText}
                    onIonBlur={() => reset()}></IonInput>            
        </form>
      </IonItem>
    </div>
  );
};

// ************************************************
// Custom Form Field Hook to track value + isDirty
// ************************************************

export interface TextState {
  isDirty: boolean;
  text: string;
}

export type TextHookResponse = [
  string, 
  boolean, 
  (e: CustomEvent<InputChangeEventDetail>)=>void, 
  ()=>void
];

export function useTextField(initialValue): TextHookResponse {
  const [state, setState] = useState<TextState>({
    isDirty: false,
    text: initialValue
  });
  const updateText = (e: CustomEvent<InputChangeEventDetail>) => { 
    const text = e.detail.value;
    setState((current)=> {
      const isDirty = !!text ? true : current.isDirty;
      return { text, isDirty }
    })
  }
  const reset = () => {
    setState(()=> {
      return { text: '', isDirty: false }
    });
  }

  return [state.text, state.isDirty, updateText, reset];
}