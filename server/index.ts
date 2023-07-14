import * as alt from 'alt-server';
import * as shared from 'alt-shared';
import * as crc from '@stuyk/cross-resource-cache';
import { config } from '../shared/config';

// Initialize Database
crc.database.onReady(() => {});

interface Character {
    _id?: string;
    name: string;
    appearance: shared.Appearance;
}

const characterMap: { [id: string]: string } = {};

alt.on('crc-select-character-finish-create', (player: alt.Player, _id: string) => {
    if (!player || !player.valid || !_id) {
        return;
    }

    characterMap[player.id] = _id;
    player.pos = config.position.player;
    player.emit('crc-create-character-start');
});

alt.onClient('crc-create-character-save', async (player: alt.Player, appearance: shared.Appearance) => {
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

    player.model = appearance.sex === 0 ? 'mp_f_freemode_01' : 'mp_m_freemode_01';
    player.spawn(player.pos.x, player.pos.y, player.pos.z, 0);

    // Set DLC hair; if present
    player.setClothes(2, appearance.hair, 0, 0);
    const dlcInfo = player.getDlcClothes(2);

    appearance.hairDlc = dlcInfo.dlc;
    appearance.hair = dlcInfo.drawable;

    const result = await crc.database.update({ _id, appearance }, 'characters');
    if (!result) {
        delete characterMap[player.id];
        player.kick(`Could not create character at this time, rejoin.`);
        return;
    }

    alt.emit('crc-create-character-finish', player, _id);
    alt.logDebug(`crc-create-character | Updated Character Appearance`);
    delete characterMap[player.id];
});

alt.on('playerDisconnect', (player: alt.Player) => {
    delete characterMap[player.id];
});
