require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const Redis = require('ioredis');




const botTokens = [
    process.env.BOT_TOKEN_1,
    process.env.BOT_TOKEN_2,
    process.env.BOT_TOKEN_3,
    process.env.BOT_TOKEN_4,
    process.env.BOT_TOKEN_5,
    process.env.BOT_TOKEN_6,
    process.env.BOT_TOKEN_7,
    process.env.BOT_TOKEN_8,
    process.env.BOT_TOKEN_9,
    process.env.BOT_TOKEN_10,
    process.env.BOT_TOKEN_11,
    process.env.BOT_TOKEN_12,
    process.env.BOT_TOKEN_13,
    process.env.BOT_TOKEN_14,
    process.env.BOT_TOKEN_15,
    process.env.BOT_TOKEN_16,
    process.env.BOT_TOKEN_17,
    process.env.BOT_TOKEN_18,
    process.env.BOT_TOKEN_19,
    process.env.BOT_TOKEN_20,
    process.env.BOT_TOKEN_21,
    process.env.BOT_TOKEN_22,
    process.env.BOT_TOKEN_23,
    process.env.BOT_TOKEN_24,
    process.env.BOT_TOKEN_25,
    process.env.BOT_TOKEN_26,
    process.env.BOT_TOKEN_27,
    process.env.BOT_TOKEN_28,
    process.env.BOT_TOKEN_29,
    process.env.BOT_TOKEN_30,
    process.env.BOT_TOKEN_31,
    process.env.BOT_TOKEN_22,
    process.env.BOT_TOKEN_33,
    process.env.BOT_TOKEN_34,
    process.env.BOT_TOKEN_35,
    process.env.BOT_TOKEN_36,
    process.env.BOT_TOKEN_37,
    process.env.BOT_TOKEN_38,
    process.env.BOT_TOKEN_39,
    process.env.BOT_TOKEN_40,
    process.env.BOT_TOKEN_41,
    process.env.BOT_TOKEN_42,
    process.env.BOT_TOKEN_43,
    process.env.BOT_TOKEN_44,
    process.env.BOT_TOKEN_45,
   



];


// botTokens = botTokens.map((token, index) => {
//     const incrementedToken = incrementToken(token, 50);
//     console.log(`BOT_TOKEN_${index + 1}=${incrementedToken}`);
//     return incrementedToken;
// });


const authorizedUsers = process.env.AUTHORIZED_USERS.split(',');

const clients = botTokens.map(token => new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    
    ],
    partials: ['1246726511675969608', '991517803700027443', '906387908074831963', '968043206455472178']
}));



clients.forEach((client, index) => {
    client.once('ready', () => {
        console.log(`Bot ${index + 1} logged in as ${client.user.tag}!`);
    });

    client.on('messageCreate', async message => {
        if (message.author.bot) return;

        if (!authorizedUsers.includes(message.author.id))
            return;
          

        



        if (message.content.startsWith('!dm')) {
            const args = message.content.slice(3).trim().split(' ');
            const userId = args[0].replace(/[<@!>]/g, '');  // Remove any extra characters from user mention
            const dmMessage = args.slice(1).join(' ');

            try {
                const user = await client.users.fetch(userId);
                if (!user) {
                    message.reply('User not found.');
                    return;
                }

                const sendMessage = async () => {
                    for (let i = 0; i < 2000; i++) {  // Each bot sends 200 messages
                        try {
                            await user.send(dmMessage);
                            console.log(`Bot ${index + 1} message ${i + 1} sent to ${user.tag}`);
                         

                        } catch (error) {
                            console.error(`Bot ${index + 1} error sending message ${i + 1}:`, error);
                            if (error.code === 50007) {
                                console.log(`Bot ${index + 1} cannot send message ${i + 1} to ${user.tag}, skipping.`);
                            } else {
                                throw error;
                            }
                        }
                    }
                };

                await sendMessage();
                message.reply(`Bot ${index + 1} attempted to send 200 messages.`);

            } catch (error) {
                console.error(`Bot ${index + 1} error fetching user or sending messages:`, error);
                message.reply(`Bot ${index + 1} failed to send messages.`);
            }
        }
    });

    client.login(botTokens[index]);
});
