import { Paper, Typography, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


var Latex = require('react-latex');

const useStyles = makeStyles(theme => ({
	paperAnswer: selected => ({
		width: "95%",
		borderRadius: 38,
		backgroundColor: "#F9F9F9",
		padding: 3,
		margin: 4,
		boxShadow: (selected === true && "0px 5px rgba(0, 0, 0, 0.25)"),
		transition: "transform 0.15s ease-in-out",
		'&:hover': selected => ({
			transform: "scale3d(1.05, 1.05, 1)",
			width: "92%",
			boxShadow: (selected === false && "0px 5px rgba(0, 0, 0, 0.07)"),
		 }),

	}),
	buttonWrapper: selected => ({
		padding: 0,
		width: "100%",
		borderRadius: 38,
	}),
	icon: {
		position: 'absolute',
		top: -1,
		right: -2,
		color: "#000",
		backgroundColor: theme.palette.primary.main, //Delete this line and the next to make icon transparent again
		borderRadius: 9000,
	}
}))

const Answer = (props) => {
	const classes = useStyles(props.selected);

	const changeChosenAnswer = () => {
		// do something to change the answer
		props.changeAnswer(props.answer.id)
	}

    return (
        <IconButton
            className={classes.buttonWrapper}
            onClick={changeChosenAnswer}
            key={props.answer.id}
            size="large">
			<Paper className={classes.paperAnswer}><Typography variant="h6"><Latex>{props.answer.text}</Latex></Typography></Paper>
			{props.selected && (
				<CheckCircleIcon className={classes.icon}/>
			)}
		</IconButton>
    );
}

export default Answer;
