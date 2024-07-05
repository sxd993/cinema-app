import classes from './Cast.module.css'

export const CastGrid = (cast) => {
    if (cast.lenght === 0) {
        return <p>No cast available.</p>;
    }

    return (
        <ul className={classes.cast_list}>
            {cast.map((actor) => (
                <li className={classes.cast_item} key={actor.id}>
                    <p>{actor.name}</p>
                </li>
            ))}
        </ul>
    )
}