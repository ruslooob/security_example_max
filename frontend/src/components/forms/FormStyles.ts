import {makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        marginTop: 8,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    submitBtn: {
        marginTop: 10,
        padding: '10px 20px'
    }
}));