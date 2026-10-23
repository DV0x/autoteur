// Checks the agent stack with no key and no network. It opens a durable session on SQLite,
// answers one input with pi-ai's faux model, and closes. Run it twice and the second run
// reopens the same file and finds the first answer still on disk.
import { fileURLToPath } from "node:url";
import { BACKGROUND_CONTEXT } from "@earendil-works/chord/context";
import { createModels, fauxAssistantMessage, fauxProvider, type TextContent } from "@earendil-works/pi-ai";
import { AssistantEntry, createRegistry, Harness } from "@earendil-works/pi-durable";
import { openNodeSqliteStorage } from "@earendil-works/pi-durable/storage/sqlite/node";

const context = BACKGROUND_CONTEXT;
const file = fileURLToPath(new URL("../../../data/smoke/smoke.sqlite", import.meta.url));

const faux = fauxProvider();
faux.setResponses([fauxAssistantMessage("Hello from the faux model.")]);
const models = createModels();
models.setProvider(faux.provider);
const model = faux.getModel();

const harness = await Harness.open(await openNodeSqliteStorage(file), { models, registry: createRegistry() }, context);
const root = await harness.root(context, { agent: { model: { provider: model.provider, modelId: model.id } } });

const before = await root.entries({}, 1000, undefined, context);
console.log(`store: ${file}`);
console.log(`entries already on disk: ${before.items.length}`);

const submission = await root.submit({ type: "input", content: "Say hello." }, context);
const settled = await submission.wait(context);
if (settled.status !== "done" || settled.type !== "input") {
	throw new Error(`input not answered: ${JSON.stringify(settled)}`);
}
const answer = await root.commit((tx) => tx.entry(AssistantEntry, settled.answer), context);
const text = (answer?.model ?? [])
	.flatMap((message) => (message.role === "assistant" ? message.content : []))
	.filter((block): block is TextContent => block.type === "text")
	.map((block) => block.text)
	.join("");
console.log(`answer: ${text}`);

const after = await root.entries({}, 1000, undefined, context);
console.log(`entries on disk now: ${after.items.length}`);
await harness.close(context);
