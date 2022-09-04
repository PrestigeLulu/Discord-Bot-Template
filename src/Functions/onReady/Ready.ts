import Bot from "../../Bot/Bot";
import Event from "../../Event";

async function onCall(bot: Bot): Promise<void> {
    console.log(`Logged in ${bot.user?.tag}`);
}

const Ready = new Event("ready", onCall);

export default Ready;
