import Head from 'next/Head';
import { useRouter } from 'next/router'

import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
	const router = useRouter();
	const [name, setName] = React.useState('');

  	return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          D&d Quiz
        </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
			<form onSubmit={ ( event ) => {
				event.preventDefault();
				router.push(`/quiz?name=${ name }`);
				console.log('A que ponto chegamos?');
			}
			}>
				<Input
					name='Nome do jogador'
					value=''
					placeholder='Seu nome' 
					onChange={ (event) => {
					setName(event.target.value);
					console.log(name);
				}
				} />
				<Button type='submit' disabled={name.length === 0}>
					{`Bora jogar ${ name }?`}
				</Button>
			</form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/rennanfelipe" />
    </QuizBackground>
  );
}
