import React from "react";
import { useState, useEffect, useRef } from "react";
import {
	Grid,
	Button,
	IconButton
} from "@material-ui/core";
import { examInfo } from "../api";
import CountdownClock from "../components/countdownClock/CountdownClock";
import { makeStyles } from "@material-ui/core";
import QuestionsGroup from "../components/questions/QuestionsGroup";
import Loading from "../components/loading/Loading";
import CustomizedSteppers from "../components/questions/Stepper";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
	timer: {
		margin: "2rem 0 6rem 0"
	},
	beforeBttn: {
		color: "white",
		backgroundColor: theme.palette.secondary.main,
		transition: "transform 0.15s ease-in-out",
		'&:hover': {
			backgroundColor: "#E3E3E3",
			transform: "scale3d(1.1, 1.1, 1)"
		 },
	},
	nextBttn: {
		color: "white",
		backgroundColor: theme.palette.primary.main,
		transition: "transform 0.15s ease-in-out",
		'&:hover': {
			backgroundColor: "#E3E3E3",
			transform: "scale3d(1.1, 1.1, 1)"
		 },
	},
	container: {
		width: "100%"
	},
}))

const ExamPage = (props) => {
	const childRef = useRef();
	const classes = useStyles();
	const [exam, setExam] = useState({questions: []});
	const [loading, setLoading] = useState(true);
	const [currentQuestion, setCurrentQuestion] = useState(0)
	
	useEffect(() => {
		examInfo(props.match.params.id, (res) => {
			res.data.questions.forEach(question => {
				question.answer = shuffle(question.answer)
			});
			setExam(res.data);
			setLoading(false);
		})
		
	}, [props.match.params.id, exam.questions.length])

	const onComplete = () => {
		childRef.current.submit();
	}

	const increaseCurrent = () => {
		if (currentQuestion < exam.questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
		}
	}

	const decreaseCurrent = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1)
		}
	}

	if (loading) return (<Loading />)

	return (
		<div className={classes.container}>
			<CustomizedSteppers 
				size={exam.questions.length} 
				changeIndex={(index) => setCurrentQuestion(index)}
				submitExam={onComplete}
				current={currentQuestion}
			/>
			<div className={classes.timer} align="center">
				<CountdownClock duration={exam.questions.length * 60} onComplete={onComplete}/>
			</div>
			<Grid container align="center" spacing={4} xs={12} direction="row" alignItems="center">
				<Grid item xs={1}>
					<IconButton className={classes.beforeBttn} onClick={decreaseCurrent}><ArrowBackIcon fontSize="large" /></IconButton>
				</Grid>
				<Grid item xs={10}>
					<QuestionsGroup exam={exam} ref={childRef} questionIndex={currentQuestion}/>
				</Grid>
				<Grid item xs={1}>
					<IconButton className={classes.nextBttn} onClick={increaseCurrent}><ArrowForwardIcon fontSize="large" /></IconButton>
				</Grid>
			</Grid>
			<div align="center">
				{currentQuestion == exam.questions.length - 1 && (
					<Button onClick={onComplete}>Submeter</Button>
				)}
			</div>
		</div>
	)
}

// used to shuffle the answers in the question
const shuffle = (array) => {
	let currentIndex = array.length,  randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}

	return array;
}

export default ExamPage;