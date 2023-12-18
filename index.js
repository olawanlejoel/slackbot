const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	socketMode: true,
	appToken: process.env.SLACK_APP_TOKEN,
});

app.command('/hello', async ({ command, ack, say }) => {
	await ack();

	await say(`Hello, <@${command.user_id}>`);
});

app.command('/say_name', async ({ command, ack, say }) => {
	await ack();

	const name = command.text;

	await say(`Your name is ${name}`);
});

app.command('/add_numbers', async ({ command, ack, say }) => {
	await ack();

	const numbers = command.text.split(' ');

	const sum = numbers.reduce((a, b) => parseInt(a) + parseInt(b), 0);

	await say(`The sum is ${sum}`);
});

app.command('/random_quote', async ({ command, ack, say }) => {
	await ack();

	const quotes = await fetch('https://type.fit/api/quotes');
	const response = await quotes.json();

	const randomIndex = Math.floor(Math.random() * response.length);

	const randomQuote = response[randomIndex];

	const randomQuoteAuthor = randomQuote.author.replace(/, type\.fit/g, '');

	await say(`"${randomQuote.text}" - ${randomQuoteAuthor}`);
});

(async () => {
	// Start your app
	await app.start(process.env.PORT || 3000);
	console.log(`⚡️ Bot app is running on port ${process.env.PORT || 3000}!`);
})();
