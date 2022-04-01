import React, { useState } from "react";
import {
	Typography,
	Grid,
	Divider,
	Select,
	FormControl,
	InputLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Button,
	MenuItem,
	ListSubheader,
	List,
	ListItemText,
	ListItem,
	ListItemIcon,
	IconButton,
} from "@material-ui/core";
import { createExam } from "../api";
import { makeStyles } from '@material-ui/core/styles';
import AlertSnackBar from "../components/alerts/AlertSnackBar";
import { ReactComponent as RedRoundCheckmark } from "../assets/redroundcheck.svg";
import { ReactComponent as GreyRoundCheckbox } from "../assets/redroundcheckbg.svg";
import { ReactComponent as RedRoundArrow } from "../assets/redroundarrow.svg";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import RightArrow from '@material-ui/icons/ArrowForwardRounded';
import themeDark from '../themeDark'



const useStyles = makeStyles(theme => ({
	body: {
		textAlign: "center",
	},
	upperSideText:{
		color : theme.palette.secondary.main
	},
	boxes:{
		backgroundColor: themeDark.palette.background.default,
		border:"2px solid grey",
		borderRadius: '10px',
		padding:'10px',
		color: themeDark.palette.text.primary
	},
    select: { //change select css, events and whatnot
		backgroundColor: themeDark.palette.background.default,
		border:"2px solid grey",
		borderRadius: '10px',
		color: "#fff",
		minHeight:'70px',
		minWidth: 'calc(70%)',
		maxWidth: 150,
		padding:'5px',
    },
    "& .MuiSvgIcon-root": {
        color: "white",
    },
	paper: {
		background: themeDark.palette.background.default,
		color: themeDark.palette.text.primary,
	},
	subheader:{
		color:'grey',
	},
	list: {
		backgroundColor: theme.palette.background.default,
		overflow: 'auto',
		maxHeight: 300,
	  },
	  listSection: {
		backgroundColor: 'inherit',
		color:'inherit',
		padding:30,
	  },
	  ul: {
		padding: 0,
		backgroundColor: 'inherit',
		color:'inherit',
	  },
	  listItem :{
		backgroundColor: themeDark.palette.background.default,
		color: themeDark.palette.text.primary,
		border:"2px solid grey",
		borderRadius: '10px',
		margin: '30px 0px',
		padding: 7,
	  },
	  rightArrow:{
		color:'EB5757',

	  },
}))

const GenExamPage = () => {
	const classes = useStyles();

	const [dictSubSubjects, setDictSubSubjects] = useState({
		geometry: false,
		imaginary: false,
		statistics: false,
		probability: false
	})

	const [dictYears, setDictYear] = useState({
		tenthGrade: false,
		eleventhGrade: false,
		twelfthGrade: false
	})

	const [options, setOptions] = useState({
		randomSubSubject: true,
		randomGrade: true
	})

	const [subject, setSubject] = useState("none")
	const [error, setError] = useState(false);

	const courseArray = [
		{
			name: "Ciências e Tecnologias",
			subjects:[
			"Matemática A",
			"Física e Química"],
			subjectsKey:['math', 'physics'],
		},
		{
			name: "Línguas e Humanidades",
			subjects:[
				"História A"
			],
			subjectsKey:['none'],
		},
		
	]


	const baseSubSubjects = {
		geometry: false,
		imaginary: false,
		statistics: false,
		probability: false
	}


	const baseYear = {
		tenthGrade: false,
		eleventhGrade: false,
		twelfthGrade: false
	}


	const resetDictYear = () => {
		setDictYear(baseYear)
	}


	const resetDictSubSubjects = () => {
		setDictSubSubjects(baseSubSubjects);
	}


	const handleChangeYear = (event) => {
		if (options.randomGrade) setOptions({...options, "randomGrade": false});
		setDictYear({...dictYears, [event.target.name]: event.target.checked});
	}


	const handleChangeSubSubjects = (event) => {
		if (options.randomSubSubject) setOptions({...options, "randomSubSubject": false});
		setDictSubSubjects({...dictSubSubjects, [event.target.name]: event.target.checked});
	}


	const handleChangeRandomSubSubject = (event) => {
		setOptions({...options, [event.target.name]: event.target.checked});

		if (!options.randomSubSubject) {
			resetDictSubSubjects();
		}
	}


	const handleChangeRandomGrade = (event) => {
		setOptions({...options, [event.target.name]: event.target.checked});

		if (!options.randomGrade) {
			resetDictYear();
		}
	}

	const handleChangeSubject = (event) => {
		
		setSubject(event.target.value)
	}



	const handleClick = () => {
		setError(false)
		if (subject === "none") {
			setError(true)
		} else {
	
			const subSubjects = [];

			if (dictSubSubjects.geometry) subSubjects.push("Geometria");

			if (dictSubSubjects.geometry) subSubjects.push("Imaginários");

			let year = 0;
			if (options.tenthGrade) year = 10;
			if (options.eleventhGrade) year = 11;
			if (options.twelfthGrade) year = 12;

			createExam({
				subject: subject,
				randomSubSubject: options.randomSubSubject,
				subSubjects: subSubjects,
				year: year
			}, (res) => {
				window.location.href = "/exame/" + res.data.id;
			})
		}
	}

	
	const handleClickCustom = (index1,index2) => { //Function for the perosnalised Exam experience of the right Panel
		console.log(courseArray);
		const key = courseArray[index1].subjectsKey[index2]
		setSubject(key) 
		
		setError(false)
		if (key === "none") {
			setError(true)
		} else {
	
			const subSubjects = [];

			if (dictSubSubjects.geometry) subSubjects.push("Geometria");

			if (dictSubSubjects.geometry) subSubjects.push("Imaginários");

			let year = 0;
			if (options.tenthGrade) year = 10;
			if (options.eleventhGrade) year = 11;
			if (options.twelfthGrade) year = 12;

			createExam({
				subject: subject,
				randomSubSubject: options.randomSubSubject,
				subSubjects: subSubjects,
				year: year
			}, (res) => {
				window.location.href = "/exame/" + res.data.id;
			})
		}
		
	}


	// TODO: REVIEW everything above this line for the new page, see if it makes sense
	return (
		<Grid container>
			<Grid item xs = {5}>
				<Typography className={classes.upperSideText} variant="h5" >Personaliza o teu exame</Typography>
			</Grid>
			<Grid item xs = {2}>
				<Typography variant="h6">ou</Typography> {/*Maybe put this in Bold */}
			</Grid>
			<Grid item xs = {5}>
				<Typography className={classes.upperSideText} variant="h5">Deixa isso connosco</Typography>
			</Grid>
			<Grid container xs = {12}>

				<Grid container xs ={5}> {/*left lower panel*/}
					<Grid alignContent="flex-start" container xs = {6}> {/*Pick Subject*/}
						<Grid item>
							<Typography> 1 - Escolhe a disciplina </Typography>
						</Grid>
						<Grid container>
							<Select
							 IconComponent={() => <ArrowDropDownRoundedIcon/>}
							 onChange={handleChangeSubject}
							 id="grouped-select"
							 defaultValue="none"
							 className={classes.select} 
							 MenuProps = {{classes:{paper:classes.paper}}}
							 disableUnderline>
								<MenuItem  value="none"> <Typography>Nenhuma</Typography></MenuItem>
								<ListSubheader className={classes.subheader}> <Typography>Ciências e Tecnologias</Typography></ListSubheader>
									<MenuItem value={"math"}> <Typography>Matemática A</Typography></MenuItem>
									<MenuItem value={"physics"}> <Typography>Física e Química</Typography></MenuItem>
								
								<ListSubheader className={classes.subheader}> <Typography>Línguas e Humanidades</Typography></ListSubheader>
									<MenuItem> <Typography>História A</Typography></MenuItem>
							</Select>
						</Grid>
					</Grid> 

					<Grid container xs = {6}> {/* Pick year*/}
						<Grid item>
							<Typography> 2 - Escolhe o ano </Typography>
						</Grid>	
						<Grid container>
							<FormControl className={classes.boxes}>
								<FormGroup >
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={options.randomGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeRandomGrade} name="randomGrade"/>} label={<Typography variant = "h6">Aleatório</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictYears.tenthGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeYear} name="tenthGrade"/>} label={<Typography variant = "h6">10º</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictYears.eleventhGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeYear} name="eleventhGrade"/>} label={<Typography variant = "h6">11º</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictYears.twelfthGrade} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeYear} name="twelfthGrade"/>} label={<Typography variant = "h6">12º</Typography>}/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid> 

					<Grid container xs ={12}> {/*Pick Themes*/}
						<Grid item>
							<Typography> 3 - Escolhe os tópicos </Typography>
						</Grid>
						<Grid container>
							<FormControl className={classes.boxes}>
								<FormGroup >
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeRandomSubSubject} name="randomSubSubject"/>} label={<Typography variant = "h6">Aleatório</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictSubSubjects.geometry && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>}  onChange={handleChangeSubSubjects} name="geometry"/>} label={<Typography variant = "h6">Geometria</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictSubSubjects.imaginary && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeSubSubjects} name="imaginary"/>} label={<Typography variant = "h6">Imaginários</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictSubSubjects.statistics && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeSubSubjects} name="statistics"/>} label={<Typography variant = "h6">Estatística</Typography>}/>
									<FormControlLabel labelPlacement="start" control={<Checkbox checked={dictSubSubjects.probability && !options.randomSubSubject} icon = {<GreyRoundCheckbox/>} checkedIcon = {<RedRoundCheckmark/>} onChange={handleChangeSubSubjects} name="probability"/>} label={<Typography variant = "h6">Probabilidades</Typography>}/>
								</FormGroup>
							</FormControl>
						</Grid>
					</Grid> 

					<Grid justifyContent="center" container > {/*Começar Button*/}
						<Grid>
							<Button variant="contained" onClick={handleClick}>Começar</Button>
						</Grid>
						
					</Grid>
					
						
						
					
				</Grid>

				<Grid container xs = {2}>
					<Divider style={{color:"red"}} orientation="vertical" flexItem /> {/*Vertical Divider*/}
				</Grid>
				
				
					

				<Grid container xs = {5}> {/*right lower panel*/}
					<Grid item>
						<Typography> Aqui ficamos responsáveis por gerar o melhor exame para ti, tendo em conta as tuas últimas performances. </Typography>
					</Grid>
					<Grid container justifyContent="center">
					<List className={classes.list} subheader={<li />}>
					{courseArray.map((courseDict,index1) => (
						<li key={`${courseDict.name}`} className={classes.listSection}>
						<ul className={classes.ul}>
							<ListSubheader>{<Typography >{courseDict.name}</Typography>}</ListSubheader>
							{courseDict.subjects.map((subjectName, index2) => (
							<ListItem  className = {classes.listItem} key={`${courseDict.name}-${subjectName}`}>
								<ListItemText  primary={ <Typography variant="h6"> {subjectName}</Typography>} />
								<ListItemIcon>
								<IconButton onClick={() =>handleClickCustom(index1, index2)}  edge="end" aria-label="comments">
									<RedRoundArrow />
								</IconButton>
								</ListItemIcon>
							</ListItem>
							))}
						</ul>
						</li>
					))}
					</List>

					</Grid>

				</Grid>

			</Grid>
			<AlertSnackBar anchorOrigin={{ vertical:"bottom", horizontal:"right" }} open={error} text="Por favor selecione uma disciplina antes de começar" type="error"/>
		</Grid>
		








/* 		<Grid container className={classes.body}>
			<Grid item xs={12}>
				<Typography variant="h2">Gera um exame</Typography>
			</Grid>
			<Grid item xs={6}>
				<FormControl>
					<FormLabel>Escolhe os temas</FormLabel>
					<FormGroup>
						<FormControlLabel control={<Checkbox checked={options.randomSubSubject} onChange={handleChangeRandomSubSubject} name="randomSubSubject"/>} label="Aleatório"/>
						<FormControlLabel control={<Switch checked={dictSubSubjects.geometry && !options.randomSubSubject} onChange={handleChangeSubSubjects} name="geometry"/>} label="Geometria"/>
						<FormControlLabel control={<Switch checked={dictSubSubjects.imaginary && !options.randomSubSubject} onChange={handleChangeSubSubjects} name="imaginary"/>} label="Imaginários"/>
						<FormControlLabel control={<Switch checked={dictSubSubjects.statistics && !options.randomSubSubject} onChange={handleChangeSubSubjects} name="statistics"/>} label="Estatística"/>
						<FormControlLabel control={<Switch checked={dictSubSubjects.probability && !options.randomSubSubject} onChange={handleChangeSubSubjects} name="probability"/>} label="Probabilidades"/>
					</FormGroup>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<FormControl>
					<FormLabel>Escolhe os anos</FormLabel>
					<FormGroup>
						<FormControlLabel control={<Checkbox checked={options.randomGrade} onChange={handleChangeRandomGrade} name="randomGrade"/>} label="Aleatório"/>
						<FormControlLabel control={<Switch checked={dictYears.tenthGrade} onChange={handleChangeYear} name="tenthGrade"/>} label="10º"/>
						<FormControlLabel control={<Switch checked={dictYears.eleventhGrade} onChange={handleChangeYear} name="eleventhGrade"/>} label="11º"/>
						<FormControlLabel control={<Switch checked={dictYears.twelfthGrade} onChange={handleChangeYear} name="twelfthGrade"/>} label="12º"/>
					</FormGroup>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" onClick={handleClick}>Gerar exame</Button>
			</Grid>
			<Grid item>
				
			</Grid>
		</Grid> */


	);
} 

export default GenExamPage;