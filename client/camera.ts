import * as alt from 'alt-client';
import * as native from 'natives';
import { config } from '../shared/config';

let camera: number;
let interval: number;

function tick() {
    native.setUseHiDof();
}

export function update(target: number) {
    if (typeof camera === 'undefined') {
        camera = native.createCamWithParams(
            'DEFAULT_SCRIPTED_CAMERA',
            config.position.camera.x,
            config.position.camera.y,
            config.position.camera.z + 0.2,
            0,
            0,
            0,
            55,
            false,
            1
        );

        native.setCamUseShallowDofMode(camera, true);
        native.setCamFov(camera, 20);
        native.setCamNearDof(camera, 0.2);
        native.setCamFarDof(camera, 3.5);
        native.setCamDofStrength(camera, 1);
        native.setCamActive(camera, true);
        native.pointCamAtPedBone(camera, target, 0x322c, 0, 0, 0, false);
        native.renderScriptCams(true, true, 1000, false, false, 0);

        if (typeof interval === 'undefined') {
            interval = alt.setInterval(tick, 0);
        }
    } else {
        native.pointCamAtPedBone(camera, target, 0x322c, 0, 0, 0, false);
    }

    alt.logDebug(`crc-create-character | Camera Updated`);
}

export function destroy() {
    alt.clearInterval(interval);
    interval = undefined;

    native.destroyAllCams(true);
    native.setCamActive(camera, false);
    native.renderScriptCams(false, false, 0, false, false, 0);

    alt.logDebug(`crc-create-character | Camera Destroyed`);
}

alt.on('disconnect', destroy);
