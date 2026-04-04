import toast, { Toaster } from 'react-hot-toast';
import s from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleFormAction = (formData: FormData) => {
    const query = formData.get('query') as string;

    if (!query || query.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }

    onSubmit(query.trim());
  };

  return (
    <header className={s.header}>
      {}
      <form action={handleFormAction} className={s.form}>
        <input
          className={s.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
        />
        <button type="submit" className={s.button}>Search</button>
      </form>
      <Toaster position="top-right" />
    </header>
  );
}