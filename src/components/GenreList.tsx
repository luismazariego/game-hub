import useGenres from '../hooks/useGenres';

type Props = {}

const GenreList = (props: Props) => {
  const {data} = useGenres();
  return (
    <ul>
      {data.map(genre => (
        <li key={genre.id}>
          {genre.name}
        </li>
      ))}
    </ul>
  )
}

export default GenreList