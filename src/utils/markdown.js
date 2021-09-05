import marked, { Slugger } from "marked";
import highlight from "highlight.js";
import { stripIndents } from "common-tags";

const renderer = new marked.Renderer();
const slugger = new Slugger();

marked.use({
    renderer: {
        link: (href, title, text) => {
            return renderer.link.call(renderer, href, title, text).replace(/^<a /, '<a target="_blank" rel="noreferrer" class="hover:underline font-bold text-blurple-500 hover:text-blurple-600"');
        },
        script: () => `<div></div>`,
        code: (src) => {
            return `<pre class="my-0 text-white break-words overflow-x-auto bg-grey-900 p-5 rounded-lg"><code>${highlight.highlight(src, { language: "js" }).value}</code></pre>`;
        },
        image: (href, title, text) => {
            const html = renderer.image.call(renderer, href, title, text);
            return html.replace(/^<img /, '<img class="inline-flex rounded-sm"');
        },
        heading: (text, level) => {
            const levels = ["34px", "34px", "26px", "1.25rem", "1.125rem", "1.1rem"];
            const slugged = slugger.slug(text);
            return stripIndents(`
                <h${level} id="${slugged}" onclick="window.location.hash = '#${slugged}'" class="break-words cursor-pointer font-bold hover:underline" style="font-size: ${levels[level]};">${text}</h${level}>
            `);
        }
    }
});

export default function markdown(input) {
    return `<div class="space-y-2 space-x-2">${marked(input || "")}</div>`;
}
