import fs from 'fs';
import { v4 as uuid } from 'uuid';
import OpenAI from 'openai';
import { authors } from '../data/blogAuthors.js';
import { blogWriterResearchPrompt } from '../data/blogWriterResearchPrompt.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const researchJson = require('../data/research.json');
const BLOG_PATH = './data/aiBlogs/';

async function generateBlog(author, topic) {
    const prompt = buildAntiGravityPrompt(author, topic);

    const res = await openai.chat.completions.create({
        model: 'gpt-4.1',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6
    });

    return JSON.parse(res.choices[0].message.content);
}

(async function run() {
    const existing = JSON.parse(fs.readFileSync(BLOG_PATH, 'utf-8'));

    for (const author of AUTHORS) {
        const topic = pickUnusedTopic(author, TOPICS, existing);
        const blog = await generateBlog(author, topic);

        blog.id = uuid();
        existing.push(blog);
    }

    fs.writeFileSync(BLOG_PATH, JSON.stringify(existing, null, 2));
    console.log('✅ Blogs published');
})();



function getReseachJson() {

    return researchJson;
}