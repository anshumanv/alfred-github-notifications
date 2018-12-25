const alfy = require('alfy');

// Script to run on changing input
(async () => {
	const flags = alfy.input.split(' ');
	const all = flags.includes('a')
	const participating = flags.includes('p')
	const apiLink = `https://api.github.com/notifications?access_token=${process.env.access_token}${all ? '&all=1' : ''}${participating ? '&participating=1' : ''}`
	const data = await alfy.fetch(apiLink)
	const items =	data.map(event => {
		
		const targetUrl = event.subject.url.split('/').splice(4).join('/');

		return {
			title: `${event.subject.title}`,
			subtitle: `${event.reason} - ${targetUrl}`,
			arg: `https://github.com/${targetUrl}`,
		}});

		// Throw the final list of items
		alfy.output(items)
})();
