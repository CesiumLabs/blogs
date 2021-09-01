import marked, { Slugger } from "marked";
import highlight from "highlight.js";
import { stripIndents } from "common-tags";

const renderer = new marked.Renderer();
const slugger = new Slugger();

marked.use({
    renderer: {
        link: (href, title, text) => {
            const local = href?.startsWith(`${location.protocol}//${location.hostname}`);
            const html = renderer.link.call(renderer, href, title, text);
            return local ? html : html.replace(/^<a /, '<a target="_blank" rel="noreferrer" class="text-blurple-500 hover:text-blurple-600"');
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
            const levels = ["4xl", "3xl", "2xl", "xl", "lg", "md"];
            return stripIndents(`
                <h${level} id="${slugger.slug(text)}" class="font-bold text-${levels[level]}">${text}</h${level}>
            `);
        }
    }
});

export default function markdown(input) {
    return `<div class="space-y-2 space-x-2">${marked(input || "")}</div>`;
}
