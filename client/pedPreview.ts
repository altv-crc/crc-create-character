import * as alt from 'alt-client';
import * as native from 'natives';
import * as camera from './camera';
import * as appearance from './appearance';
import { config } from '../shared/config';
import { hairOverlay } from './dataSet/hairOverlays';

let ped: number;
let lastModel: number;

export async function init() {
    await alt.Utils.requestModel('mp_m_freemode_01');
    await alt.Utils.requestModel('mp_f_freemode_01');
}

export function destroy() {
    if (typeof ped === 'undefined') {
        return;
    }

    try {
        native.setEntityAlpha(ped, 0, true);
        native.deletePed(ped);
        native.setPedAsNoLongerNeeded(ped);
    } catch (err) {}
}

export function update() {
    const data = appearance.get();
    const model = data.sex === 0 ? alt.hash('mp_f_freemode_01') : alt.hash('mp_m_freemode_01');

    if (lastModel !== model) {
        destroy();
        lastModel = model;
        ped = native.createPed(
            1,
            model,
            config.position.player.x,
            config.position.player.y,
            config.position.player.z,
            0,
            false,
            false
        );

        native.setEntityCoordsNoOffset(
            ped,
            config.position.player.x,
            config.position.player.y,
            config.position.player.z,
            false,
            false,
            false
        );

        native.setEntityInvincible(ped, true);
        native.setEntityRotation(ped, 0, 0, 125, 1, false);
        native.setPedDesiredHeading(ped, 125);
        native.taskLookAtCoord(
            ped,
            config.position.camera.x,
            config.position.camera.y,
            config.position.camera.z,
            -1,
            2,
            99
        );

        native.taskSetBlockingOfNonTemporaryEvents(ped, true);
        native.setBlockingOfNonTemporaryEvents(ped, true);
        native.setPedFleeAttributes(ped, 0, true);
        native.setPedCombatAttributes(ped, 17, true);
        native.setPedAsEnemy(ped, false);

        alt.nextTick(() => {
            camera.update(ped);
        });
    }

    if (!appearance) {
        return;
    }

    alt.emit('crc-appearance-apply', ped, data);
}

alt.on('disconnect', destroy);
