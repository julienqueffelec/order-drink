const Discord = require('discord.js');

const client = new Discord.Client();

const drinks = [
  {
    id: 1,
    name: 'Vodka',
    price: 2,
  },
  {
    id: 2,
    name: 'Beer',
    price: 4,
  },
  {
    id: 3,
    name: 'Water',
    price: 6,
  },
];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '/commands') {
    msg.reply({
      embed: {
        color: 3447003,
        title: 'List of commands:',
        fields: [
          {
            name: 'Command',
            value: '/list-drinks\n/order + id drink',
            inline: true,
          },
          {
            name: 'Description',
            value:
              'List all available commands\nOrder a drink with an id\nVodka',
            inline: true,
          },
        ],
      },
    });
  }
  if (msg.content === '/list-drinks') {
    const id = drinks.map(drink => drink.id).join('\n');
    const name = drinks.map(drink => drink.name).join('\n');
    const price = drinks.map(drink => `${drink.price} €`).join('\n');

    msg.reply({
      embed: {
        color: 3447003,
        title: 'List of drinks:',
        fields: [
          { name: 'id', value: id, inline: true },
          { name: 'Name', value: name, inline: true },
          {
            name: 'Price',
            value: price,
            inline: true,
          },
        ],
      },
    });
  }

  if (msg.content.startsWith('/order ') || msg.content === '/order') {
    const argument = msg.content.substr('/order '.length);
    const drinkName = drinks.filter(drink => drink.id == argument);

    if (argument) {
      client.users
        .get('339485783956389899')
        .send(`${msg.author.username} has ordererd a ${drinkName[0].name}`);
    } else {
      msg.reply(
        'Vous must select a drink, type /list-drinks to see all available drinks'
      );
    }
  }
});

client.login('id');
