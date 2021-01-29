import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';

function QuestionWidget( { question, 
							questionIndex, 
							totalQuestions, 
							onSubmit,
							addResult, } ) { 
	const questionId = `question_${questionIndex}`;
	const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
	const isCorrect = selectedAlternative === question.answer;
	const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
	const hasAlternativeSelected = selectedAlternative !== undefined;


	return (
	<Widget>
		<Widget.Header>
			<h3>
				Pergunta {  questionIndex } de 
				{` ${ totalQuestions }`}
			</h3>
		</Widget.Header>
		<img 
			alt='Descrição'
			style={{
				width: '100%',
				height: '150px',
				objectFit: 'cover',
			}}
			src={question.image}
			/>
		<Widget.Content>
			<h2>
				{question.title}
			</h2>
			<p>
				{question.description}
			</p>
			
			<form onSubmit={ (event) => {
				console.log('A que ponto chegaremos?');
				event.preventDefault();
				setIsQuestionSubmited(true);
				setTimeout(() => {
					addResult(isCorrect);
					onSubmit();
					setIsQuestionSubmited(false);
					setSelectedAlternative(undefined);
				}, 3 * 1000);
			}}>
				{question.alternatives.map( (alternative, alternativeIndex) => {
					const alternativeId = `alternative_${alternativeIndex}`;
					return (
						<Widget.Topic
							as='label'
							key={alternativeId}
							htmlFor={alternativeId}> 
							<input 
								id={alternativeId} 
								name={questionId}
								onChange={ (event) =>{
									setSelectedAlternative(alternativeIndex);
								}}
								type='radio'
								style={{display: 'none'}}
								/>
							{alternative}
						</Widget.Topic>
					);
				})}
				<Button type='submit' disabled={!hasAlternativeSelected}>
					Confirmar
				</Button>
				{isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
				{isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
			</form>
		</Widget.Content>
	</Widget>
	);
 }

function LoadingWidget () { 
	return (
		<Widget>
			<Widget.Header>
				Estamos carregando!
			</Widget.Header>
			<Widget.Content>
				LOADING...
			</Widget.Content>
		</Widget>
	);
}

function ResultWidget ({ results }) { 
	return (
		<Widget>
			<Widget.Header>
				Seus resultados
			</Widget.Header>
			<Widget.Content>
				<p>
					Você acertou
					{'   '}
					{results.filter( (x) => x ).length}
					{'   '}
					 perguntas
				</p>
				<ul>
					{results.map((result, index) => (
						<li>
							{`#0${index + 1}`} Resultado: 
							{result === true ? 'Acertou' : 'Errou'}
						</li>
					 ))}
				</ul>
			</Widget.Content>
		</Widget>
	);
}

export default function QuizPage() {
	const [screenState, setScreenState] = React.useState('LOADING');
	const [currentQuestion, setCurrentQuestion] = React.useState(0);
	const questionIndex = currentQuestion;
	const question = db.questions[ questionIndex ];
	const totalQuestions = db.questions.length;
	const [results, setResults] = React.useState([]);

	function addResults(result) {
		setResults([
			...results,
			result,
		]);
	}

	React.useEffect( () => {
		setTimeout( () => {
			setScreenState('QUIZ');
		}, 1 * 1500);
	}, []);

	function handleSubmitQuiz() {
		console.log('A que ponto chegamos?');
		const nextQuestion = questionIndex + 1;
		if (nextQuestion < totalQuestions){
			setCurrentQuestion(nextQuestion);
		} else {
			setScreenState('RESULT');
		}
	}

	return (
		<QuizBackground backgroundImage={ db.bg }>
			<QuizContainer>
				<QuizLogo />
					{screenState == 'QUIZ' && (
					<QuestionWidget 
						question={question} 
						questionIndex={questionIndex}
						totalQuestions={totalQuestions}
						onSubmit={handleSubmitQuiz}
						addResult={addResults}/>)
					}

					{screenState == 'LOADING' && <LoadingWidget />}
 
					{screenState == 'RESULT' && <ResultWidget results={results} />}
				<Footer />
			</QuizContainer>
			<GitHubCorner projectUrl="https://github.com/rennanfelipe" />
		</QuizBackground>
	);
}