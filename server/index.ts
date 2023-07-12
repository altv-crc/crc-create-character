import * as alt from 'alt-server';
import * as crc from '@stuyk/cross-resource-cache';
import { config } from '../shared/config';
import { Appearance } from '../shared/interface';

// Initialize Database
crc.database.onReady(() => {});

interface Character {
    _id?: string;
    name: string;
    appearance: Appearance;
}

const characterMap: { [id: string]: string } = {};

alt.on('crc-select-character-finish-create', (player: alt.Player, character: Character) => {
    if (!player || !player.valid || !character) {
        return;
    }

    characterMap[player.id] = character._id;
    player.pos = config.position.player;
    player.emit('crc-create-character-start');
});

alt.onClient('crc-create-character-save', async (player: alt.Player, appearance: Appearance) => {
    if (!player || !player.valid) {
        return;
    }

    if (!appearance || typeof appearance !== 'object') {
        player.kick('Invalid appearance data');
        return;
    }

    const _id = characterMap[player.id];
    if (!_id) {
        player.kick('Invalid _id for saving character appearance');
        return;
    }

    console.log(characterMap[player.id]);

    const result = await crc.database.update({ _id, appearance }, 'characters');
    console.log(result);

    console.log(`saved...`);
    console.log(appearance);
});

alt.on('playerDisconnect', (player: alt.Player) => {
    delete characterMap[player.id];
});
