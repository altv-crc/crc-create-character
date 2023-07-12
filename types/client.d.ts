import { Appearance } from '../shared/interface';

declare module 'alt-client' {
    interface ICustomEmitEvent {
        'crc-create-character-update-value': (data: Partial<Appearance>) => void;
    }
}
