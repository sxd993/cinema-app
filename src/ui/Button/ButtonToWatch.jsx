import { ExternalLinkIcon } from '@chakra-ui/icons'
import classes from './button.module.css'

export const ButtonToWatch = (filmId) => {
    return (
        <a className={classes.link} href={`${filmId}`}>
            <ExternalLinkIcon />
            <p>Watch Trailer</p>
        </a>
    )
}