import React, { useState, useId } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = 'Tytuł jest wymagany';
    } else if (title.length > 100) {
      errors.title = 'Tytuł nie może przekraczać 100 znaków';
    }
    if (!content.trim()) {
      errors.content = 'Treść jest wymagana';
    } else if (content.length > 500) {
      errors.content = 'Treść nie może przekraczać 500 znaków';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const newNote = {
        id: useId(),
        title: title.trim(),
        content: content.trim(),
      };
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Tytuł:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div>
          <label htmlFor="content">Treść:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleInputChange}
          />
          {errors.content && <div className="error">{errors.content}</div>}
        </div>
        <button type="submit">Dodaj notatkę</button>
      </form>
      <div className="note-list">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

function NoteCard({ note }) {
  const titleId = useId();
  const contentId = useId();

  return (
    <div className="note-card">
      <h3 id={titleId}>{note.title}</h3>
      <p id={contentId}>{note.content}</p>
    </div>
  );
}

export default App;
