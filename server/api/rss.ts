import Parser from 'rss-parser';
import sanitizeHtml from 'sanitize-html';

type PhilosLFeed = {
    title: string
};

type PhilosLEvent = {
    title: string,
    link: string,
    content: string
    sanitizedContent?: string,
    pubDate: string,
    creator: string
};

const parser: Parser<PhilosLFeed, PhilosLEvent> = new Parser();

const getFeed = () => {
    console.log('Getting the rss feed...')
    return parser.parseURL('https://listserv.liv.ac.uk/cgi-bin/wa?RSS&L=PHILOS-L&v=2.0');
};

const sanitizeEvents = (event: PhilosLEvent) => {
    event.sanitizedContent = sanitizeHtml(event.content)
    return event
}

export default defineEventHandler
    (() => {
        return getFeed()
            .then((result) => {
                const events = result.items
                const sanitizedEvents = events.map(sanitizeEvents)
                return sanitizedEvents
            }).catch(() => [])
    })