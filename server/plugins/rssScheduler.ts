import { useScheduler } from "#scheduler"
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

import Parser from 'rss-parser';
import sanitizeHtml from 'sanitize-html';

type PhilosLFeed = {
    title: string
};

type PhilosLRSSEvent = {
    guid: string,
    title: string,
    link: string,
    content: string
    pubDate: string,
    creator: string
};

const parser: Parser<PhilosLFeed, PhilosLRSSEvent> = new Parser();
const prisma = new PrismaClient();

const getFeed = () => {
    console.log('Getting the rss feed...')
    return parser.parseURL('https://listserv.liv.ac.uk/cgi-bin/wa?RSS&L=PHILOS-L&v=2.0');
};

const sanitizeEvents = (event: PhilosLRSSEvent) => {
    const sanitizedContent = sanitizeHtml(event.content)

    const hashed_id = crypto.createHash('shake256', { outputLength: 4 })
        .update(event.guid)
        .digest("hex")

    const preparedEvent = {
        id: hashed_id,
        title: event.title,
        link: event.link,
        content: sanitizedContent,
        pubDate: new Date(event.pubDate),
        creator: event.creator,
        dateFetched: new Date()
    }

    return preparedEvent
}

const getNewPosts = function () {
    getFeed().then((result) => {
        console.log("Read the feed!")

        const eventsToRegister = result.items.map(sanitizeEvents)

        const createMany = prisma.event.createMany(
            {
                data: eventsToRegister,
                skipDuplicates: true
            })

        createMany
            .then(() => {
                console.log("Saved to database!")
            })
            .catch((error) => {
                console.log("Oops! Database error: ", error)
            })
    })
}

export default defineNitroPlugin(() => {

    startScheduler()
})

function startScheduler() {
    const scheduler = useScheduler();

    // Check if there is anything in the database. If not, populate it.
    const events = prisma.event.findFirst()
        .then((results) => {
            if (!results) {
                console.log("No results in database! Getting me some Philos-L events...")
                getNewPosts()
            }
        })
        .catch((error) => {
            console.log(error)
        })

    scheduler.run(() => {
        getNewPosts()
    }).everyHours(1);
}