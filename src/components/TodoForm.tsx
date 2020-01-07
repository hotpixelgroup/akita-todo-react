import * as React from 'react';

export interface TodoFormProps {
  onAdd: (text: string) => void;
};

export const TodoForm: React.FC<TodoFormProps> = ({onAdd}) => {
  const elRef = React.useRef<HTMLInputElement>();
  return (
    <div className="todoForm">
      <form
        onSubmit={e => {
          const text = elRef.current.value;
          if (text.trim()) {
            onAdd(text);
            elRef.current.value = '';
          }
          e.preventDefault();
        }}
      >
        <input ref={elRef} />
        <button type="submit" style={{marginLeft: '20px'}}>Add Todo</button>
      </form>
    </div>
  );
};