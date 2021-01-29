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
							onSubmit } ) { 
	const questionId = `question_${questionIndex}`;

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
				event.preventDefault();
				onSubmit();
			}}>
				{question.alternatives.map( (alternative, alternativeIndex) => {
					const alternativeId = `alternative_${alternativeIndex}`;
					return (
						<Widget.Topic
							as='label'
							htmlFor={alternativeId}> 
							<input 
								id={alternativeId} 
								name={questionId}
								type='radio'
								//style={{display: 'none'}}
								/>
							{alternative}
						</Widget.Topic>
					);
				})}
			</form>

			<Button>
				Confirmar
			</Button>
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

export default function QuizPage() {
	const [screenState, setScreenState] = React.useState('LOADING');
	const [questionIndex, setQuestionIndex] = React.useState(0);
	const question = db.questions[ questionIndex ];
	const totalQuestions = db.questions.length;

	React.useEffect( () => {
		setTimeout( () => {
			setScreenState('QUIZ');
		}, 1 * 1500);
	}, []);

	function handleSubmit() {
		setQuestionIndex( questionIndex + 1);
	}

	return (
		<QuizBackground backgroundImage={ db.bg }>
			<QuizContainer>
				<QuizLogo />
					{screenState == 'QUIZ' && (<QuestionWidget 
						question={question} 
						questionIndex={questionIndex}
						totalQuestions={totalQuestions}
						onSubmit={handleSubmit}/>)
					}

					{screenState == 'LOADING' && <LoadingWidget />}
 
					{screenState == 'RESULT' && 'Você ganhou!'}
				<Footer />
			</QuizContainer>
			<GitHubCorner projectUrl="https://github.com/rennanfelipe" />
		</QuizBackground>
	);
}